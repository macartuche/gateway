import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICitaMedica } from '../cita-medica.model';
import { CitaMedicaService } from '../service/cita-medica.service';

@Component({
  standalone: true,
  templateUrl: './cita-medica-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CitaMedicaDeleteDialogComponent {
  citaMedica?: ICitaMedica;

  constructor(
    protected citaMedicaService: CitaMedicaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.citaMedicaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
