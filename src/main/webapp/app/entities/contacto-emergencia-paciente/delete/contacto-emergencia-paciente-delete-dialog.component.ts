import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';
import { ContactoEmergenciaPacienteService } from '../service/contacto-emergencia-paciente.service';

@Component({
  standalone: true,
  templateUrl: './contacto-emergencia-paciente-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ContactoEmergenciaPacienteDeleteDialogComponent {
  contactoEmergenciaPaciente?: IContactoEmergenciaPaciente;

  constructor(
    protected contactoEmergenciaPacienteService: ContactoEmergenciaPacienteService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactoEmergenciaPacienteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
