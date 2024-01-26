import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IItemLiquidacion } from '../item-liquidacion.model';

@Component({
  standalone: true,
  selector: 'jhi-item-liquidacion-detail',
  templateUrl: './item-liquidacion-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ItemLiquidacionDetailComponent {
  @Input() itemLiquidacion: IItemLiquidacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
