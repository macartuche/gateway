import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICantonTerritorio } from '../canton-territorio.model';
import { CantonTerritorioService } from '../service/canton-territorio.service';

@Component({
  standalone: true,
  templateUrl: './canton-territorio-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CantonTerritorioDeleteDialogComponent {
  cantonTerritorio?: ICantonTerritorio;

  constructor(
    protected cantonTerritorioService: CantonTerritorioService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cantonTerritorioService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
