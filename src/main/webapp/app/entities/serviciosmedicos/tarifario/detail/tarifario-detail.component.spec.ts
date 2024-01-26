import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TarifarioDetailComponent } from './tarifario-detail.component';

describe('Tarifario Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifarioDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TarifarioDetailComponent,
              resolve: { tarifario: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TarifarioDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tarifario on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TarifarioDetailComponent);

      // THEN
      expect(instance.tarifario).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
