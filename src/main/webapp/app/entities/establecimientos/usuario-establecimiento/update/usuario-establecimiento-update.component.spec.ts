import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { EstablecimientoService } from 'app/entities/establecimientos/establecimiento/service/establecimiento.service';
import { UsuarioEstablecimientoService } from '../service/usuario-establecimiento.service';
import { IUsuarioEstablecimiento } from '../usuario-establecimiento.model';
import { UsuarioEstablecimientoFormService } from './usuario-establecimiento-form.service';

import { UsuarioEstablecimientoUpdateComponent } from './usuario-establecimiento-update.component';

describe('UsuarioEstablecimiento Management Update Component', () => {
  let comp: UsuarioEstablecimientoUpdateComponent;
  let fixture: ComponentFixture<UsuarioEstablecimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuarioEstablecimientoFormService: UsuarioEstablecimientoFormService;
  let usuarioEstablecimientoService: UsuarioEstablecimientoService;
  let establecimientoService: EstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), UsuarioEstablecimientoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UsuarioEstablecimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioEstablecimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuarioEstablecimientoFormService = TestBed.inject(UsuarioEstablecimientoFormService);
    usuarioEstablecimientoService = TestBed.inject(UsuarioEstablecimientoService);
    establecimientoService = TestBed.inject(EstablecimientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Establecimiento query and add missing value', () => {
      const usuarioEstablecimiento: IUsuarioEstablecimiento = { id: 456 };
      const establecimiento: IEstablecimiento = { id: 15639 };
      usuarioEstablecimiento.establecimiento = establecimiento;

      const establecimientoCollection: IEstablecimiento[] = [{ id: 17147 }];
      jest.spyOn(establecimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: establecimientoCollection })));
      const additionalEstablecimientos = [establecimiento];
      const expectedCollection: IEstablecimiento[] = [...additionalEstablecimientos, ...establecimientoCollection];
      jest.spyOn(establecimientoService, 'addEstablecimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioEstablecimiento });
      comp.ngOnInit();

      expect(establecimientoService.query).toHaveBeenCalled();
      expect(establecimientoService.addEstablecimientoToCollectionIfMissing).toHaveBeenCalledWith(
        establecimientoCollection,
        ...additionalEstablecimientos.map(expect.objectContaining),
      );
      expect(comp.establecimientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuarioEstablecimiento: IUsuarioEstablecimiento = { id: 456 };
      const establecimiento: IEstablecimiento = { id: 14707 };
      usuarioEstablecimiento.establecimiento = establecimiento;

      activatedRoute.data = of({ usuarioEstablecimiento });
      comp.ngOnInit();

      expect(comp.establecimientosSharedCollection).toContain(establecimiento);
      expect(comp.usuarioEstablecimiento).toEqual(usuarioEstablecimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioEstablecimiento>>();
      const usuarioEstablecimiento = { id: 123 };
      jest.spyOn(usuarioEstablecimientoFormService, 'getUsuarioEstablecimiento').mockReturnValue(usuarioEstablecimiento);
      jest.spyOn(usuarioEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(usuarioEstablecimientoFormService.getUsuarioEstablecimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuarioEstablecimientoService.update).toHaveBeenCalledWith(expect.objectContaining(usuarioEstablecimiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioEstablecimiento>>();
      const usuarioEstablecimiento = { id: 123 };
      jest.spyOn(usuarioEstablecimientoFormService, 'getUsuarioEstablecimiento').mockReturnValue({ id: null });
      jest.spyOn(usuarioEstablecimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioEstablecimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(usuarioEstablecimientoFormService.getUsuarioEstablecimiento).toHaveBeenCalled();
      expect(usuarioEstablecimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioEstablecimiento>>();
      const usuarioEstablecimiento = { id: 123 };
      jest.spyOn(usuarioEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuarioEstablecimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEstablecimiento', () => {
      it('Should forward to establecimientoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(establecimientoService, 'compareEstablecimiento');
        comp.compareEstablecimiento(entity, entity2);
        expect(establecimientoService.compareEstablecimiento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
