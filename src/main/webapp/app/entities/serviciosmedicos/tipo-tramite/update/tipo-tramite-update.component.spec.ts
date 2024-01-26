import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoTramiteService } from '../service/tipo-tramite.service';
import { ITipoTramite } from '../tipo-tramite.model';
import { TipoTramiteFormService } from './tipo-tramite-form.service';

import { TipoTramiteUpdateComponent } from './tipo-tramite-update.component';

describe('TipoTramite Management Update Component', () => {
  let comp: TipoTramiteUpdateComponent;
  let fixture: ComponentFixture<TipoTramiteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoTramiteFormService: TipoTramiteFormService;
  let tipoTramiteService: TipoTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoTramiteUpdateComponent],
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
      .overrideTemplate(TipoTramiteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoTramiteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoTramiteFormService = TestBed.inject(TipoTramiteFormService);
    tipoTramiteService = TestBed.inject(TipoTramiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tipoTramite: ITipoTramite = { id: 456 };

      activatedRoute.data = of({ tipoTramite });
      comp.ngOnInit();

      expect(comp.tipoTramite).toEqual(tipoTramite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoTramite>>();
      const tipoTramite = { id: 123 };
      jest.spyOn(tipoTramiteFormService, 'getTipoTramite').mockReturnValue(tipoTramite);
      jest.spyOn(tipoTramiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoTramite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoTramite }));
      saveSubject.complete();

      // THEN
      expect(tipoTramiteFormService.getTipoTramite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoTramiteService.update).toHaveBeenCalledWith(expect.objectContaining(tipoTramite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoTramite>>();
      const tipoTramite = { id: 123 };
      jest.spyOn(tipoTramiteFormService, 'getTipoTramite').mockReturnValue({ id: null });
      jest.spyOn(tipoTramiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoTramite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoTramite }));
      saveSubject.complete();

      // THEN
      expect(tipoTramiteFormService.getTipoTramite).toHaveBeenCalled();
      expect(tipoTramiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoTramite>>();
      const tipoTramite = { id: 123 };
      jest.spyOn(tipoTramiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoTramite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoTramiteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
