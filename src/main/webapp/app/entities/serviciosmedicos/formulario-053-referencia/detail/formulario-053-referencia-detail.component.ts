import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IFormulario053Referencia } from '../formulario-053-referencia.model';

@Component({
  standalone: true,
  selector: 'jhi-formulario-053-referencia-detail',
  templateUrl: './formulario-053-referencia-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class Formulario053ReferenciaDetailComponent {
  @Input() formulario053Referencia: IFormulario053Referencia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
