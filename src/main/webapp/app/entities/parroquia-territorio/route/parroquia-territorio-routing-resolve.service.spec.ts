import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IParroquiaTerritorio } from '../parroquia-territorio.model';
import { ParroquiaTerritorioService } from '../service/parroquia-territorio.service';

import parroquiaTerritorioResolve from './parroquia-territorio-routing-resolve.service';

describe('ParroquiaTerritorio routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: ParroquiaTerritorioService;
  let resultParroquiaTerritorio: IParroquiaTerritorio | null | undefined;

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
    service = TestBed.inject(ParroquiaTerritorioService);
    resultParroquiaTerritorio = undefined;
  });

  describe('resolve', () => {
    it('should return IParroquiaTerritorio returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        parroquiaTerritorioResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultParroquiaTerritorio = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultParroquiaTerritorio).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        parroquiaTerritorioResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultParroquiaTerritorio = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultParroquiaTerritorio).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IParroquiaTerritorio>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        parroquiaTerritorioResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultParroquiaTerritorio = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultParroquiaTerritorio).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
