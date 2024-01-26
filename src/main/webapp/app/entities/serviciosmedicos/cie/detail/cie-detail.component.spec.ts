import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CieDetailComponent } from './cie-detail.component';

describe('Cie Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CieDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CieDetailComponent,
              resolve: { cie: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CieDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load cie on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CieDetailComponent);

      // THEN
      expect(instance.cie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
