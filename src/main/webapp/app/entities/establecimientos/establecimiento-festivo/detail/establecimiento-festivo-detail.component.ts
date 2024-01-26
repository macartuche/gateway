import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IEstablecimientoFestivo } from '../establecimiento-festivo.model';

@Component({
  standalone: true,
  selector: 'jhi-establecimiento-festivo-detail',
  templateUrl: './establecimiento-festivo-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class EstablecimientoFestivoDetailComponent {
  @Input() establecimientoFestivo: IEstablecimientoFestivo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
