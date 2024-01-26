import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ParroquiaTerritorioDetailComponent } from './parroquia-territorio-detail.component';

describe('ParroquiaTerritorio Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiaTerritorioDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ParroquiaTerritorioDetailComponent,
              resolve: { parroquiaTerritorio: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ParroquiaTerritorioDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load parroquiaTerritorio on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ParroquiaTerritorioDetailComponent);

      // THEN
      expect(instance.parroquiaTerritorio).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
