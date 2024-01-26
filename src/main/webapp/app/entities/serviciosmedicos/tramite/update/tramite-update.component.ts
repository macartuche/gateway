import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { Formulario053Service } from 'app/entities/serviciosmedicos/formulario-053/service/formulario-053.service';
import { ITipoTramite } from 'app/entities/serviciosmedicos/tipo-tramite/tipo-tramite.model';
import { TipoTramiteService } from 'app/entities/serviciosmedicos/tipo-tramite/service/tipo-tramite.service';
import { TramiteService } from '../service/tramite.service';
import { ITramite } from '../tramite.model';
import { TramiteFormService, TramiteFormGroup } from './tramite-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tramite-update',
  templateUrl: './tramite-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TramiteUpdateComponent implements OnInit {
  isSaving = false;
  tramite: ITramite | null = null;

  formulario053sSharedCollection: IFormulario053[] = [];
  tipoTramitesSharedCollection: ITipoTramite[] = [];

  editForm: TramiteFormGroup = this.tramiteFormService.createTramiteFormGroup();

  constructor(
    protected tramiteService: TramiteService,
    protected tramiteFormService: TramiteFormService,
    protected formulario053Service: Formulario053Service,
    protected tipoTramiteService: TipoTramiteService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareFormulario053 = (o1: IFormulario053 | null, o2: IFormulario053 | null): boolean =>
    this.formulario053Service.compareFormulario053(o1, o2);

  compareTipoTramite = (o1: ITipoTramite | null, o2: ITipoTramite | null): boolean => this.tipoTramiteService.compareTipoTramite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tramite }) => {
      this.tramite = tramite;
      if (tramite) {
        this.updateForm(tramite);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tramite = this.tramiteFormService.getTramite(this.editForm);
    if (tramite.id !== null) {
      this.subscribeToSaveResponse(this.tramiteService.update(tramite));
    } else {
      this.subscribeToSaveResponse(this.tramiteService.create(tramite));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITramite>>): void {
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

  protected updateForm(tramite: ITramite): void {
    this.tramite = tramite;
    this.tramiteFormService.resetForm(this.editForm, tramite);

    this.formulario053sSharedCollection = this.formulario053Service.addFormulario053ToCollectionIfMissing<IFormulario053>(
      this.formulario053sSharedCollection,
      tramite.formulario,
    );
    this.tipoTramitesSharedCollection = this.tipoTramiteService.addTipoTramiteToCollectionIfMissing<ITipoTramite>(
      this.tipoTramitesSharedCollection,
      tramite.tipoTramite,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.formulario053Service
      .query()
      .pipe(map((res: HttpResponse<IFormulario053[]>) => res.body ?? []))
      .pipe(
        map((formulario053s: IFormulario053[]) =>
          this.formulario053Service.addFormulario053ToCollectionIfMissing<IFormulario053>(formulario053s, this.tramite?.formulario),
        ),
      )
      .subscribe((formulario053s: IFormulario053[]) => (this.formulario053sSharedCollection = formulario053s));

    this.tipoTramiteService
      .query()
      .pipe(map((res: HttpResponse<ITipoTramite[]>) => res.body ?? []))
      .pipe(
        map((tipoTramites: ITipoTramite[]) =>
          this.tipoTramiteService.addTipoTramiteToCollectionIfMissing<ITipoTramite>(tipoTramites, this.tramite?.tipoTramite),
        ),
      )
      .subscribe((tipoTramites: ITipoTramite[]) => (this.tipoTramitesSharedCollection = tipoTramites));
  }
}
