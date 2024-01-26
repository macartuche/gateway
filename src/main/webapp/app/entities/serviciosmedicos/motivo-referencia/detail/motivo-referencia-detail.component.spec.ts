import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MotivoReferenciaDetailComponent } from './motivo-referencia-detail.component';

describe('MotivoReferencia Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivoReferenciaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: MotivoReferenciaDetailComponent,
              resolve: { motivoReferencia: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MotivoReferenciaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load motivoReferencia on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MotivoReferenciaDetailComponent);

      // THEN
      expect(instance.motivoReferencia).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
