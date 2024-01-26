import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FestivoDetailComponent } from './festivo-detail.component';

describe('Festivo Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FestivoDetailComponent,
              resolve: { festivo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FestivoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load festivo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FestivoDetailComponent);

      // THEN
      expect(instance.festivo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
