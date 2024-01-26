import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IContinuidadAsistencial } from '../continuidad-asistencial.model';

@Component({
  standalone: true,
  selector: 'jhi-continuidad-asistencial-detail',
  templateUrl: './continuidad-asistencial-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ContinuidadAsistencialDetailComponent {
  @Input() continuidadAsistencial: IContinuidadAsistencial | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
