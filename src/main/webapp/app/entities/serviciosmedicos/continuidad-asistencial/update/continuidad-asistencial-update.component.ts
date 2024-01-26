import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';
import { ItemCieService } from 'app/entities/serviciosmedicos/item-cie/service/item-cie.service';
import { IContinuidadAsistencial } from '../continuidad-asistencial.model';
import { ContinuidadAsistencialService } from '../service/continuidad-asistencial.service';
import { ContinuidadAsistencialFormService, ContinuidadAsistencialFormGroup } from './continuidad-asistencial-form.service';

@Component({
  standalone: true,
  selector: 'jhi-continuidad-asistencial-update',
  templateUrl: './continuidad-asistencial-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ContinuidadAsistencialUpdateComponent implements OnInit {
  isSaving = false;
  continuidadAsistencial: IContinuidadAsistencial | null = null;

  itemCiesSharedCollection: IItemCie[] = [];

  editForm: ContinuidadAsistencialFormGroup = this.continuidadAsistencialFormService.createContinuidadAsistencialFormGroup();

  constructor(
    protected continuidadAsistencialService: ContinuidadAsistencialService,
    protected continuidadAsistencialFormService: ContinuidadAsistencialFormService,
    protected itemCieService: ItemCieService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareItemCie = (o1: IItemCie | null, o2: IItemCie | null): boolean => this.itemCieService.compareItemCie(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ continuidadAsistencial }) => {
      this.continuidadAsistencial = continuidadAsistencial;
      if (continuidadAsistencial) {
        this.updateForm(continuidadAsistencial);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const continuidadAsistencial = this.continuidadAsistencialFormService.getContinuidadAsistencial(this.editForm);
    if (continuidadAsistencial.id !== null) {
      this.subscribeToSaveResponse(this.continuidadAsistencialService.update(continuidadAsistencial));
    } else {
      this.subscribeToSaveResponse(this.continuidadAsistencialService.create(continuidadAsistencial));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContinuidadAsistencial>>): void {
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

  protected updateForm(continuidadAsistencial: IContinuidadAsistencial): void {
    this.continuidadAsistencial = continuidadAsistencial;
    this.continuidadAsistencialFormService.resetForm(this.editForm, continuidadAsistencial);

    this.itemCiesSharedCollection = this.itemCieService.addItemCieToCollectionIfMissing<IItemCie>(
      this.itemCiesSharedCollection,
      continuidadAsistencial.itemCie,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.itemCieService
      .query()
      .pipe(map((res: HttpResponse<IItemCie[]>) => res.body ?? []))
      .pipe(
        map((itemCies: IItemCie[]) =>
          this.itemCieService.addItemCieToCollectionIfMissing<IItemCie>(itemCies, this.continuidadAsistencial?.itemCie),
        ),
      )
      .subscribe((itemCies: IItemCie[]) => (this.itemCiesSharedCollection = itemCies));
  }
}
