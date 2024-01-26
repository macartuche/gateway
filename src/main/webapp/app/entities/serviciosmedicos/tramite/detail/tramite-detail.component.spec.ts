import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TramiteDetailComponent } from './tramite-detail.component';

describe('Tramite Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramiteDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TramiteDetailComponent,
              resolve: { tramite: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TramiteDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tramite on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TramiteDetailComponent);

      // THEN
      expect(instance.tramite).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
