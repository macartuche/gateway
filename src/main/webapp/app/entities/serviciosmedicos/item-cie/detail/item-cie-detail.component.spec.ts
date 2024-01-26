import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItemCieDetailComponent } from './item-cie-detail.component';

describe('ItemCie Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCieDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ItemCieDetailComponent,
              resolve: { itemCie: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ItemCieDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load itemCie on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ItemCieDetailComponent);

      // THEN
      expect(instance.itemCie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
