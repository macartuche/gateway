import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoTramite } from '../tipo-tramite.model';
import { TipoTramiteService } from '../service/tipo-tramite.service';

@Component({
  standalone: true,
  templateUrl: './tipo-tramite-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoTramiteDeleteDialogComponent {
  tipoTramite?: ITipoTramite;

  constructor(
    protected tipoTramiteService: TipoTramiteService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoTramiteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
