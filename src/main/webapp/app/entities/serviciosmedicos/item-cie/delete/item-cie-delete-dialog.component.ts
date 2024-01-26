import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IItemCie } from '../item-cie.model';
import { ItemCieService } from '../service/item-cie.service';

@Component({
  standalone: true,
  templateUrl: './item-cie-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ItemCieDeleteDialogComponent {
  itemCie?: IItemCie;

  constructor(
    protected itemCieService: ItemCieService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itemCieService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
