import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHorarioEstablecimiento } from '../horario-establecimiento.model';
import { HorarioEstablecimientoService } from '../service/horario-establecimiento.service';

@Component({
  standalone: true,
  templateUrl: './horario-establecimiento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HorarioEstablecimientoDeleteDialogComponent {
  horarioEstablecimiento?: IHorarioEstablecimiento;

  constructor(
    protected horarioEstablecimientoService: HorarioEstablecimientoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioEstablecimientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
