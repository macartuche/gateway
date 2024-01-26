import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TurnoDetailComponent } from './turno-detail.component';

describe('Turno Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TurnoDetailComponent,
              resolve: { turno: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TurnoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load turno on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TurnoDetailComponent);

      // THEN
      expect(instance.turno).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
