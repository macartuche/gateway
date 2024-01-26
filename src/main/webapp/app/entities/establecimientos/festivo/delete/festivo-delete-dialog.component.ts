import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFestivo } from '../festivo.model';
import { FestivoService } from '../service/festivo.service';

@Component({
  standalone: true,
  templateUrl: './festivo-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FestivoDeleteDialogComponent {
  festivo?: IFestivo;

  constructor(
    protected festivoService: FestivoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.festivoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
