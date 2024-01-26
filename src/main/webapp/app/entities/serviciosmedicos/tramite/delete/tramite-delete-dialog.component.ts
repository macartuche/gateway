import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITramite } from '../tramite.model';
import { TramiteService } from '../service/tramite.service';

@Component({
  standalone: true,
  templateUrl: './tramite-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TramiteDeleteDialogComponent {
  tramite?: ITramite;

  constructor(
    protected tramiteService: TramiteService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tramiteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
