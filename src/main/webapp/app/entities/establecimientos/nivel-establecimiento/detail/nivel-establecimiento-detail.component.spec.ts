import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NivelEstablecimientoDetailComponent } from './nivel-establecimiento-detail.component';

describe('NivelEstablecimiento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NivelEstablecimientoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: NivelEstablecimientoDetailComponent,
              resolve: { nivelEstablecimiento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(NivelEstablecimientoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load nivelEstablecimiento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', NivelEstablecimientoDetailComponent);

      // THEN
      expect(instance.nivelEstablecimiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
