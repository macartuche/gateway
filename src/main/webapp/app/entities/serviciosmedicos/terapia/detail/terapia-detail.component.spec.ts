import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TerapiaDetailComponent } from './terapia-detail.component';

describe('Terapia Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerapiaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TerapiaDetailComponent,
              resolve: { terapia: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TerapiaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load terapia on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TerapiaDetailComponent);

      // THEN
      expect(instance.terapia).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
