import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IContinuidadAsistencial } from 'app/entities/serviciosmedicos/continuidad-asistencial/continuidad-asistencial.model';
import { ContinuidadAsistencialService } from 'app/entities/serviciosmedicos/continuidad-asistencial/service/continuidad-asistencial.service';
import { IItemLiquidacion } from 'app/entities/serviciosmedicos/item-liquidacion/item-liquidacion.model';
import { ItemLiquidacionService } from 'app/entities/serviciosmedicos/item-liquidacion/service/item-liquidacion.service';
import { ITarifario } from 'app/entities/serviciosmedicos/tarifario/tarifario.model';
import { TarifarioService } from 'app/entities/serviciosmedicos/tarifario/service/tarifario.service';
import { TerapiaService } from '../service/terapia.service';
import { ITerapia } from '../terapia.model';
import { TerapiaFormService, TerapiaFormGroup } from './terapia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-terapia-update',
  templateUrl: './terapia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TerapiaUpdateComponent implements OnInit {
  isSaving = false;
  terapia: ITerapia | null = null;

  continuidadAsistencialsSharedCollection: IContinuidadAsistencial[] = [];
  itemLiquidacionsSharedCollection: IItemLiquidacion[] = [];
  tarifariosSharedCollection: ITarifario[] = [];

  editForm: TerapiaFormGroup = this.terapiaFormService.createTerapiaFormGroup();

  constructor(
    protected terapiaService: TerapiaService,
    protected terapiaFormService: TerapiaFormService,
    protected continuidadAsistencialService: ContinuidadAsistencialService,
    protected itemLiquidacionService: ItemLiquidacionService,
    protected tarifarioService: TarifarioService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareContinuidadAsistencial = (o1: IContinuidadAsistencial | null, o2: IContinuidadAsistencial | null): boolean =>
    this.continuidadAsistencialService.compareContinuidadAsistencial(o1, o2);

  compareItemLiquidacion = (o1: IItemLiquidacion | null, o2: IItemLiquidacion | null): boolean =>
    this.itemLiquidacionService.compareItemLiquidacion(o1, o2);

  compareTarifario = (o1: ITarifario | null, o2: ITarifario | null): boolean => this.tarifarioService.compareTarifario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ terapia }) => {
      this.terapia = terapia;
      if (terapia) {
        this.updateForm(terapia);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const terapia = this.terapiaFormService.getTerapia(this.editForm);
    if (terapia.id !== null) {
      this.subscribeToSaveResponse(this.terapiaService.update(terapia));
    } else {
      this.subscribeToSaveResponse(this.terapiaService.create(terapia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerapia>>): void {
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

  protected updateForm(terapia: ITerapia): void {
    this.terapia = terapia;
    this.terapiaFormService.resetForm(this.editForm, terapia);

    this.continuidadAsistencialsSharedCollection =
      this.continuidadAsistencialService.addContinuidadAsistencialToCollectionIfMissing<IContinuidadAsistencial>(
        this.continuidadAsistencialsSharedCollection,
        terapia.continuidad,
      );
    this.itemLiquidacionsSharedCollection = this.itemLiquidacionService.addItemLiquidacionToCollectionIfMissing<IItemLiquidacion>(
      this.itemLiquidacionsSharedCollection,
      terapia.itemLiquidacion,
    );
    this.tarifariosSharedCollection = this.tarifarioService.addTarifarioToCollectionIfMissing<ITarifario>(
      this.tarifariosSharedCollection,
      terapia.tarifario,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.continuidadAsistencialService
      .query()
      .pipe(map((res: HttpResponse<IContinuidadAsistencial[]>) => res.body ?? []))
      .pipe(
        map((continuidadAsistencials: IContinuidadAsistencial[]) =>
          this.continuidadAsistencialService.addContinuidadAsistencialToCollectionIfMissing<IContinuidadAsistencial>(
            continuidadAsistencials,
            this.terapia?.continuidad,
          ),
        ),
      )
      .subscribe(
        (continuidadAsistencials: IContinuidadAsistencial[]) => (this.continuidadAsistencialsSharedCollection = continuidadAsistencials),
      );

    this.itemLiquidacionService
      .query()
      .pipe(map((res: HttpResponse<IItemLiquidacion[]>) => res.body ?? []))
      .pipe(
        map((itemLiquidacions: IItemLiquidacion[]) =>
          this.itemLiquidacionService.addItemLiquidacionToCollectionIfMissing<IItemLiquidacion>(
            itemLiquidacions,
            this.terapia?.itemLiquidacion,
          ),
        ),
      )
      .subscribe((itemLiquidacions: IItemLiquidacion[]) => (this.itemLiquidacionsSharedCollection = itemLiquidacions));

    this.tarifarioService
      .query()
      .pipe(map((res: HttpResponse<ITarifario[]>) => res.body ?? []))
      .pipe(
        map((tarifarios: ITarifario[]) =>
          this.tarifarioService.addTarifarioToCollectionIfMissing<ITarifario>(tarifarios, this.terapia?.tarifario),
        ),
      )
      .subscribe((tarifarios: ITarifario[]) => (this.tarifariosSharedCollection = tarifarios));
  }
}
