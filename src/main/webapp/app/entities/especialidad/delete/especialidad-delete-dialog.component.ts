import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEspecialidad } from '../especialidad.model';
import { EspecialidadService } from '../service/especialidad.service';

@Component({
  standalone: true,
  templateUrl: './especialidad-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class EspecialidadDeleteDialogComponent {
  especialidad?: IEspecialidad;

  constructor(
    protected especialidadService: EspecialidadService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.especialidadService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
