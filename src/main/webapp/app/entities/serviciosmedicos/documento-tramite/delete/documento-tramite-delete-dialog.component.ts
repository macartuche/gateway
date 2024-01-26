import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDocumentoTramite } from '../documento-tramite.model';
import { DocumentoTramiteService } from '../service/documento-tramite.service';

@Component({
  standalone: true,
  templateUrl: './documento-tramite-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DocumentoTramiteDeleteDialogComponent {
  documentoTramite?: IDocumentoTramite;

  constructor(
    protected documentoTramiteService: DocumentoTramiteService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentoTramiteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
