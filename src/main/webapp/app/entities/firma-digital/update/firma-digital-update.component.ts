import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { FirmaDigitalService } from '../service/firma-digital.service';
import { IFirmaDigital } from '../firma-digital.model';
import { FirmaDigitalFormService, FirmaDigitalFormGroup } from './firma-digital-form.service';

@Component({
  standalone: true,
  selector: 'jhi-firma-digital-update',
  templateUrl: './firma-digital-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FirmaDigitalUpdateComponent implements OnInit {
  isSaving = false;
  firmaDigital: IFirmaDigital | null = null;

  catalogoItemsSharedCollection: ICatalogoItem[] = [];
  personasSharedCollection: IPersona[] = [];

  editForm: FirmaDigitalFormGroup = this.firmaDigitalFormService.createFirmaDigitalFormGroup();

  constructor(
    protected firmaDigitalService: FirmaDigitalService,
    protected firmaDigitalFormService: FirmaDigitalFormService,
    protected catalogoItemService: CatalogoItemService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCatalogoItem = (o1: ICatalogoItem | null, o2: ICatalogoItem | null): boolean =>
    this.catalogoItemService.compareCatalogoItem(o1, o2);

  comparePersona = (o1: IPersona | null, o2: IPersona | null): boolean => this.personaService.comparePersona(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ firmaDigital }) => {
      this.firmaDigital = firmaDigital;
      if (firmaDigital) {
        this.updateForm(firmaDigital);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const firmaDigital = this.firmaDigitalFormService.getFirmaDigital(this.editForm);
    if (firmaDigital.id !== null) {
      this.subscribeToSaveResponse(this.firmaDigitalService.update(firmaDigital));
    } else {
      this.subscribeToSaveResponse(this.firmaDigitalService.create(firmaDigital));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFirmaDigital>>): void {
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

  protected updateForm(firmaDigital: IFirmaDigital): void {
    this.firmaDigital = firmaDigital;
    this.firmaDigitalFormService.resetForm(this.editForm, firmaDigital);

    this.catalogoItemsSharedCollection = this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(
      this.catalogoItemsSharedCollection,
      firmaDigital.tipo,
    );
    this.personasSharedCollection = this.personaService.addPersonaToCollectionIfMissing<IPersona>(
      this.personasSharedCollection,
      firmaDigital.persona,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.catalogoItemService
      .query()
      .pipe(map((res: HttpResponse<ICatalogoItem[]>) => res.body ?? []))
      .pipe(
        map((catalogoItems: ICatalogoItem[]) =>
          this.catalogoItemService.addCatalogoItemToCollectionIfMissing<ICatalogoItem>(catalogoItems, this.firmaDigital?.tipo),
        ),
      )
      .subscribe((catalogoItems: ICatalogoItem[]) => (this.catalogoItemsSharedCollection = catalogoItems));

    this.personaService
      .query()
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(
        map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing<IPersona>(personas, this.firmaDigital?.persona)),
      )
      .subscribe((personas: IPersona[]) => (this.personasSharedCollection = personas));
  }
}
