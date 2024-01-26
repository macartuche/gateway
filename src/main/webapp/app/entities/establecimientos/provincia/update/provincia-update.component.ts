import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IZona } from 'app/entities/establecimientos/zona/zona.model';
import { ZonaService } from 'app/entities/establecimientos/zona/service/zona.service';
import { IProvincia } from '../provincia.model';
import { ProvinciaService } from '../service/provincia.service';
import { ProvinciaFormService, ProvinciaFormGroup } from './provincia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-provincia-update',
  templateUrl: './provincia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProvinciaUpdateComponent implements OnInit {
  isSaving = false;
  provincia: IProvincia | null = null;

  zonasSharedCollection: IZona[] = [];

  editForm: ProvinciaFormGroup = this.provinciaFormService.createProvinciaFormGroup();

  constructor(
    protected provinciaService: ProvinciaService,
    protected provinciaFormService: ProvinciaFormService,
    protected zonaService: ZonaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareZona = (o1: IZona | null, o2: IZona | null): boolean => this.zonaService.compareZona(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provincia }) => {
      this.provincia = provincia;
      if (provincia) {
        this.updateForm(provincia);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provincia = this.provinciaFormService.getProvincia(this.editForm);
    if (provincia.id !== null) {
      this.subscribeToSaveResponse(this.provinciaService.update(provincia));
    } else {
      this.subscribeToSaveResponse(this.provinciaService.create(provincia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvincia>>): void {
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

  protected updateForm(provincia: IProvincia): void {
    this.provincia = provincia;
    this.provinciaFormService.resetForm(this.editForm, provincia);

    this.zonasSharedCollection = this.zonaService.addZonaToCollectionIfMissing<IZona>(this.zonasSharedCollection, provincia.zona);
  }

  protected loadRelationshipsOptions(): void {
    this.zonaService
      .query()
      .pipe(map((res: HttpResponse<IZona[]>) => res.body ?? []))
      .pipe(map((zonas: IZona[]) => this.zonaService.addZonaToCollectionIfMissing<IZona>(zonas, this.provincia?.zona)))
      .subscribe((zonas: IZona[]) => (this.zonasSharedCollection = zonas));
  }
}
