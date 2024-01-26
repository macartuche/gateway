import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { IEspecialidad } from '../especialidad.model';
import { EspecialidadService } from '../service/especialidad.service';
import { EspecialidadFormService, EspecialidadFormGroup } from './especialidad-form.service';

@Component({
  standalone: true,
  selector: 'jhi-especialidad-update',
  templateUrl: './especialidad-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EspecialidadUpdateComponent implements OnInit {
  isSaving = false;
  especialidad: IEspecialidad | null = null;

  catalogoItemsSharedCollection: ICatalogoItem[] = [];

  editForm: EspecialidadFormGroup = this.especialidadFormService.createEspecialidadFormGroup();

  constructor(
    protected especialidadService: EspecialidadService,
    protected especialidadFormService: EspecialidadFormService,
    protected catalogoItemService: CatalogoItemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCatalogoItem = (o1: ICatalogoItem | null, o2: ICatalogoItem | null): boolean =>
    this.catalogoItemService.compareCatalogoItem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ especialidad }) => {
      this.especialidad = especialidad;
      if (especialidad) {
        this.updateForm(especialidad);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const especialidad = this.especialidadFormService.getEspecialidad(this.editForm);
    if (especialidad.id !== null) {
      this.subscribeToSaveResponse(this.especialidadService.update(especialidad));
    } else {
      this.subscribeToSaveResponse(this.especialidadService.create(especialidad));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEspecialidad>>): void {
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

  protected updateForm(especialidad: IEspecialidad): void {
    this.especialidad = especialidad;
    this.especialidadFormService.resetForm(this.editForm, especialidad);

    this.catalogoItemsSharedCollection = this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
      this.catalogoItemsSharedCollection,
      especialidad.tipo,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.catalogoItemService
      .query()
      .pipe(map((res: HttpResponse<ICatalogoItem[]>) => res.body ?? []))
      .pipe(
        map((catalogoItems: ICatalogoItem[]) =>
          this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(catalogoItems, this.especialidad?.tipo),
        ),
      )
      .subscribe((catalogoItems: ICatalogoItem[]) => (this.catalogoItemsSharedCollection = catalogoItems));
  }
}
