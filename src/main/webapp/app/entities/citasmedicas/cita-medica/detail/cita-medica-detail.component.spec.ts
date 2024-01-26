import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CitaMedicaDetailComponent } from './cita-medica-detail.component';

describe('CitaMedica Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaMedicaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CitaMedicaDetailComponent,
              resolve: { citaMedica: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CitaMedicaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load citaMedica on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CitaMedicaDetailComponent);

      // THEN
      expect(instance.citaMedica).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
