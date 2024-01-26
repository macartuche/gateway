import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICantonTerritorio } from 'app/entities/canton-territorio/canton-territorio.model';
import { CantonTerritorioService } from 'app/entities/canton-territorio/service/canton-territorio.service';
import { IParroquiaTerritorio } from '../parroquia-territorio.model';
import { ParroquiaTerritorioService } from '../service/parroquia-territorio.service';
import { ParroquiaTerritorioFormService, ParroquiaTerritorioFormGroup } from './parroquia-territorio-form.service';

@Component({
  standalone: true,
  selector: 'jhi-parroquia-territorio-update',
  templateUrl: './parroquia-territorio-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ParroquiaTerritorioUpdateComponent implements OnInit {
  isSaving = false;
  parroquiaTerritorio: IParroquiaTerritorio | null = null;

  cantonTerritoriosSharedCollection: ICantonTerritorio[] = [];

  editForm: ParroquiaTerritorioFormGroup = this.parroquiaTerritorioFormService.createParroquiaTerritorioFormGroup();

  constructor(
    protected parroquiaTerritorioService: ParroquiaTerritorioService,
    protected parroquiaTerritorioFormService: ParroquiaTerritorioFormService,
    protected cantonTerritorioService: CantonTerritorioService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCantonTerritorio = (o1: ICantonTerritorio | null, o2: ICantonTerritorio | null): boolean =>
    this.cantonTerritorioService.compareCantonTerritorio(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parroquiaTerritorio }) => {
      this.parroquiaTerritorio = parroquiaTerritorio;
      if (parroquiaTerritorio) {
        this.updateForm(parroquiaTerritorio);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parroquiaTerritorio = this.parroquiaTerritorioFormService.getParroquiaTerritorio(this.editForm);
    if (parroquiaTerritorio.id !== null) {
      this.subscribeToSaveResponse(this.parroquiaTerritorioService.update(parroquiaTerritorio));
    } else {
      this.subscribeToSaveResponse(this.parroquiaTerritorioService.create(parroquiaTerritorio));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParroquiaTerritorio>>): void {
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

  protected updateForm(parroquiaTerritorio: IParroquiaTerritorio): void {
    this.parroquiaTerritorio = parroquiaTerritorio;
    this.parroquiaTerritorioFormService.resetForm(this.editForm, parroquiaTerritorio);

    this.cantonTerritoriosSharedCollection = this.cantonTerritorioService.addCantonTerritorioToCollectionIfMissing<ICantonTerritorio>(
      this.cantonTerritoriosSharedCollection,
      parroquiaTerritorio.canton,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cantonTerritorioService
      .query()
      .pipe(map((res: HttpResponse<ICantonTerritorio[]>) => res.body ?? []))
      .pipe(
        map((cantonTerritorios: ICantonTerritorio[]) =>
          this.cantonTerritorioService.addCantonTerritorioToCollectionIfMissing<ICantonTerritorio>(
            cantonTerritorios,
            this.parroquiaTerritorio?.canton,
          ),
        ),
      )
      .subscribe((cantonTerritorios: ICantonTerritorio[]) => (this.cantonTerritoriosSharedCollection = cantonTerritorios));
  }
}
