import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProvincia } from '../provincia.model';
import { ProvinciaService } from '../service/provincia.service';

@Component({
  standalone: true,
  templateUrl: './provincia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProvinciaDeleteDialogComponent {
  provincia?: IProvincia;

  constructor(
    protected provinciaService: ProvinciaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provinciaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
