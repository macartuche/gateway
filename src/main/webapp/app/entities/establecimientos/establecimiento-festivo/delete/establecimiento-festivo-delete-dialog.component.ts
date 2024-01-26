import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEstablecimientoFestivo } from '../establecimiento-festivo.model';
import { EstablecimientoFestivoService } from '../service/establecimiento-festivo.service';

@Component({
  standalone: true,
  templateUrl: './establecimiento-festivo-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class EstablecimientoFestivoDeleteDialogComponent {
  establecimientoFestivo?: IEstablecimientoFestivo;

  constructor(
    protected establecimientoFestivoService: EstablecimientoFestivoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.establecimientoFestivoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
