import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IItemLiquidacion } from '../item-liquidacion.model';
import { ItemLiquidacionService } from '../service/item-liquidacion.service';

@Component({
  standalone: true,
  templateUrl: './item-liquidacion-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ItemLiquidacionDeleteDialogComponent {
  itemLiquidacion?: IItemLiquidacion;

  constructor(
    protected itemLiquidacionService: ItemLiquidacionService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itemLiquidacionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
