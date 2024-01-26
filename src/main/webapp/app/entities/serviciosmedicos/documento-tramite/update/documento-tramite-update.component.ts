import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDocumento } from 'app/entities/serviciosmedicos/documento/documento.model';
import { DocumentoService } from 'app/entities/serviciosmedicos/documento/service/documento.service';
import { ITramite } from 'app/entities/serviciosmedicos/tramite/tramite.model';
import { TramiteService } from 'app/entities/serviciosmedicos/tramite/service/tramite.service';
import { DocumentoTramiteService } from '../service/documento-tramite.service';
import { IDocumentoTramite } from '../documento-tramite.model';
import { DocumentoTramiteFormService, DocumentoTramiteFormGroup } from './documento-tramite-form.service';

@Component({
  standalone: true,
  selector: 'jhi-documento-tramite-update',
  templateUrl: './documento-tramite-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DocumentoTramiteUpdateComponent implements OnInit {
  isSaving = false;
  documentoTramite: IDocumentoTramite | null = null;

  documentosSharedCollection: IDocumento[] = [];
  tramitesSharedCollection: ITramite[] = [];

  editForm: DocumentoTramiteFormGroup = this.documentoTramiteFormService.createDocumentoTramiteFormGroup();

  constructor(
    protected documentoTramiteService: DocumentoTramiteService,
    protected documentoTramiteFormService: DocumentoTramiteFormService,
    protected documentoService: DocumentoService,
    protected tramiteService: TramiteService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareDocumento = (o1: IDocumento | null, o2: IDocumento | null): boolean => this.documentoService.compareDocumento(o1, o2);

  compareTramite = (o1: ITramite | null, o2: ITramite | null): boolean => this.tramiteService.compareTramite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentoTramite }) => {
      this.documentoTramite = documentoTramite;
      if (documentoTramite) {
        this.updateForm(documentoTramite);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentoTramite = this.documentoTramiteFormService.getDocumentoTramite(this.editForm);
    if (documentoTramite.id !== null) {
      this.subscribeToSaveResponse(this.documentoTramiteService.update(documentoTramite));
    } else {
      this.subscribeToSaveResponse(this.documentoTramiteService.create(documentoTramite));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentoTramite>>): void {
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

  protected updateForm(documentoTramite: IDocumentoTramite): void {
    this.documentoTramite = documentoTramite;
    this.documentoTramiteFormService.resetForm(this.editForm, documentoTramite);

    this.documentosSharedCollection = this.documentoService.addDocumentoToCollectionIfMissing<IDocumento>(
      this.documentosSharedCollection,
      documentoTramite.documento,
    );
    this.tramitesSharedCollection = this.tramiteService.addTramiteToCollectionIfMissing<ITramite>(
      this.tramitesSharedCollection,
      documentoTramite.tramite,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.documentoService
      .query()
      .pipe(map((res: HttpResponse<IDocumento[]>) => res.body ?? []))
      .pipe(
        map((documentos: IDocumento[]) =>
          this.documentoService.addDocumentoToCollectionIfMissing<IDocumento>(documentos, this.documentoTramite?.documento),
        ),
      )
      .subscribe((documentos: IDocumento[]) => (this.documentosSharedCollection = documentos));

    this.tramiteService
      .query()
      .pipe(map((res: HttpResponse<ITramite[]>) => res.body ?? []))
      .pipe(
        map((tramites: ITramite[]) =>
          this.tramiteService.addTramiteToCollectionIfMissing<ITramite>(tramites, this.documentoTramite?.tramite),
        ),
      )
      .subscribe((tramites: ITramite[]) => (this.tramitesSharedCollection = tramites));
  }
}
