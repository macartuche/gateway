import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProcedimientoDetailComponent } from './procedimiento-detail.component';

describe('Procedimiento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcedimientoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ProcedimientoDetailComponent,
              resolve: { procedimiento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ProcedimientoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load procedimiento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProcedimientoDetailComponent);

      // THEN
      expect(instance.procedimiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
