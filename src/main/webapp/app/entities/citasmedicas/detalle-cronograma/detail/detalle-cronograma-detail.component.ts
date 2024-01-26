import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDetalleCronograma } from '../detalle-cronograma.model';

@Component({
  standalone: true,
  selector: 'jhi-detalle-cronograma-detail',
  templateUrl: './detalle-cronograma-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DetalleCronogramaDetailComponent {
  @Input() detalleCronograma: IDetalleCronograma | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
