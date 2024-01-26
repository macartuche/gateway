import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';
import { ContactoEmergenciaPacienteService } from '../service/contacto-emergencia-paciente.service';

import contactoEmergenciaPacienteResolve from './contacto-emergencia-paciente-routing-resolve.service';

describe('ContactoEmergenciaPaciente routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: ContactoEmergenciaPacienteService;
  let resultContactoEmergenciaPaciente: IContactoEmergenciaPaciente | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(ContactoEmergenciaPacienteService);
    resultContactoEmergenciaPaciente = undefined;
  });

  describe('resolve', () => {
    it('should return IContactoEmergenciaPaciente returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        contactoEmergenciaPacienteResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultContactoEmergenciaPaciente = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultContactoEmergenciaPaciente).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        contactoEmergenciaPacienteResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultContactoEmergenciaPaciente = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultContactoEmergenciaPaciente).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IContactoEmergenciaPaciente>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        contactoEmergenciaPacienteResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultContactoEmergenciaPaciente = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultContactoEmergenciaPaciente).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
