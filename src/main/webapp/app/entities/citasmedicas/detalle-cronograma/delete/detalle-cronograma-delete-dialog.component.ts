import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDetalleCronograma } from '../detalle-cronograma.model';
import { DetalleCronogramaService } from '../service/detalle-cronograma.service';

@Component({
  standalone: true,
  templateUrl: './detalle-cronograma-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DetalleCronogramaDeleteDialogComponent {
  detalleCronograma?: IDetalleCronograma;

  constructor(
    protected detalleCronogramaService: DetalleCronogramaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detalleCronogramaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
