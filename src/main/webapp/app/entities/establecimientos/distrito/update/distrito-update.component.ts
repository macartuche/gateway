import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProvincia } from 'app/entities/establecimientos/provincia/provincia.model';
import { ProvinciaService } from 'app/entities/establecimientos/provincia/service/provincia.service';
import { IDistrito } from '../distrito.model';
import { DistritoService } from '../service/distrito.service';
import { DistritoFormService, DistritoFormGroup } from './distrito-form.service';

@Component({
  standalone: true,
  selector: 'jhi-distrito-update',
  templateUrl: './distrito-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DistritoUpdateComponent implements OnInit {
  isSaving = false;
  distrito: IDistrito | null = null;

  provinciasSharedCollection: IProvincia[] = [];

  editForm: DistritoFormGroup = this.distritoFormService.createDistritoFormGroup();

  constructor(
    protected distritoService: DistritoService,
    protected distritoFormService: DistritoFormService,
    protected provinciaService: ProvinciaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProvincia = (o1: IProvincia | null, o2: IProvincia | null): boolean => this.provinciaService.compareProvincia(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ distrito }) => {
      this.distrito = distrito;
      if (distrito) {
        this.updateForm(distrito);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const distrito = this.distritoFormService.getDistrito(this.editForm);
    if (distrito.id !== null) {
      this.subscribeToSaveResponse(this.distritoService.update(distrito));
    } else {
      this.subscribeToSaveResponse(this.distritoService.create(distrito));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDistrito>>): void {
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

  protected updateForm(distrito: IDistrito): void {
    this.distrito = distrito;
    this.distritoFormService.resetForm(this.editForm, distrito);

    this.provinciasSharedCollection = this.provinciaService.addProvinciaToCollectionIfMissing<IProvincia>(
      this.provinciasSharedCollection,
      distrito.provincia,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.provinciaService
      .query()
      .pipe(map((res: HttpResponse<IProvincia[]>) => res.body ?? []))
      .pipe(
        map((provincias: IProvincia[]) =>
          this.provinciaService.addProvinciaToCollectionIfMissing<IProvincia>(provincias, this.distrito?.provincia),
        ),
      )
      .subscribe((provincias: IProvincia[]) => (this.provinciasSharedCollection = provincias));
  }
}
