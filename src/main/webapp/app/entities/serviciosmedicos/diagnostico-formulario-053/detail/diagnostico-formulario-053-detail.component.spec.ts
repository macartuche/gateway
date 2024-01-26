import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DiagnosticoFormulario053DetailComponent } from './diagnostico-formulario-053-detail.component';

describe('DiagnosticoFormulario053 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticoFormulario053DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DiagnosticoFormulario053DetailComponent,
              resolve: { diagnosticoFormulario053: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DiagnosticoFormulario053DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load diagnosticoFormulario053 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DiagnosticoFormulario053DetailComponent);

      // THEN
      expect(instance.diagnosticoFormulario053).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
