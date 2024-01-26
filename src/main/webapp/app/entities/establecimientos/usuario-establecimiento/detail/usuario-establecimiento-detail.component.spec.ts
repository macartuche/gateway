import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UsuarioEstablecimientoDetailComponent } from './usuario-establecimiento-detail.component';

describe('UsuarioEstablecimiento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEstablecimientoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: UsuarioEstablecimientoDetailComponent,
              resolve: { usuarioEstablecimiento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(UsuarioEstablecimientoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load usuarioEstablecimiento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', UsuarioEstablecimientoDetailComponent);

      // THEN
      expect(instance.usuarioEstablecimiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
