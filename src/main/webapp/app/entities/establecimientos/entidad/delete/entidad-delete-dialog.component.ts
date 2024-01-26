import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEntidad } from '../entidad.model';
import { EntidadService } from '../service/entidad.service';

@Component({
  standalone: true,
  templateUrl: './entidad-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class EntidadDeleteDialogComponent {
  entidad?: IEntidad;

  constructor(
    protected entidadService: EntidadService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entidadService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
