import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IBloqueoTurno } from '../bloqueo-turno.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../bloqueo-turno.test-samples';

import { BloqueoTurnoService, RestBloqueoTurno } from './bloqueo-turno.service';

const requireRestSample: RestBloqueoTurno = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.format(DATE_FORMAT),
};

describe('BloqueoTurno Service', () => {
  let service: BloqueoTurnoService;
  let httpMock: HttpTestingController;
  let expectedResult: IBloqueoTurno | IBloqueoTurno[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BloqueoTurnoService);
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

    it('should create a BloqueoTurno', () => {
      const bloqueoTurno = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bloqueoTurno).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BloqueoTurno', () => {
      const bloqueoTurno = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bloqueoTurno).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BloqueoTurno', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BloqueoTurno', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BloqueoTurno', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBloqueoTurnoToCollectionIfMissing', () => {
      it('should add a BloqueoTurno to an empty array', () => {
        const bloqueoTurno: IBloqueoTurno = sampleWithRequiredData;
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing([], bloqueoTurno);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bloqueoTurno);
      });

      it('should not add a BloqueoTurno to an array that contains it', () => {
        const bloqueoTurno: IBloqueoTurno = sampleWithRequiredData;
        const bloqueoTurnoCollection: IBloqueoTurno[] = [
          {
            ...bloqueoTurno,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing(bloqueoTurnoCollection, bloqueoTurno);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BloqueoTurno to an array that doesn't contain it", () => {
        const bloqueoTurno: IBloqueoTurno = sampleWithRequiredData;
        const bloqueoTurnoCollection: IBloqueoTurno[] = [sampleWithPartialData];
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing(bloqueoTurnoCollection, bloqueoTurno);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bloqueoTurno);
      });

      it('should add only unique BloqueoTurno to an array', () => {
        const bloqueoTurnoArray: IBloqueoTurno[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bloqueoTurnoCollection: IBloqueoTurno[] = [sampleWithRequiredData];
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing(bloqueoTurnoCollection, ...bloqueoTurnoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bloqueoTurno: IBloqueoTurno = sampleWithRequiredData;
        const bloqueoTurno2: IBloqueoTurno = sampleWithPartialData;
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing([], bloqueoTurno, bloqueoTurno2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bloqueoTurno);
        expect(expectedResult).toContain(bloqueoTurno2);
      });

      it('should accept null and undefined values', () => {
        const bloqueoTurno: IBloqueoTurno = sampleWithRequiredData;
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing([], null, bloqueoTurno, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bloqueoTurno);
      });

      it('should return initial array if no BloqueoTurno is added', () => {
        const bloqueoTurnoCollection: IBloqueoTurno[] = [sampleWithRequiredData];
        expectedResult = service.addBloqueoTurnoToCollectionIfMissing(bloqueoTurnoCollection, undefined, null);
        expect(expectedResult).toEqual(bloqueoTurnoCollection);
      });
    });

    describe('compareBloqueoTurno', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBloqueoTurno(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBloqueoTurno(entity1, entity2);
        const compareResult2 = service.compareBloqueoTurno(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBloqueoTurno(entity1, entity2);
        const compareResult2 = service.compareBloqueoTurno(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBloqueoTurno(entity1, entity2);
        const compareResult2 = service.compareBloqueoTurno(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
