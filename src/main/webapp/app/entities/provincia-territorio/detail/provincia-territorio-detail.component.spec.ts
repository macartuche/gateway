import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProvinciaTerritorioDetailComponent } from './provincia-territorio-detail.component';

describe('ProvinciaTerritorio Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinciaTerritorioDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ProvinciaTerritorioDetailComponent,
              resolve: { provinciaTerritorio: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ProvinciaTerritorioDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load provinciaTerritorio on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ProvinciaTerritorioDetailComponent);

      // THEN
      expect(instance.provinciaTerritorio).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
