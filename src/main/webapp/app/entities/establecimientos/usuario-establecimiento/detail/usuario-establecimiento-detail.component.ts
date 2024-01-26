import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IUsuarioEstablecimiento } from '../usuario-establecimiento.model';

@Component({
  standalone: true,
  selector: 'jhi-usuario-establecimiento-detail',
  templateUrl: './usuario-establecimiento-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class UsuarioEstablecimientoDetailComponent {
  @Input() usuarioEstablecimiento: IUsuarioEstablecimiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
