import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDiscapacidad } from '../discapacidad.model';
import { DiscapacidadService } from '../service/discapacidad.service';

@Component({
  standalone: true,
  templateUrl: './discapacidad-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DiscapacidadDeleteDialogComponent {
  discapacidad?: IDiscapacidad;

  constructor(
    protected discapacidadService: DiscapacidadService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.discapacidadService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
