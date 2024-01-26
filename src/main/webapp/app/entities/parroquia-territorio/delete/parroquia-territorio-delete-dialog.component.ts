import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IParroquiaTerritorio } from '../parroquia-territorio.model';
import { ParroquiaTerritorioService } from '../service/parroquia-territorio.service';

@Component({
  standalone: true,
  templateUrl: './parroquia-territorio-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ParroquiaTerritorioDeleteDialogComponent {
  parroquiaTerritorio?: IParroquiaTerritorio;

  constructor(
    protected parroquiaTerritorioService: ParroquiaTerritorioService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parroquiaTerritorioService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
