import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CircuitoDetailComponent } from './circuito-detail.component';

describe('Circuito Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CircuitoDetailComponent,
              resolve: { circuito: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CircuitoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load circuito on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CircuitoDetailComponent);

      // THEN
      expect(instance.circuito).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
