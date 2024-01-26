import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';

@Component({
  standalone: true,
  selector: 'jhi-contacto-emergencia-paciente-detail',
  templateUrl: './contacto-emergencia-paciente-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ContactoEmergenciaPacienteDetailComponent {
  @Input() contactoEmergenciaPaciente: IContactoEmergenciaPaciente | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
