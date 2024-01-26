import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITerapia } from '../terapia.model';
import { TerapiaService } from '../service/terapia.service';

@Component({
  standalone: true,
  templateUrl: './terapia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TerapiaDeleteDialogComponent {
  terapia?: ITerapia;

  constructor(
    protected terapiaService: TerapiaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.terapiaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
