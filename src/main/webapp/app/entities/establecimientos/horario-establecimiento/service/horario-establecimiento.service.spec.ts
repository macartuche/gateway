import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHorarioEstablecimiento } from '../horario-establecimiento.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../horario-establecimiento.test-samples';

import { HorarioEstablecimientoService, RestHorarioEstablecimiento } from './horario-establecimiento.service';

const requireRestSample: RestHorarioEstablecimiento = {
  ...sampleWithRequiredData,
  horaInicio: sampleWithRequiredData.horaInicio?.toJSON(),
  horaFin: sampleWithRequiredData.horaFin?.toJSON(),
};

describe('HorarioEstablecimiento Service', () => {
  let service: HorarioEstablecimientoService;
  let httpMock: HttpTestingController;
  let expectedResult: IHorarioEstablecimiento | IHorarioEstablecimiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HorarioEstablecimientoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a HorarioEstablecimiento', () => {
      const horarioEstablecimiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(horarioEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HorarioEstablecimiento', () => {
      const horarioEstablecimiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(horarioEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HorarioEstablecimiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HorarioEstablecimiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HorarioEstablecimiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHorarioEstablecimientoToCollectionIfMissing', () => {
      it('should add a HorarioEstablecimiento to an empty array', () => {
        const horarioEstablecimiento: IHorarioEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing([], horarioEstablecimiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioEstablecimiento);
      });

      it('should not add a HorarioEstablecimiento to an array that contains it', () => {
        const horarioEstablecimiento: IHorarioEstablecimiento = sampleWithRequiredData;
        const horarioEstablecimientoCollection: IHorarioEstablecimiento[] = [
          {
            ...horarioEstablecimiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing(horarioEstablecimientoCollection, horarioEstablecimiento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HorarioEstablecimiento to an array that doesn't contain it", () => {
        const horarioEstablecimiento: IHorarioEstablecimiento = sampleWithRequiredData;
        const horarioEstablecimientoCollection: IHorarioEstablecimiento[] = [sampleWithPartialData];
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing(horarioEstablecimientoCollection, horarioEstablecimiento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioEstablecimiento);
      });

      it('should add only unique HorarioEstablecimiento to an array', () => {
        const horarioEstablecimientoArray: IHorarioEstablecimiento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const horarioEstablecimientoCollection: IHorarioEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing(
          horarioEstablecimientoCollection,
          ...horarioEstablecimientoArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const horarioEstablecimiento: IHorarioEstablecimiento = sampleWithRequiredData;
        const horarioEstablecimiento2: IHorarioEstablecimiento = sampleWithPartialData;
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing([], horarioEstablecimiento, horarioEstablecimiento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioEstablecimiento);
        expect(expectedResult).toContain(horarioEstablecimiento2);
      });

      it('should accept null and undefined values', () => {
        const horarioEstablecimiento: IHorarioEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing([], null, horarioEstablecimiento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioEstablecimiento);
      });

      it('should return initial array if no HorarioEstablecimiento is added', () => {
        const horarioEstablecimientoCollection: IHorarioEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addHorarioEstablecimientoToCollectionIfMissing(horarioEstablecimientoCollection, undefined, null);
        expect(expectedResult).toEqual(horarioEstablecimientoCollection);
      });
    });

    describe('compareHorarioEstablecimiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHorarioEstablecimiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHorarioEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareHorarioEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHorarioEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareHorarioEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHorarioEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareHorarioEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
