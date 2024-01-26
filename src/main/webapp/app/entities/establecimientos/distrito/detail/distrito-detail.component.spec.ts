import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DistritoDetailComponent } from './distrito-detail.component';

describe('Distrito Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DistritoDetailComponent,
              resolve: { distrito: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DistritoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load distrito on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DistritoDetailComponent);

      // THEN
      expect(instance.distrito).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
