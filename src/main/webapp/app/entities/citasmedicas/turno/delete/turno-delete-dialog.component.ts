import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITurno } from '../turno.model';
import { TurnoService } from '../service/turno.service';

@Component({
  standalone: true,
  templateUrl: './turno-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TurnoDeleteDialogComponent {
  turno?: ITurno;

  constructor(
    protected turnoService: TurnoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.turnoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
