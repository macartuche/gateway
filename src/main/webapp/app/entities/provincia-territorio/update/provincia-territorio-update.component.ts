import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProvinciaTerritorio } from '../provincia-territorio.model';
import { ProvinciaTerritorioService } from '../service/provincia-territorio.service';
import { ProvinciaTerritorioFormService, ProvinciaTerritorioFormGroup } from './provincia-territorio-form.service';

@Component({
  standalone: true,
  selector: 'jhi-provincia-territorio-update',
  templateUrl: './provincia-territorio-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProvinciaTerritorioUpdateComponent implements OnInit {
  isSaving = false;
  provinciaTerritorio: IProvinciaTerritorio | null = null;

  editForm: ProvinciaTerritorioFormGroup = this.provinciaTerritorioFormService.createProvinciaTerritorioFormGroup();

  constructor(
    protected provinciaTerritorioService: ProvinciaTerritorioService,
    protected provinciaTerritorioFormService: ProvinciaTerritorioFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provinciaTerritorio }) => {
      this.provinciaTerritorio = provinciaTerritorio;
      if (provinciaTerritorio) {
        this.updateForm(provinciaTerritorio);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provinciaTerritorio = this.provinciaTerritorioFormService.getProvinciaTerritorio(this.editForm);
    if (provinciaTerritorio.id !== null) {
      this.subscribeToSaveResponse(this.provinciaTerritorioService.update(provinciaTerritorio));
    } else {
      this.subscribeToSaveResponse(this.provinciaTerritorioService.create(provinciaTerritorio));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvinciaTerritorio>>): void {
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

  protected updateForm(provinciaTerritorio: IProvinciaTerritorio): void {
    this.provinciaTerritorio = provinciaTerritorio;
    this.provinciaTerritorioFormService.resetForm(this.editForm, provinciaTerritorio);
  }
}
