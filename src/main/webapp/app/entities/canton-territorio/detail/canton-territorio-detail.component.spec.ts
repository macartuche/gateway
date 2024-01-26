import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CantonTerritorioDetailComponent } from './canton-territorio-detail.component';

describe('CantonTerritorio Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantonTerritorioDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CantonTerritorioDetailComponent,
              resolve: { cantonTerritorio: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CantonTerritorioDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load cantonTerritorio on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CantonTerritorioDetailComponent);

      // THEN
      expect(instance.cantonTerritorio).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
