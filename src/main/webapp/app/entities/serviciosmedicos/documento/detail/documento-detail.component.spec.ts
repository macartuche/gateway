import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DocumentoDetailComponent } from './documento-detail.component';

describe('Documento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DocumentoDetailComponent,
              resolve: { documento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DocumentoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load documento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DocumentoDetailComponent);

      // THEN
      expect(instance.documento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
