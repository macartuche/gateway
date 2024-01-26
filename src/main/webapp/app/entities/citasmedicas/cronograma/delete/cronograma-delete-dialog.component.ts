import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICronograma } from '../cronograma.model';
import { CronogramaService } from '../service/cronograma.service';

@Component({
  standalone: true,
  templateUrl: './cronograma-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CronogramaDeleteDialogComponent {
  cronograma?: ICronograma;

  constructor(
    protected cronogramaService: CronogramaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cronogramaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
