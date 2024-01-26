import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Formulario053ContrareferenciaDetailComponent } from './formulario-053-contrareferencia-detail.component';

describe('Formulario053Contrareferencia Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario053ContrareferenciaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Formulario053ContrareferenciaDetailComponent,
              resolve: { formulario053Contrareferencia: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Formulario053ContrareferenciaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load formulario053Contrareferencia on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Formulario053ContrareferenciaDetailComponent);

      // THEN
      expect(instance.formulario053Contrareferencia).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
