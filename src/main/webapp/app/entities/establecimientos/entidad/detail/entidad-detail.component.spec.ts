import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EntidadDetailComponent } from './entidad-detail.component';

describe('Entidad Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: EntidadDetailComponent,
              resolve: { entidad: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(EntidadDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load entidad on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', EntidadDetailComponent);

      // THEN
      expect(instance.entidad).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
