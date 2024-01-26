import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IZona } from '../zona.model';
import { ZonaService } from '../service/zona.service';

@Component({
  standalone: true,
  templateUrl: './zona-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ZonaDeleteDialogComponent {
  zona?: IZona;

  constructor(
    protected zonaService: ZonaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.zonaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
