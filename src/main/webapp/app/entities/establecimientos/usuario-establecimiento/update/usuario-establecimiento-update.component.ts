import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { EstablecimientoService } from 'app/entities/establecimientos/establecimiento/service/establecimiento.service';
import { IUsuarioEstablecimiento } from '../usuario-establecimiento.model';
import { UsuarioEstablecimientoService } from '../service/usuario-establecimiento.service';
import { UsuarioEstablecimientoFormService, UsuarioEstablecimientoFormGroup } from './usuario-establecimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-usuario-establecimiento-update',
  templateUrl: './usuario-establecimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class UsuarioEstablecimientoUpdateComponent implements OnInit {
  isSaving = false;
  usuarioEstablecimiento: IUsuarioEstablecimiento | null = null;

  establecimientosSharedCollection: IEstablecimiento[] = [];

  editForm: UsuarioEstablecimientoFormGroup = this.usuarioEstablecimientoFormService.createUsuarioEstablecimientoFormGroup();

  constructor(
    protected usuarioEstablecimientoService: UsuarioEstablecimientoService,
    protected usuarioEstablecimientoFormService: UsuarioEstablecimientoFormService,
    protected establecimientoService: EstablecimientoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareEstablecimiento = (o1: IEstablecimiento | null, o2: IEstablecimiento | null): boolean =>
    this.establecimientoService.compareEstablecimiento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioEstablecimiento }) => {
      this.usuarioEstablecimiento = usuarioEstablecimiento;
      if (usuarioEstablecimiento) {
        this.updateForm(usuarioEstablecimiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarioEstablecimiento = this.usuarioEstablecimientoFormService.getUsuarioEstablecimiento(this.editForm);
    if (usuarioEstablecimiento.id !== null) {
      this.subscribeToSaveResponse(this.usuarioEstablecimientoService.update(usuarioEstablecimiento));
    } else {
      this.subscribeToSaveResponse(this.usuarioEstablecimientoService.create(usuarioEstablecimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioEstablecimiento>>): void {
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

  protected updateForm(usuarioEstablecimiento: IUsuarioEstablecimiento): void {
    this.usuarioEstablecimiento = usuarioEstablecimiento;
    this.usuarioEstablecimientoFormService.resetForm(this.editForm, usuarioEstablecimiento);

    this.establecimientosSharedCollection = this.establecimientoService.addEstablecimientoToCollectionIfMissing<IEstablecimiento>(
      this.establecimientosSharedCollection,
      usuarioEstablecimiento.establecimiento,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.establecimientoService
      .query()
      .pipe(map((res: HttpResponse<IEstablecimiento[]>) => res.body ?? []))
      .pipe(
        map((establecimientos: IEstablecimiento[]) =>
          this.establecimientoService.addEstablecimientoToCollectionIfMissing<IEstablecimiento>(
            establecimientos,
            this.usuarioEstablecimiento?.establecimiento,
          ),
        ),
      )
      .subscribe((establecimientos: IEstablecimiento[]) => (this.establecimientosSharedCollection = establecimientos));
  }
}
