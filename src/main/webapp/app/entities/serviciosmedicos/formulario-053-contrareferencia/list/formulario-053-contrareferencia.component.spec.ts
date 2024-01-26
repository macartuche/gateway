import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Formulario053ContrareferenciaService } from '../service/formulario-053-contrareferencia.service';

import { Formulario053ContrareferenciaComponent } from './formulario-053-contrareferencia.component';
import SpyInstance = jest.SpyInstance;

describe('Formulario053Contrareferencia Management Component', () => {
  let comp: Formulario053ContrareferenciaComponent;
  let fixture: ComponentFixture<Formulario053ContrareferenciaComponent>;
  let service: Formulario053ContrareferenciaService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'formulario-053-contrareferencia', component: Formulario053ContrareferenciaComponent }]),
        HttpClientTestingModule,
        Formulario053ContrareferenciaComponent,
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
      .overrideTemplate(Formulario053ContrareferenciaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Formulario053ContrareferenciaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(Formulario053ContrareferenciaService);
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
    expect(comp.formulario053Contrareferencias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to formulario053ContrareferenciaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFormulario053ContrareferenciaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFormulario053ContrareferenciaIdentifier).toHaveBeenCalledWith(entity);
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
