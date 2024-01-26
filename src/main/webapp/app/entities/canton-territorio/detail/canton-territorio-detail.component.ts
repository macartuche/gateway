import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICantonTerritorio } from '../canton-territorio.model';

@Component({
  standalone: true,
  selector: 'jhi-canton-territorio-detail',
  templateUrl: './canton-territorio-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CantonTerritorioDetailComponent {
  @Input() cantonTerritorio: ICantonTerritorio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
