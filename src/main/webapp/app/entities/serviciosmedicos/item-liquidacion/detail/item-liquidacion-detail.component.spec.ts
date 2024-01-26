import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItemLiquidacionDetailComponent } from './item-liquidacion-detail.component';

describe('ItemLiquidacion Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemLiquidacionDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ItemLiquidacionDetailComponent,
              resolve: { itemLiquidacion: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ItemLiquidacionDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load itemLiquidacion on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ItemLiquidacionDetailComponent);

      // THEN
      expect(instance.itemLiquidacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
