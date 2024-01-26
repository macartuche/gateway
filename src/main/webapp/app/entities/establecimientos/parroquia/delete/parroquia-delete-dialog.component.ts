import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IParroquia } from '../parroquia.model';
import { ParroquiaService } from '../service/parroquia.service';

@Component({
  standalone: true,
  templateUrl: './parroquia-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ParroquiaDeleteDialogComponent {
  parroquia?: IParroquia;

  constructor(
    protected parroquiaService: ParroquiaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parroquiaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
