import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContinuidadAsistencialDetailComponent } from './continuidad-asistencial-detail.component';

describe('ContinuidadAsistencial Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuidadAsistencialDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ContinuidadAsistencialDetailComponent,
              resolve: { continuidadAsistencial: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ContinuidadAsistencialDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load continuidadAsistencial on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ContinuidadAsistencialDetailComponent);

      // THEN
      expect(instance.continuidadAsistencial).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
