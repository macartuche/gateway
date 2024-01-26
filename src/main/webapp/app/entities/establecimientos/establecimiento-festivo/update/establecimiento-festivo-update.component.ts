import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { EstablecimientoService } from 'app/entities/establecimientos/establecimiento/service/establecimiento.service';
import { IFestivo } from 'app/entities/establecimientos/festivo/festivo.model';
import { FestivoService } from 'app/entities/establecimientos/festivo/service/festivo.service';
import { EstablecimientoFestivoService } from '../service/establecimiento-festivo.service';
import { IEstablecimientoFestivo } from '../establecimiento-festivo.model';
import { EstablecimientoFestivoFormService, EstablecimientoFestivoFormGroup } from './establecimiento-festivo-form.service';

@Component({
  standalone: true,
  selector: 'jhi-establecimiento-festivo-update',
  templateUrl: './establecimiento-festivo-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EstablecimientoFestivoUpdateComponent implements OnInit {
  isSaving = false;
  establecimientoFestivo: IEstablecimientoFestivo | null = null;

  establecimientosSharedCollection: IEstablecimiento[] = [];
  festivosSharedCollection: IFestivo[] = [];

  editForm: EstablecimientoFestivoFormGroup = this.establecimientoFestivoFormService.createEstablecimientoFestivoFormGroup();

  constructor(
    protected establecimientoFestivoService: EstablecimientoFestivoService,
    protected establecimientoFestivoFormService: EstablecimientoFestivoFormService,
    protected establecimientoService: EstablecimientoService,
    protected festivoService: FestivoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareEstablecimiento = (o1: IEstablecimiento | null, o2: IEstablecimiento | null): boolean =>
    this.establecimientoService.compareEstablecimiento(o1, o2);

  compareFestivo = (o1: IFestivo | null, o2: IFestivo | null): boolean => this.festivoService.compareFestivo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ establecimientoFestivo }) => {
      this.establecimientoFestivo = establecimientoFestivo;
      if (establecimientoFestivo) {
        this.updateForm(establecimientoFestivo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const establecimientoFestivo = this.establecimientoFestivoFormService.getEstablecimientoFestivo(this.editForm);
    if (establecimientoFestivo.id !== null) {
      this.subscribeToSaveResponse(this.establecimientoFestivoService.update(establecimientoFestivo));
    } else {
      this.subscribeToSaveResponse(this.establecimientoFestivoService.create(establecimientoFestivo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstablecimientoFestivo>>): void {
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

  protected updateForm(establecimientoFestivo: IEstablecimientoFestivo): void {
    this.establecimientoFestivo = establecimientoFestivo;
    this.establecimientoFestivoFormService.resetForm(this.editForm, establecimientoFestivo);

    this.establecimientosSharedCollection = this.establecimientoService.addEstablecimientoToCollectionIfMissing<IEstablecimiento>(
      this.establecimientosSharedCollection,
      establecimientoFestivo.establecimiento,
    );
    this.festivosSharedCollection = this.festivoService.addFestivoToCollectionIfMissing<IFestivo>(
      this.festivosSharedCollection,
      establecimientoFestivo.festivo,
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
            this.establecimientoFestivo?.establecimiento,
          ),
        ),
      )
      .subscribe((establecimientos: IEstablecimiento[]) => (this.establecimientosSharedCollection = establecimientos));

    this.festivoService
      .query()
      .pipe(map((res: HttpResponse<IFestivo[]>) => res.body ?? []))
      .pipe(
        map((festivos: IFestivo[]) =>
          this.festivoService.addFestivoToCollectionIfMissing<IFestivo>(festivos, this.establecimientoFestivo?.festivo),
        ),
      )
      .subscribe((festivos: IFestivo[]) => (this.festivosSharedCollection = festivos));
  }
}
