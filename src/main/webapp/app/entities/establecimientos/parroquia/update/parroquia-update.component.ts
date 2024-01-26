import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICircuito } from 'app/entities/establecimientos/circuito/circuito.model';
import { CircuitoService } from 'app/entities/establecimientos/circuito/service/circuito.service';
import { IParroquia } from '../parroquia.model';
import { ParroquiaService } from '../service/parroquia.service';
import { ParroquiaFormService, ParroquiaFormGroup } from './parroquia-form.service';

@Component({
  standalone: true,
  selector: 'jhi-parroquia-update',
  templateUrl: './parroquia-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ParroquiaUpdateComponent implements OnInit {
  isSaving = false;
  parroquia: IParroquia | null = null;

  circuitosSharedCollection: ICircuito[] = [];

  editForm: ParroquiaFormGroup = this.parroquiaFormService.createParroquiaFormGroup();

  constructor(
    protected parroquiaService: ParroquiaService,
    protected parroquiaFormService: ParroquiaFormService,
    protected circuitoService: CircuitoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCircuito = (o1: ICircuito | null, o2: ICircuito | null): boolean => this.circuitoService.compareCircuito(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parroquia }) => {
      this.parroquia = parroquia;
      if (parroquia) {
        this.updateForm(parroquia);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parroquia = this.parroquiaFormService.getParroquia(this.editForm);
    if (parroquia.id !== null) {
      this.subscribeToSaveResponse(this.parroquiaService.update(parroquia));
    } else {
      this.subscribeToSaveResponse(this.parroquiaService.create(parroquia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParroquia>>): void {
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

  protected updateForm(parroquia: IParroquia): void {
    this.parroquia = parroquia;
    this.parroquiaFormService.resetForm(this.editForm, parroquia);

    this.circuitosSharedCollection = this.circuitoService.addCircuitoToCollectionIfMissing<ICircuito>(
      this.circuitosSharedCollection,
      parroquia.circuito,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.circuitoService
      .query()
      .pipe(map((res: HttpResponse<ICircuito[]>) => res.body ?? []))
      .pipe(
        map((circuitos: ICircuito[]) =>
          this.circuitoService.addCircuitoToCollectionIfMissing<ICircuito>(circuitos, this.parroquia?.circuito),
        ),
      )
      .subscribe((circuitos: ICircuito[]) => (this.circuitosSharedCollection = circuitos));
  }
}
