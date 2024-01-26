import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMotivoReferencia } from '../motivo-referencia.model';
import { MotivoReferenciaService } from '../service/motivo-referencia.service';

@Component({
  standalone: true,
  templateUrl: './motivo-referencia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MotivoReferenciaDeleteDialogComponent {
  motivoReferencia?: IMotivoReferencia;

  constructor(
    protected motivoReferenciaService: MotivoReferenciaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.motivoReferenciaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
