import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DocumentoTramiteDetailComponent } from './documento-tramite-detail.component';

describe('DocumentoTramite Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoTramiteDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DocumentoTramiteDetailComponent,
              resolve: { documentoTramite: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DocumentoTramiteDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load documentoTramite on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DocumentoTramiteDetailComponent);

      // THEN
      expect(instance.documentoTramite).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
