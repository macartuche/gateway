import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FestivoService } from '../service/festivo.service';
import { IFestivo } from '../festivo.model';
import { FestivoFormService } from './festivo-form.service';

import { FestivoUpdateComponent } from './festivo-update.component';

describe('Festivo Management Update Component', () => {
  let comp: FestivoUpdateComponent;
  let fixture: ComponentFixture<FestivoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let festivoFormService: FestivoFormService;
  let festivoService: FestivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), FestivoUpdateComponent],
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
      .overrideTemplate(FestivoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FestivoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    festivoFormService = TestBed.inject(FestivoFormService);
    festivoService = TestBed.inject(FestivoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const festivo: IFestivo = { id: 456 };

      activatedRoute.data = of({ festivo });
      comp.ngOnInit();

      expect(comp.festivo).toEqual(festivo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFestivo>>();
      const festivo = { id: 123 };
      jest.spyOn(festivoFormService, 'getFestivo').mockReturnValue(festivo);
      jest.spyOn(festivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: festivo }));
      saveSubject.complete();

      // THEN
      expect(festivoFormService.getFestivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(festivoService.update).toHaveBeenCalledWith(expect.objectContaining(festivo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFestivo>>();
      const festivo = { id: 123 };
      jest.spyOn(festivoFormService, 'getFestivo').mockReturnValue({ id: null });
      jest.spyOn(festivoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: festivo }));
      saveSubject.complete();

      // THEN
      expect(festivoFormService.getFestivo).toHaveBeenCalled();
      expect(festivoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFestivo>>();
      const festivo = { id: 123 };
      jest.spyOn(festivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ festivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(festivoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
