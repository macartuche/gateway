import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DoctorEspecialidadEstablecimientoService } from '../service/doctor-especialidad-establecimiento.service';

import { DoctorEspecialidadEstablecimientoComponent } from './doctor-especialidad-establecimiento.component';
import SpyInstance = jest.SpyInstance;

describe('DoctorEspecialidadEstablecimiento Management Component', () => {
  let comp: DoctorEspecialidadEstablecimientoComponent;
  let fixture: ComponentFixture<DoctorEspecialidadEstablecimientoComponent>;
  let service: DoctorEspecialidadEstablecimientoService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'doctor-especialidad-establecimiento', component: DoctorEspecialidadEstablecimientoComponent },
        ]),
        HttpClientTestingModule,
        DoctorEspecialidadEstablecimientoComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(DoctorEspecialidadEstablecimientoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DoctorEspecialidadEstablecimientoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DoctorEspecialidadEstablecimientoService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.doctorEspecialidadEstablecimientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to doctorEspecialidadEstablecimientoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDoctorEspecialidadEstablecimientoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDoctorEspecialidadEstablecimientoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });

  it('should load a page', () => {
    // WHEN
    comp.navigateToPage(1);

    // THEN
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.navigateToWithComponentValues();

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['name,asc'],
        }),
      }),
    );
  });
});
