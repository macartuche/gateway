import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BloqueoTurnoDetailComponent } from './bloqueo-turno-detail.component';

describe('BloqueoTurno Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueoTurnoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BloqueoTurnoDetailComponent,
              resolve: { bloqueoTurno: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BloqueoTurnoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load bloqueoTurno on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BloqueoTurnoDetailComponent);

      // THEN
      expect(instance.bloqueoTurno).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
