import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProcedimiento } from '../procedimiento.model';
import { ProcedimientoService } from '../service/procedimiento.service';

@Component({
  standalone: true,
  templateUrl: './procedimiento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProcedimientoDeleteDialogComponent {
  procedimiento?: IProcedimiento;

  constructor(
    protected procedimientoService: ProcedimientoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.procedimientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
