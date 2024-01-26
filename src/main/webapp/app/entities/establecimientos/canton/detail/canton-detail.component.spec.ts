import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CantonDetailComponent } from './canton-detail.component';

describe('Canton Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantonDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CantonDetailComponent,
              resolve: { canton: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CantonDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load canton on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CantonDetailComponent);

      // THEN
      expect(instance.canton).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
