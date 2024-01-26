import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICanton } from 'app/entities/establecimientos/canton/canton.model';
import { CantonService } from 'app/entities/establecimientos/canton/service/canton.service';
import { ICircuito } from '../circuito.model';
import { CircuitoService } from '../service/circuito.service';
import { CircuitoFormService, CircuitoFormGroup } from './circuito-form.service';

@Component({
  standalone: true,
  selector: 'jhi-circuito-update',
  templateUrl: './circuito-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CircuitoUpdateComponent implements OnInit {
  isSaving = false;
  circuito: ICircuito | null = null;

  cantonsSharedCollection: ICanton[] = [];

  editForm: CircuitoFormGroup = this.circuitoFormService.createCircuitoFormGroup();

  constructor(
    protected circuitoService: CircuitoService,
    protected circuitoFormService: CircuitoFormService,
    protected cantonService: CantonService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCanton = (o1: ICanton | null, o2: ICanton | null): boolean => this.cantonService.compareCanton(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ circuito }) => {
      this.circuito = circuito;
      if (circuito) {
        this.updateForm(circuito);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const circuito = this.circuitoFormService.getCircuito(this.editForm);
    if (circuito.id !== null) {
      this.subscribeToSaveResponse(this.circuitoService.update(circuito));
    } else {
      this.subscribeToSaveResponse(this.circuitoService.create(circuito));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICircuito>>): void {
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

  protected updateForm(circuito: ICircuito): void {
    this.circuito = circuito;
    this.circuitoFormService.resetForm(this.editForm, circuito);

    this.cantonsSharedCollection = this.cantonService.addCantonToCollectionIfMissing<ICanton>(
      this.cantonsSharedCollection,
      circuito.canton,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cantonService
      .query()
      .pipe(map((res: HttpResponse<ICanton[]>) => res.body ?? []))
      .pipe(map((cantons: ICanton[]) => this.cantonService.addCantonToCollectionIfMissing<ICanton>(cantons, this.circuito?.canton)))
      .subscribe((cantons: ICanton[]) => (this.cantonsSharedCollection = cantons));
  }
}
