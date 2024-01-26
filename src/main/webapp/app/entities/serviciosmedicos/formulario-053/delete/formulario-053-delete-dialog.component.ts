import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFormulario053 } from '../formulario-053.model';
import { Formulario053Service } from '../service/formulario-053.service';

@Component({
  standalone: true,
  templateUrl: './formulario-053-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Formulario053DeleteDialogComponent {
  formulario053?: IFormulario053;

  constructor(
    protected formulario053Service: Formulario053Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formulario053Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
