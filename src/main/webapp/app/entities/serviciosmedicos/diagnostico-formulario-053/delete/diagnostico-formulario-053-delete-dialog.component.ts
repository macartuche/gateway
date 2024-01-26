import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';
import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';

@Component({
  standalone: true,
  templateUrl: './diagnostico-formulario-053-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DiagnosticoFormulario053DeleteDialogComponent {
  diagnosticoFormulario053?: IDiagnosticoFormulario053;

  constructor(
    protected diagnosticoFormulario053Service: DiagnosticoFormulario053Service,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diagnosticoFormulario053Service.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
