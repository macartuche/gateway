import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CieService } from '../service/cie.service';
import { ICie } from '../cie.model';
import { CieFormService } from './cie-form.service';

import { CieUpdateComponent } from './cie-update.component';

describe('Cie Management Update Component', () => {
  let comp: CieUpdateComponent;
  let fixture: ComponentFixture<CieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cieFormService: CieFormService;
  let cieService: CieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CieUpdateComponent],
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
      .overrideTemplate(CieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cieFormService = TestBed.inject(CieFormService);
    cieService = TestBed.inject(CieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cie: ICie = { id: 456 };

      activatedRoute.data = of({ cie });
      comp.ngOnInit();

      expect(comp.cie).toEqual(cie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICie>>();
      const cie = { id: 123 };
      jest.spyOn(cieFormService, 'getCie').mockReturnValue(cie);
      jest.spyOn(cieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cie }));
      saveSubject.complete();

      // THEN
      expect(cieFormService.getCie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cieService.update).toHaveBeenCalledWith(expect.objectContaining(cie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICie>>();
      const cie = { id: 123 };
      jest.spyOn(cieFormService, 'getCie').mockReturnValue({ id: null });
      jest.spyOn(cieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cie }));
      saveSubject.complete();

      // THEN
      expect(cieFormService.getCie).toHaveBeenCalled();
      expect(cieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICie>>();
      const cie = { id: 123 };
      jest.spyOn(cieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cieService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
