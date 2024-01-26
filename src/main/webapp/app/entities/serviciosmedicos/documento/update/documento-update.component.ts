import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoTramite } from 'app/entities/serviciosmedicos/tipo-tramite/tipo-tramite.model';
import { TipoTramiteService } from 'app/entities/serviciosmedicos/tipo-tramite/service/tipo-tramite.service';
import { IDocumento } from '../documento.model';
import { DocumentoService } from '../service/documento.service';
import { DocumentoFormService, DocumentoFormGroup } from './documento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-documento-update',
  templateUrl: './documento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DocumentoUpdateComponent implements OnInit {
  isSaving = false;
  documento: IDocumento | null = null;

  tipoTramitesSharedCollection: ITipoTramite[] = [];

  editForm: DocumentoFormGroup = this.documentoFormService.createDocumentoFormGroup();

  constructor(
    protected documentoService: DocumentoService,
    protected documentoFormService: DocumentoFormService,
    protected tipoTramiteService: TipoTramiteService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTipoTramite = (o1: ITipoTramite | null, o2: ITipoTramite | null): boolean => this.tipoTramiteService.compareTipoTramite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documento }) => {
      this.documento = documento;
      if (documento) {
        this.updateForm(documento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documento = this.documentoFormService.getDocumento(this.editForm);
    if (documento.id !== null) {
      this.subscribeToSaveResponse(this.documentoService.update(documento));
    } else {
      this.subscribeToSaveResponse(this.documentoService.create(documento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumento>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(documento: IDocumento): void {
    this.documento = documento;
    this.documentoFormService.resetForm(this.editForm, documento);

    this.tipoTramitesSharedCollection = this.tipoTramiteService.addTipoTramiteToCollectionIfMissing<ITipoTramite>(
      this.tipoTramitesSharedCollection,
      documento.tipoTramite,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoTramiteService
      .query()
      .pipe(map((res: HttpResponse<ITipoTramite[]>) => res.body ?? []))
      .pipe(
        map((tipoTramites: ITipoTramite[]) =>
          this.tipoTramiteService.addTipoTramiteToCollectionIfMissing<ITipoTramite>(tipoTramites, this.documento?.tipoTramite),
        ),
      )
      .subscribe((tipoTramites: ITipoTramite[]) => (this.tipoTramitesSharedCollection = tipoTramites));
  }
}
