import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EspecialidadDetailComponent } from './especialidad-detail.component';

describe('Especialidad Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: EspecialidadDetailComponent,
              resolve: { especialidad: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(EspecialidadDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load especialidad on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', EspecialidadDetailComponent);

      // THEN
      expect(instance.especialidad).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
