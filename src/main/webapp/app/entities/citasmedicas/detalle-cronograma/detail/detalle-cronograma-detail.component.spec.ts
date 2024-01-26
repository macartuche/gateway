import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DetalleCronogramaDetailComponent } from './detalle-cronograma-detail.component';

describe('DetalleCronograma Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCronogramaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DetalleCronogramaDetailComponent,
              resolve: { detalleCronograma: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DetalleCronogramaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load detalleCronograma on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DetalleCronogramaDetailComponent);

      // THEN
      expect(instance.detalleCronograma).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
