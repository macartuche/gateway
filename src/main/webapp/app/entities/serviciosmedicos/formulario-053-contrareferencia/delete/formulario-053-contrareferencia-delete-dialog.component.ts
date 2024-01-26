import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';
import { Formulario053ContrareferenciaService } from '../service/formulario-053-contrareferencia.service';

@Component({
  standalone: true,
  templateUrl: './formulario-053-contrareferencia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class Formulario053ContrareferenciaDeleteDialogComponent {
  formulario053Contrareferencia?: IFormulario053Contrareferencia;

  constructor(
    protected formulario053ContrareferenciaService: Formulario053ContrareferenciaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formulario053ContrareferenciaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
