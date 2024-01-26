import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoTramiteDetailComponent } from './tipo-tramite-detail.component';

describe('TipoTramite Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoTramiteDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TipoTramiteDetailComponent,
              resolve: { tipoTramite: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoTramiteDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tipoTramite on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoTramiteDetailComponent);

      // THEN
      expect(instance.tipoTramite).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
