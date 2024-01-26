import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProvinciaTerritorio } from 'app/entities/provincia-territorio/provincia-territorio.model';
import { ProvinciaTerritorioService } from 'app/entities/provincia-territorio/service/provincia-territorio.service';
import { ICantonTerritorio } from '../canton-territorio.model';
import { CantonTerritorioService } from '../service/canton-territorio.service';
import { CantonTerritorioFormService, CantonTerritorioFormGroup } from './canton-territorio-form.service';

@Component({
  standalone: true,
  selector: 'jhi-canton-territorio-update',
  templateUrl: './canton-territorio-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CantonTerritorioUpdateComponent implements OnInit {
  isSaving = false;
  cantonTerritorio: ICantonTerritorio | null = null;

  provinciaTerritoriosSharedCollection: IProvinciaTerritorio[] = [];

  editForm: CantonTerritorioFormGroup = this.cantonTerritorioFormService.createCantonTerritorioFormGroup();

  constructor(
    protected cantonTerritorioService: CantonTerritorioService,
    protected cantonTerritorioFormService: CantonTerritorioFormService,
    protected provinciaTerritorioService: ProvinciaTerritorioService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProvinciaTerritorio = (o1: IProvinciaTerritorio | null, o2: IProvinciaTerritorio | null): boolean =>
    this.provinciaTerritorioService.compareProvinciaTerritorio(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantonTerritorio }) => {
      this.cantonTerritorio = cantonTerritorio;
      if (cantonTerritorio) {
        this.updateForm(cantonTerritorio);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cantonTerritorio = this.cantonTerritorioFormService.getCantonTerritorio(this.editForm);
    if (cantonTerritorio.id !== null) {
      this.subscribeToSaveResponse(this.cantonTerritorioService.update(cantonTerritorio));
    } else {
      this.subscribeToSaveResponse(this.cantonTerritorioService.create(cantonTerritorio));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICantonTerritorio>>): void {
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

  protected updateForm(cantonTerritorio: ICantonTerritorio): void {
    this.cantonTerritorio = cantonTerritorio;
    this.cantonTerritorioFormService.resetForm(this.editForm, cantonTerritorio);

    this.provinciaTerritoriosSharedCollection =
      this.provinciaTerritorioService.addProvinciaTerritorioToCollectionIfMissing<IProvinciaTerritorio>(
        this.provinciaTerritoriosSharedCollection,
        cantonTerritorio.provincia,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.provinciaTerritorioService
      .query()
      .pipe(map((res: HttpResponse<IProvinciaTerritorio[]>) => res.body ?? []))
      .pipe(
        map((provinciaTerritorios: IProvinciaTerritorio[]) =>
          this.provinciaTerritorioService.addProvinciaTerritorioToCollectionIfMissing<IProvinciaTerritorio>(
            provinciaTerritorios,
            this.cantonTerritorio?.provincia,
          ),
        ),
      )
      .subscribe((provinciaTerritorios: IProvinciaTerritorio[]) => (this.provinciaTerritoriosSharedCollection = provinciaTerritorios));
  }
}
