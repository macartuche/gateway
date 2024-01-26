import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';

@Component({
  standalone: true,
  selector: 'jhi-diagnostico-formulario-053-detail',
  templateUrl: './diagnostico-formulario-053-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DiagnosticoFormulario053DetailComponent {
  @Input() diagnosticoFormulario053: IDiagnosticoFormulario053 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
