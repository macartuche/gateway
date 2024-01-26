import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IFirmaDigital } from '../firma-digital.model';

@Component({
  standalone: true,
  selector: 'jhi-firma-digital-detail',
  templateUrl: './firma-digital-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class FirmaDigitalDetailComponent {
  @Input() firmaDigital: IFirmaDigital | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
