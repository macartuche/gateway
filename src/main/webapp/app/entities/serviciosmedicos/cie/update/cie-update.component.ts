import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICie } from '../cie.model';
import { CieService } from '../service/cie.service';
import { CieFormService, CieFormGroup } from './cie-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cie-update',
  templateUrl: './cie-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CieUpdateComponent implements OnInit {
  isSaving = false;
  cie: ICie | null = null;

  editForm: CieFormGroup = this.cieFormService.createCieFormGroup();

  constructor(
    protected cieService: CieService,
    protected cieFormService: CieFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cie }) => {
      this.cie = cie;
      if (cie) {
        this.updateForm(cie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cie = this.cieFormService.getCie(this.editForm);
    if (cie.id !== null) {
      this.subscribeToSaveResponse(this.cieService.update(cie));
    } else {
      this.subscribeToSaveResponse(this.cieService.create(cie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICie>>): void {
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

  protected updateForm(cie: ICie): void {
    this.cie = cie;
    this.cieFormService.resetForm(this.editForm, cie);
  }
}
