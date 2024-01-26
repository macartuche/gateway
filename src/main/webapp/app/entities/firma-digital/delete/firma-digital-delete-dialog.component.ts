import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFirmaDigital } from '../firma-digital.model';
import { FirmaDigitalService } from '../service/firma-digital.service';

@Component({
  standalone: true,
  templateUrl: './firma-digital-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FirmaDigitalDeleteDialogComponent {
  firmaDigital?: IFirmaDigital;

  constructor(
    protected firmaDigitalService: FirmaDigitalService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.firmaDigitalService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
