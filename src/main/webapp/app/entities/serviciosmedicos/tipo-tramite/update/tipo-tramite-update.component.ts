import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoTramite } from '../tipo-tramite.model';
import { TipoTramiteService } from '../service/tipo-tramite.service';
import { TipoTramiteFormService, TipoTramiteFormGroup } from './tipo-tramite-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-tramite-update',
  templateUrl: './tipo-tramite-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoTramiteUpdateComponent implements OnInit {
  isSaving = false;
  tipoTramite: ITipoTramite | null = null;

  editForm: TipoTramiteFormGroup = this.tipoTramiteFormService.createTipoTramiteFormGroup();

  constructor(
    protected tipoTramiteService: TipoTramiteService,
    protected tipoTramiteFormService: TipoTramiteFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoTramite }) => {
      this.tipoTramite = tipoTramite;
      if (tipoTramite) {
        this.updateForm(tipoTramite);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoTramite = this.tipoTramiteFormService.getTipoTramite(this.editForm);
    if (tipoTramite.id !== null) {
      this.subscribeToSaveResponse(this.tipoTramiteService.update(tipoTramite));
    } else {
      this.subscribeToSaveResponse(this.tipoTramiteService.create(tipoTramite));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoTramite>>): void {
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

  protected updateForm(tipoTramite: ITipoTramite): void {
    this.tipoTramite = tipoTramite;
    this.tipoTramiteFormService.resetForm(this.editForm, tipoTramite);
  }
}
