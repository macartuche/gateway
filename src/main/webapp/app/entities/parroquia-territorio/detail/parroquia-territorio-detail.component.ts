import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IParroquiaTerritorio } from '../parroquia-territorio.model';

@Component({
  standalone: true,
  selector: 'jhi-parroquia-territorio-detail',
  templateUrl: './parroquia-territorio-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ParroquiaTerritorioDetailComponent {
  @Input() parroquiaTerritorio: IParroquiaTerritorio | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
