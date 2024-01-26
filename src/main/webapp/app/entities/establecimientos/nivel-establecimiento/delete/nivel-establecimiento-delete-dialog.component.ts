import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INivelEstablecimiento } from '../nivel-establecimiento.model';
import { NivelEstablecimientoService } from '../service/nivel-establecimiento.service';

@Component({
  standalone: true,
  templateUrl: './nivel-establecimiento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NivelEstablecimientoDeleteDialogComponent {
  nivelEstablecimiento?: INivelEstablecimiento;

  constructor(
    protected nivelEstablecimientoService: NivelEstablecimientoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nivelEstablecimientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
