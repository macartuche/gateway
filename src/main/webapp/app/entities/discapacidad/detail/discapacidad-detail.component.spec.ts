import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DiscapacidadDetailComponent } from './discapacidad-detail.component';

describe('Discapacidad Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscapacidadDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DiscapacidadDetailComponent,
              resolve: { discapacidad: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DiscapacidadDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load discapacidad on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DiscapacidadDetailComponent);

      // THEN
      expect(instance.discapacidad).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
