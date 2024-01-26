import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IBloqueoTurno } from '../bloqueo-turno.model';

@Component({
  standalone: true,
  selector: 'jhi-bloqueo-turno-detail',
  templateUrl: './bloqueo-turno-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class BloqueoTurnoDetailComponent {
  @Input() bloqueoTurno: IBloqueoTurno | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
