import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFormulario053Referencia } from '../formulario-053-referencia.model';
import { Formulario053ReferenciaService } from '../service/formulario-053-referencia.service';

@Component({
  standalone: true,
  templateUrl: './formulario-053-referencia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Formulario053ReferenciaDeleteDialogComponent {
  formulario053Referencia?: IFormulario053Referencia;

  constructor(
    protected formulario053ReferenciaService: Formulario053ReferenciaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formulario053ReferenciaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
