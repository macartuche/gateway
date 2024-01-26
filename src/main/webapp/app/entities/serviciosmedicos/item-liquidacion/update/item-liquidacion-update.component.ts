import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IContinuidadAsistencial } from 'app/entities/serviciosmedicos/continuidad-asistencial/continuidad-asistencial.model';
import { ContinuidadAsistencialService } from 'app/entities/serviciosmedicos/continuidad-asistencial/service/continuidad-asistencial.service';
import { IItemLiquidacion } from '../item-liquidacion.model';
import { ItemLiquidacionService } from '../service/item-liquidacion.service';
import { ItemLiquidacionFormService, ItemLiquidacionFormGroup } from './item-liquidacion-form.service';

@Component({
  standalone: true,
  selector: 'jhi-item-liquidacion-update',
  templateUrl: './item-liquidacion-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ItemLiquidacionUpdateComponent implements OnInit {
  isSaving = false;
  itemLiquidacion: IItemLiquidacion | null = null;

  continuidadAsistencialsSharedCollection: IContinuidadAsistencial[] = [];

  editForm: ItemLiquidacionFormGroup = this.itemLiquidacionFormService.createItemLiquidacionFormGroup();

  constructor(
    protected itemLiquidacionService: ItemLiquidacionService,
    protected itemLiquidacionFormService: ItemLiquidacionFormService,
    protected continuidadAsistencialService: ContinuidadAsistencialService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareContinuidadAsistencial = (o1: IContinuidadAsistencial | null, o2: IContinuidadAsistencial | null): boolean =>
    this.continuidadAsistencialService.compareContinuidadAsistencial(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemLiquidacion }) => {
      this.itemLiquidacion = itemLiquidacion;
      if (itemLiquidacion) {
        this.updateForm(itemLiquidacion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemLiquidacion = this.itemLiquidacionFormService.getItemLiquidacion(this.editForm);
    if (itemLiquidacion.id !== null) {
      this.subscribeToSaveResponse(this.itemLiquidacionService.update(itemLiquidacion));
    } else {
      this.subscribeToSaveResponse(this.itemLiquidacionService.create(itemLiquidacion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemLiquidacion>>): void {
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

  protected updateForm(itemLiquidacion: IItemLiquidacion): void {
    this.itemLiquidacion = itemLiquidacion;
    this.itemLiquidacionFormService.resetForm(this.editForm, itemLiquidacion);

    this.continuidadAsistencialsSharedCollection =
      this.continuidadAsistencialService.addContinuidadAsistencialToCollectionIfMissing<IContinuidadAsistencial>(
        this.continuidadAsistencialsSharedCollection,
        itemLiquidacion.continuidad,
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
            this.itemLiquidacion?.continuidad,
          ),
        ),
      )
      .subscribe(
        (continuidadAsistencials: IContinuidadAsistencial[]) => (this.continuidadAsistencialsSharedCollection = continuidadAsistencials),
      );
  }
}
