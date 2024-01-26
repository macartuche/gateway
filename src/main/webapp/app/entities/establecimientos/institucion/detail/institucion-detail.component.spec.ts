import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { InstitucionDetailComponent } from './institucion-detail.component';

describe('Institucion Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: InstitucionDetailComponent,
              resolve: { institucion: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(InstitucionDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load institucion on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', InstitucionDetailComponent);

      // THEN
      expect(instance.institucion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
