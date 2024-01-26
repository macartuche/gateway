import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FirmaDigitalDetailComponent } from './firma-digital-detail.component';

describe('FirmaDigital Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmaDigitalDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FirmaDigitalDetailComponent,
              resolve: { firmaDigital: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FirmaDigitalDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load firmaDigital on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FirmaDigitalDetailComponent);

      // THEN
      expect(instance.firmaDigital).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
