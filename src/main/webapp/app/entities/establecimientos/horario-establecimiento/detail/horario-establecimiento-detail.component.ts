import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHorarioEstablecimiento } from '../horario-establecimiento.model';

@Component({
  standalone: true,
  selector: 'jhi-horario-establecimiento-detail',
  templateUrl: './horario-establecimiento-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HorarioEstablecimientoDetailComponent {
  @Input() horarioEstablecimiento: IHorarioEstablecimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
