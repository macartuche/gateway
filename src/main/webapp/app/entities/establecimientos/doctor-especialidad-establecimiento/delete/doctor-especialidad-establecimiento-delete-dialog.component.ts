import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';
import { DoctorEspecialidadEstablecimientoService } from '../service/doctor-especialidad-establecimiento.service';

@Component({
  standalone: true,
  templateUrl: './doctor-especialidad-establecimiento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DoctorEspecialidadEstablecimientoDeleteDialogComponent {
  doctorEspecialidadEstablecimiento?: IDoctorEspecialidadEstablecimiento;

  constructor(
    protected doctorEspecialidadEstablecimientoService: DoctorEspecialidadEstablecimientoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doctorEspecialidadEstablecimientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
