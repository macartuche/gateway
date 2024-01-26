import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';

@Component({
  standalone: true,
  selector: 'jhi-formulario-053-contrareferencia-detail',
  templateUrl: './formulario-053-contrareferencia-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class Formulario053ContrareferenciaDetailComponent {
  @Input() formulario053Contrareferencia: IFormulario053Contrareferencia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
