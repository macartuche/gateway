import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITarifario } from '../tarifario.model';
import { TarifarioService } from '../service/tarifario.service';
import { TarifarioFormService, TarifarioFormGroup } from './tarifario-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tarifario-update',
  templateUrl: './tarifario-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TarifarioUpdateComponent implements OnInit {
  isSaving = false;
  tarifario: ITarifario | null = null;

  editForm: TarifarioFormGroup = this.tarifarioFormService.createTarifarioFormGroup();

  constructor(
    protected tarifarioService: TarifarioService,
    protected tarifarioFormService: TarifarioFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarifario }) => {
      this.tarifario = tarifario;
      if (tarifario) {
        this.updateForm(tarifario);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarifario = this.tarifarioFormService.getTarifario(this.editForm);
    if (tarifario.id !== null) {
      this.subscribeToSaveResponse(this.tarifarioService.update(tarifario));
    } else {
      this.subscribeToSaveResponse(this.tarifarioService.create(tarifario));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarifario>>): void {
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

  protected updateForm(tarifario: ITarifario): void {
    this.tarifario = tarifario;
    this.tarifarioFormService.resetForm(this.editForm, tarifario);
  }
}
