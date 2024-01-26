import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IContinuidadAsistencial } from '../continuidad-asistencial.model';
import { ContinuidadAsistencialService } from '../service/continuidad-asistencial.service';

@Component({
  standalone: true,
  templateUrl: './continuidad-asistencial-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ContinuidadAsistencialDeleteDialogComponent {
  continuidadAsistencial?: IContinuidadAsistencial;

  constructor(
    protected continuidadAsistencialService: ContinuidadAsistencialService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.continuidadAsistencialService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
