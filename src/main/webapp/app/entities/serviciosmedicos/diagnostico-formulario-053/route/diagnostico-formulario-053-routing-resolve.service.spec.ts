import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';
import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';

import diagnosticoFormulario053Resolve from './diagnostico-formulario-053-routing-resolve.service';

describe('DiagnosticoFormulario053 routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DiagnosticoFormulario053Service;
  let resultDiagnosticoFormulario053: IDiagnosticoFormulario053 | null | undefined;

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
    service = TestBed.inject(DiagnosticoFormulario053Service);
    resultDiagnosticoFormulario053 = undefined;
  });

  describe('resolve', () => {
    it('should return IDiagnosticoFormulario053 returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        diagnosticoFormulario053Resolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDiagnosticoFormulario053 = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDiagnosticoFormulario053).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        diagnosticoFormulario053Resolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDiagnosticoFormulario053 = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDiagnosticoFormulario053).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDiagnosticoFormulario053>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        diagnosticoFormulario053Resolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDiagnosticoFormulario053 = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDiagnosticoFormulario053).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
