import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ZonaDetailComponent } from './zona-detail.component';

describe('Zona Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ZonaDetailComponent,
              resolve: { zona: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ZonaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load zona on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ZonaDetailComponent);

      // THEN
      expect(instance.zona).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
