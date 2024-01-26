import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CronogramaDetailComponent } from './cronograma-detail.component';

describe('Cronograma Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronogramaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CronogramaDetailComponent,
              resolve: { cronograma: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CronogramaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load cronograma on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CronogramaDetailComponent);

      // THEN
      expect(instance.cronograma).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
