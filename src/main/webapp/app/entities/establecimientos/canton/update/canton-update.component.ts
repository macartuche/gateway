import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDistrito } from 'app/entities/establecimientos/distrito/distrito.model';
import { DistritoService } from 'app/entities/establecimientos/distrito/service/distrito.service';
import { ICanton } from '../canton.model';
import { CantonService } from '../service/canton.service';
import { CantonFormService, CantonFormGroup } from './canton-form.service';

@Component({
  standalone: true,
  selector: 'jhi-canton-update',
  templateUrl: './canton-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CantonUpdateComponent implements OnInit {
  isSaving = false;
  canton: ICanton | null = null;

  distritosSharedCollection: IDistrito[] = [];

  editForm: CantonFormGroup = this.cantonFormService.createCantonFormGroup();

  constructor(
    protected cantonService: CantonService,
    protected cantonFormService: CantonFormService,
    protected distritoService: DistritoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareDistrito = (o1: IDistrito | null, o2: IDistrito | null): boolean => this.distritoService.compareDistrito(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ canton }) => {
      this.canton = canton;
      if (canton) {
        this.updateForm(canton);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const canton = this.cantonFormService.getCanton(this.editForm);
    if (canton.id !== null) {
      this.subscribeToSaveResponse(this.cantonService.update(canton));
    } else {
      this.subscribeToSaveResponse(this.cantonService.create(canton));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICanton>>): void {
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

  protected updateForm(canton: ICanton): void {
    this.canton = canton;
    this.cantonFormService.resetForm(this.editForm, canton);

    this.distritosSharedCollection = this.distritoService.addDistritoToCollectionIfMissing<IDistrito>(
      this.distritosSharedCollection,
      canton.distrito,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.distritoService
      .query()
      .pipe(map((res: HttpResponse<IDistrito[]>) => res.body ?? []))
      .pipe(
        map((distritos: IDistrito[]) => this.distritoService.addDistritoToCollectionIfMissing<IDistrito>(distritos, this.canton?.distrito)),
      )
      .subscribe((distritos: IDistrito[]) => (this.distritosSharedCollection = distritos));
  }
}
