import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EstablecimientoDetailComponent } from './establecimiento-detail.component';

describe('Establecimiento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecimientoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: EstablecimientoDetailComponent,
              resolve: { establecimiento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(EstablecimientoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load establecimiento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', EstablecimientoDetailComponent);

      // THEN
      expect(instance.establecimiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
