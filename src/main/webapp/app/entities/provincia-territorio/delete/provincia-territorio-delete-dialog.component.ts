import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProvinciaTerritorio } from '../provincia-territorio.model';
import { ProvinciaTerritorioService } from '../service/provincia-territorio.service';

@Component({
  standalone: true,
  templateUrl: './provincia-territorio-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProvinciaTerritorioDeleteDialogComponent {
  provinciaTerritorio?: IProvinciaTerritorio;

  constructor(
    protected provinciaTerritorioService: ProvinciaTerritorioService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provinciaTerritorioService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
