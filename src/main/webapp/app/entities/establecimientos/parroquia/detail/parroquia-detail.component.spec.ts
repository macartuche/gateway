import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ParroquiaDetailComponent } from './parroquia-detail.component';

describe('Parroquia Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ParroquiaDetailComponent,
              resolve: { parroquia: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ParroquiaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load parroquia on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ParroquiaDetailComponent);

      // THEN
      expect(instance.parroquia).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
