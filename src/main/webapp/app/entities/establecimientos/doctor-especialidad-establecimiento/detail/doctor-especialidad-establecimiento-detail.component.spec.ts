import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DoctorEspecialidadEstablecimientoDetailComponent } from './doctor-especialidad-establecimiento-detail.component';

describe('DoctorEspecialidadEstablecimiento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorEspecialidadEstablecimientoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DoctorEspecialidadEstablecimientoDetailComponent,
              resolve: { doctorEspecialidadEstablecimiento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DoctorEspecialidadEstablecimientoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load doctorEspecialidadEstablecimiento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DoctorEspecialidadEstablecimientoDetailComponent);

      // THEN
      expect(instance.doctorEspecialidadEstablecimiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
