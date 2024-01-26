import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IMotivoReferencia } from '../motivo-referencia.model';

@Component({
  standalone: true,
  selector: 'jhi-motivo-referencia-detail',
  templateUrl: './motivo-referencia-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MotivoReferenciaDetailComponent {
  @Input() motivoReferencia: IMotivoReferencia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
