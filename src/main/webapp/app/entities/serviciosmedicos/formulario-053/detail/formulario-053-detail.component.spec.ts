import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Formulario053DetailComponent } from './formulario-053-detail.component';

describe('Formulario053 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario053DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Formulario053DetailComponent,
              resolve: { formulario053: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Formulario053DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load formulario053 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Formulario053DetailComponent);

      // THEN
      expect(instance.formulario053).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
