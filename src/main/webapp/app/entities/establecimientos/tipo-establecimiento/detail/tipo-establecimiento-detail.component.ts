import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITipoEstablecimiento } from '../tipo-establecimiento.model';

@Component({
  standalone: true,
  selector: 'jhi-tipo-establecimiento-detail',
  templateUrl: './tipo-establecimiento-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TipoEstablecimientoDetailComponent {
  @Input() tipoEstablecimiento: ITipoEstablecimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
