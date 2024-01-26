import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { INivelEstablecimiento } from '../nivel-establecimiento.model';

@Component({
  standalone: true,
  selector: 'jhi-nivel-establecimiento-detail',
  templateUrl: './nivel-establecimiento-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class NivelEstablecimientoDetailComponent {
  @Input() nivelEstablecimiento: INivelEstablecimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
