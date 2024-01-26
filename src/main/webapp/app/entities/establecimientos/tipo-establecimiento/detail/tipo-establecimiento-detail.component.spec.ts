import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoEstablecimientoDetailComponent } from './tipo-establecimiento-detail.component';

describe('TipoEstablecimiento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEstablecimientoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TipoEstablecimientoDetailComponent,
              resolve: { tipoEstablecimiento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoEstablecimientoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tipoEstablecimiento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoEstablecimientoDetailComponent);

      // THEN
      expect(instance.tipoEstablecimiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
