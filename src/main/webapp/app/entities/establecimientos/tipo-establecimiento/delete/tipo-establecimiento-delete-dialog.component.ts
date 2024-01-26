import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoEstablecimiento } from '../tipo-establecimiento.model';
import { TipoEstablecimientoService } from '../service/tipo-establecimiento.service';

@Component({
  standalone: true,
  templateUrl: './tipo-establecimiento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoEstablecimientoDeleteDialogComponent {
  tipoEstablecimiento?: ITipoEstablecimiento;

  constructor(
    protected tipoEstablecimientoService: TipoEstablecimientoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoEstablecimientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
