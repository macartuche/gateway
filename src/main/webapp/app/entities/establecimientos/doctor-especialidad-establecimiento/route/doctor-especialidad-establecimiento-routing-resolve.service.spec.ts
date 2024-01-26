import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';
import { DoctorEspecialidadEstablecimientoService } from '../service/doctor-especialidad-establecimiento.service';

import doctorEspecialidadEstablecimientoResolve from './doctor-especialidad-establecimiento-routing-resolve.service';

describe('DoctorEspecialidadEstablecimiento routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DoctorEspecialidadEstablecimientoService;
  let resultDoctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento | null | undefined;

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
    service = TestBed.inject(DoctorEspecialidadEstablecimientoService);
    resultDoctorEspecialidadEstablecimiento = undefined;
  });

  describe('resolve', () => {
    it('should return IDoctorEspecialidadEstablecimiento returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        doctorEspecialidadEstablecimientoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDoctorEspecialidadEstablecimiento = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDoctorEspecialidadEstablecimiento).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        doctorEspecialidadEstablecimientoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDoctorEspecialidadEstablecimiento = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDoctorEspecialidadEstablecimiento).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDoctorEspecialidadEstablecimiento>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        doctorEspecialidadEstablecimientoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDoctorEspecialidadEstablecimiento = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDoctorEspecialidadEstablecimiento).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
