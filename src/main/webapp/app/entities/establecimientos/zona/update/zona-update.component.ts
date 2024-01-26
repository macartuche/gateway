import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IZona } from '../zona.model';
import { ZonaService } from '../service/zona.service';
import { ZonaFormService, ZonaFormGroup } from './zona-form.service';

@Component({
  standalone: true,
  selector: 'jhi-zona-update',
  templateUrl: './zona-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ZonaUpdateComponent implements OnInit {
  isSaving = false;
  zona: IZona | null = null;

  editForm: ZonaFormGroup = this.zonaFormService.createZonaFormGroup();

  constructor(
    protected zonaService: ZonaService,
    protected zonaFormService: ZonaFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zona }) => {
      this.zona = zona;
      if (zona) {
        this.updateForm(zona);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zona = this.zonaFormService.getZona(this.editForm);
    if (zona.id !== null) {
      this.subscribeToSaveResponse(this.zonaService.update(zona));
    } else {
      this.subscribeToSaveResponse(this.zonaService.create(zona));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZona>>): void {
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

  protected updateForm(zona: IZona): void {
    this.zona = zona;
    this.zonaFormService.resetForm(this.editForm, zona);
  }
}
