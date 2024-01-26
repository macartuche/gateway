import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContactoEmergenciaPacienteDetailComponent } from './contacto-emergencia-paciente-detail.component';

describe('ContactoEmergenciaPaciente Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoEmergenciaPacienteDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ContactoEmergenciaPacienteDetailComponent,
              resolve: { contactoEmergenciaPaciente: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ContactoEmergenciaPacienteDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load contactoEmergenciaPaciente on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ContactoEmergenciaPacienteDetailComponent);

      // THEN
      expect(instance.contactoEmergenciaPaciente).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
