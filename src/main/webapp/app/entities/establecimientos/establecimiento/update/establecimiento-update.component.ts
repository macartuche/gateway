import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IParroquia } from 'app/entities/establecimientos/parroquia/parroquia.model';
import { ParroquiaService } from 'app/entities/establecimientos/parroquia/service/parroquia.service';
import { IEntidad } from 'app/entities/establecimientos/entidad/entidad.model';
import { EntidadService } from 'app/entities/establecimientos/entidad/service/entidad.service';
import { IInstitucion } from 'app/entities/establecimientos/institucion/institucion.model';
import { InstitucionService } from 'app/entities/establecimientos/institucion/service/institucion.service';
import { ITipoEstablecimiento } from 'app/entities/establecimientos/tipo-establecimiento/tipo-establecimiento.model';
import { TipoEstablecimientoService } from 'app/entities/establecimientos/tipo-establecimiento/service/tipo-establecimiento.service';
import { IHorarioEstablecimiento } from 'app/entities/establecimientos/horario-establecimiento/horario-establecimiento.model';
import { HorarioEstablecimientoService } from 'app/entities/establecimientos/horario-establecimiento/service/horario-establecimiento.service';
import { EstablecimientoService } from '../service/establecimiento.service';
import { IEstablecimiento } from '../establecimiento.model';
import { EstablecimientoFormService, EstablecimientoFormGroup } from './establecimiento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-establecimiento-update',
  templateUrl: './establecimiento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EstablecimientoUpdateComponent implements OnInit {
  isSaving = false;
  establecimiento: IEstablecimiento | null = null;

  parroquiasSharedCollection: IParroquia[] = [];
  entidadsSharedCollection: IEntidad[] = [];
  institucionsSharedCollection: IInstitucion[] = [];
  tipoEstablecimientosSharedCollection: ITipoEstablecimiento[] = [];
  horarioEstablecimientosSharedCollection: IHorarioEstablecimiento[] = [];

  editForm: EstablecimientoFormGroup = this.establecimientoFormService.createEstablecimientoFormGroup();

  constructor(
    protected establecimientoService: EstablecimientoService,
    protected establecimientoFormService: EstablecimientoFormService,
    protected parroquiaService: ParroquiaService,
    protected entidadService: EntidadService,
    protected institucionService: InstitucionService,
    protected tipoEstablecimientoService: TipoEstablecimientoService,
    protected horarioEstablecimientoService: HorarioEstablecimientoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareParroquia = (o1: IParroquia | null, o2: IParroquia | null): boolean => this.parroquiaService.compareParroquia(o1, o2);

  compareEntidad = (o1: IEntidad | null, o2: IEntidad | null): boolean => this.entidadService.compareEntidad(o1, o2);

  compareInstitucion = (o1: IInstitucion | null, o2: IInstitucion | null): boolean => this.institucionService.compareInstitucion(o1, o2);

  compareTipoEstablecimiento = (o1: ITipoEstablecimiento | null, o2: ITipoEstablecimiento | null): boolean =>
    this.tipoEstablecimientoService.compareTipoEstablecimiento(o1, o2);

  compareHorarioEstablecimiento = (o1: IHorarioEstablecimiento | null, o2: IHorarioEstablecimiento | null): boolean =>
    this.horarioEstablecimientoService.compareHorarioEstablecimiento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ establecimiento }) => {
      this.establecimiento = establecimiento;
      if (establecimiento) {
        this.updateForm(establecimiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const establecimiento = this.establecimientoFormService.getEstablecimiento(this.editForm);
    if (establecimiento.id !== null) {
      this.subscribeToSaveResponse(this.establecimientoService.update(establecimiento));
    } else {
      this.subscribeToSaveResponse(this.establecimientoService.create(establecimiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstablecimiento>>): void {
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

  protected updateForm(establecimiento: IEstablecimiento): void {
    this.establecimiento = establecimiento;
    this.establecimientoFormService.resetForm(this.editForm, establecimiento);

    this.parroquiasSharedCollection = this.parroquiaService.addParroquiaToCollectionIfMissing<IParroquia>(
      this.parroquiasSharedCollection,
      establecimiento.parroquia,
    );
    this.entidadsSharedCollection = this.entidadService.addEntidadToCollectionIfMissing<IEntidad>(
      this.entidadsSharedCollection,
      establecimiento.entidad,
    );
    this.institucionsSharedCollection = this.institucionService.addInstitucionToCollectionIfMissing<IInstitucion>(
      this.institucionsSharedCollection,
      establecimiento.institucion,
    );
    this.tipoEstablecimientosSharedCollection =
      this.tipoEstablecimientoService.addTipoEstablecimientoToCollectionIfMissing<ITipoEstablecimiento>(
        this.tipoEstablecimientosSharedCollection,
        establecimiento.tipo,
      );
    this.horarioEstablecimientosSharedCollection =
      this.horarioEstablecimientoService.addHorarioEstablecimientoToCollectionIfMissing<IHorarioEstablecimiento>(
        this.horarioEstablecimientosSharedCollection,
        establecimiento.horario,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.parroquiaService
      .query()
      .pipe(map((res: HttpResponse<IParroquia[]>) => res.body ?? []))
      .pipe(
        map((parroquias: IParroquia[]) =>
          this.parroquiaService.addParroquiaToCollectionIfMissing<IParroquia>(parroquias, this.establecimiento?.parroquia),
        ),
      )
      .subscribe((parroquias: IParroquia[]) => (this.parroquiasSharedCollection = parroquias));

    this.entidadService
      .query()
      .pipe(map((res: HttpResponse<IEntidad[]>) => res.body ?? []))
      .pipe(
        map((entidads: IEntidad[]) =>
          this.entidadService.addEntidadToCollectionIfMissing<IEntidad>(entidads, this.establecimiento?.entidad),
        ),
      )
      .subscribe((entidads: IEntidad[]) => (this.entidadsSharedCollection = entidads));

    this.institucionService
      .query()
      .pipe(map((res: HttpResponse<IInstitucion[]>) => res.body ?? []))
      .pipe(
        map((institucions: IInstitucion[]) =>
          this.institucionService.addInstitucionToCollectionIfMissing<IInstitucion>(institucions, this.establecimiento?.institucion),
        ),
      )
      .subscribe((institucions: IInstitucion[]) => (this.institucionsSharedCollection = institucions));

    this.tipoEstablecimientoService
      .query()
      .pipe(map((res: HttpResponse<ITipoEstablecimiento[]>) => res.body ?? []))
      .pipe(
        map((tipoEstablecimientos: ITipoEstablecimiento[]) =>
          this.tipoEstablecimientoService.addTipoEstablecimientoToCollectionIfMissing<ITipoEstablecimiento>(
            tipoEstablecimientos,
            this.establecimiento?.tipo,
          ),
        ),
      )
      .subscribe((tipoEstablecimientos: ITipoEstablecimiento[]) => (this.tipoEstablecimientosSharedCollection = tipoEstablecimientos));

    this.horarioEstablecimientoService
      .query()
      .pipe(map((res: HttpResponse<IHorarioEstablecimiento[]>) => res.body ?? []))
      .pipe(
        map((horarioEstablecimientos: IHorarioEstablecimiento[]) =>
          this.horarioEstablecimientoService.addHorarioEstablecimientoToCollectionIfMissing<IHorarioEstablecimiento>(
            horarioEstablecimientos,
            this.establecimiento?.horario,
          ),
        ),
      )
      .subscribe(
        (horarioEstablecimientos: IHorarioEstablecimiento[]) => (this.horarioEstablecimientosSharedCollection = horarioEstablecimientos),
      );
  }
}
