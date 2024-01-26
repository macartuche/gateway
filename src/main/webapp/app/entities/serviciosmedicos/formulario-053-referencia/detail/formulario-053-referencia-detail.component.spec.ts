import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Formulario053ReferenciaDetailComponent } from './formulario-053-referencia-detail.component';

describe('Formulario053Referencia Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario053ReferenciaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Formulario053ReferenciaDetailComponent,
              resolve: { formulario053Referencia: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Formulario053ReferenciaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load formulario053Referencia on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Formulario053ReferenciaDetailComponent);

      // THEN
      expect(instance.formulario053Referencia).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
