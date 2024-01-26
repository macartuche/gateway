import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';

import { DiagnosticoFormulario053Component } from './diagnostico-formulario-053.component';
import SpyInstance = jest.SpyInstance;

describe('DiagnosticoFormulario053 Management Component', () => {
  let comp: DiagnosticoFormulario053Component;
  let fixture: ComponentFixture<DiagnosticoFormulario053Component>;
  let service: DiagnosticoFormulario053Service;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'diagnostico-formulario-053', component: DiagnosticoFormulario053Component }]),
        HttpClientTestingModule,
        DiagnosticoFormulario053Component,
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
      .overrideTemplate(DiagnosticoFormulario053Component, '')
      .compileComponents();

    fixture = TestBed.createComponent(DiagnosticoFormulario053Component);
    comp = fixture.componentInstance;
    service = TestBed.inject(DiagnosticoFormulario053Service);
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
    expect(comp.diagnosticoFormulario053s?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to diagnosticoFormulario053Service', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDiagnosticoFormulario053Identifier');
      const id = comp.trackId(0, entity);
      expect(service.getDiagnosticoFormulario053Identifier).toHaveBeenCalledWith(entity);
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
