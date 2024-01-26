import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';

@Component({
  standalone: true,
  selector: 'jhi-doctor-especialidad-establecimiento-detail',
  templateUrl: './doctor-especialidad-establecimiento-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DoctorEspecialidadEstablecimientoDetailComponent {
  @Input() doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
