import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICie } from 'app/entities/serviciosmedicos/cie/cie.model';
import { CieService } from 'app/entities/serviciosmedicos/cie/service/cie.service';
import { IItemCie } from '../item-cie.model';
import { ItemCieService } from '../service/item-cie.service';
import { ItemCieFormService, ItemCieFormGroup } from './item-cie-form.service';

@Component({
  standalone: true,
  selector: 'jhi-item-cie-update',
  templateUrl: './item-cie-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ItemCieUpdateComponent implements OnInit {
  isSaving = false;
  itemCie: IItemCie | null = null;

  itemCiesSharedCollection: IItemCie[] = [];
  ciesSharedCollection: ICie[] = [];

  editForm: ItemCieFormGroup = this.itemCieFormService.createItemCieFormGroup();

  constructor(
    protected itemCieService: ItemCieService,
    protected itemCieFormService: ItemCieFormService,
    protected cieService: CieService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareItemCie = (o1: IItemCie | null, o2: IItemCie | null): boolean => this.itemCieService.compareItemCie(o1, o2);

  compareCie = (o1: ICie | null, o2: ICie | null): boolean => this.cieService.compareCie(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemCie }) => {
      this.itemCie = itemCie;
      if (itemCie) {
        this.updateForm(itemCie);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemCie = this.itemCieFormService.getItemCie(this.editForm);
    if (itemCie.id !== null) {
      this.subscribeToSaveResponse(this.itemCieService.update(itemCie));
    } else {
      this.subscribeToSaveResponse(this.itemCieService.create(itemCie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemCie>>): void {
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

  protected updateForm(itemCie: IItemCie): void {
    this.itemCie = itemCie;
    this.itemCieFormService.resetForm(this.editForm, itemCie);

    this.itemCiesSharedCollection = this.itemCieService.addItemCieToCollectionIfMissing<IItemCie>(
      this.itemCiesSharedCollection,
      itemCie.padre,
    );
    this.ciesSharedCollection = this.cieService.addCieToCollectionIfMissing<ICie>(this.ciesSharedCollection, itemCie.cie);
  }

  protected loadRelationshipsOptions(): void {
    this.itemCieService
      .query()
      .pipe(map((res: HttpResponse<IItemCie[]>) => res.body ?? []))
      .pipe(map((itemCies: IItemCie[]) => this.itemCieService.addItemCieToCollectionIfMissing<IItemCie>(itemCies, this.itemCie?.padre)))
      .subscribe((itemCies: IItemCie[]) => (this.itemCiesSharedCollection = itemCies));

    this.cieService
      .query()
      .pipe(map((res: HttpResponse<ICie[]>) => res.body ?? []))
      .pipe(map((cies: ICie[]) => this.cieService.addCieToCollectionIfMissing<ICie>(cies, this.itemCie?.cie)))
      .subscribe((cies: ICie[]) => (this.ciesSharedCollection = cies));
  }
}
