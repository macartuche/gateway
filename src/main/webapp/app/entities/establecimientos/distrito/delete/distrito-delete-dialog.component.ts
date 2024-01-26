import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDistrito } from '../distrito.model';
import { DistritoService } from '../service/distrito.service';

@Component({
  standalone: true,
  templateUrl: './distrito-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DistritoDeleteDialogComponent {
  distrito?: IDistrito;

  constructor(
    protected distritoService: DistritoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.distritoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
