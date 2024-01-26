import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EstablecimientoFestivoDetailComponent } from './establecimiento-festivo-detail.component';

describe('EstablecimientoFestivo Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecimientoFestivoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: EstablecimientoFestivoDetailComponent,
              resolve: { establecimientoFestivo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(EstablecimientoFestivoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load establecimientoFestivo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', EstablecimientoFestivoDetailComponent);

      // THEN
      expect(instance.establecimientoFestivo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
