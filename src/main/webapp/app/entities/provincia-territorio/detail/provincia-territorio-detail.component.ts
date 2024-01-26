import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IProvinciaTerritorio } from '../provincia-territorio.model';

@Component({
  standalone: true,
  selector: 'jhi-provincia-territorio-detail',
  templateUrl: './provincia-territorio-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ProvinciaTerritorioDetailComponent {
  @Input() provinciaTerritorio: IProvinciaTerritorio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
