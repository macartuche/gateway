import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { IDiscapacidad } from '../discapacidad.model';
import { DiscapacidadService } from '../service/discapacidad.service';
import { DiscapacidadFormService, DiscapacidadFormGroup } from './discapacidad-form.service';

@Component({
  standalone: true,
  selector: 'jhi-discapacidad-update',
  templateUrl: './discapacidad-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DiscapacidadUpdateComponent implements OnInit {
  isSaving = false;
  discapacidad: IDiscapacidad | null = null;

  catalogoItemsSharedCollection: ICatalogoItem[] = [];

  editForm: DiscapacidadFormGroup = this.discapacidadFormService.createDiscapacidadFormGroup();

  constructor(
    protected discapacidadService: DiscapacidadService,
    protected discapacidadFormService: DiscapacidadFormService,
    protected catalogoItemService: CatalogoItemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCatalogoItem = (o1: ICatalogoItem | null, o2: ICatalogoItem | null): boolean =>
    this.catalogoItemService.compareCatalogoItem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discapacidad }) => {
      this.discapacidad = discapacidad;
      if (discapacidad) {
        this.updateForm(discapacidad);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const discapacidad = this.discapacidadFormService.getDiscapacidad(this.editForm);
    if (discapacidad.id !== null) {
      this.subscribeToSaveResponse(this.discapacidadService.update(discapacidad));
    } else {
      this.subscribeToSaveResponse(this.discapacidadService.create(discapacidad));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiscapacidad>>): void {
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

  protected updateForm(discapacidad: IDiscapacidad): void {
    this.discapacidad = discapacidad;
    this.discapacidadFormService.resetForm(this.editForm, discapacidad);

    this.catalogoItemsSharedCollection = this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
      this.catalogoItemsSharedCollection,
      discapacidad.tipo,
      discapacidad.estado,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.catalogoItemService
      .query()
      .pipe(map((res: HttpResponse<ICatalogoItem[]>) => res.body ?? []))
      .pipe(
        map((catalogoItems: ICatalogoItem[]) =>
          this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
            catalogoItems,
            this.discapacidad?.tipo,
            this.discapacidad?.estado,
          ),
        ),
      )
      .subscribe((catalogoItems: ICatalogoItem[]) => (this.catalogoItemsSharedCollection = catalogoItems));
  }
}
