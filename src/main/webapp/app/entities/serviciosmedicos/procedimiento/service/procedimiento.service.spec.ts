import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IProcedimiento } from '../procedimiento.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../procedimiento.test-samples';

import { ProcedimientoService, RestProcedimiento } from './procedimiento.service';

const requireRestSample: RestProcedimiento = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.format(DATE_FORMAT),
};

describe('Procedimiento Service', () => {
  let service: ProcedimientoService;
  let httpMock: HttpTestingController;
  let expectedResult: IProcedimiento | IProcedimiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProcedimientoService);
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

    it('should create a Procedimiento', () => {
      const procedimiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(procedimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Procedimiento', () => {
      const procedimiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(procedimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Procedimiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Procedimiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Procedimiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProcedimientoToCollectionIfMissing', () => {
      it('should add a Procedimiento to an empty array', () => {
        const procedimiento: IProcedimiento = sampleWithRequiredData;
        expectedResult = service.addProcedimientoToCollectionIfMissing([], procedimiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(procedimiento);
      });

      it('should not add a Procedimiento to an array that contains it', () => {
        const procedimiento: IProcedimiento = sampleWithRequiredData;
        const procedimientoCollection: IProcedimiento[] = [
          {
            ...procedimiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProcedimientoToCollectionIfMissing(procedimientoCollection, procedimiento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Procedimiento to an array that doesn't contain it", () => {
        const procedimiento: IProcedimiento = sampleWithRequiredData;
        const procedimientoCollection: IProcedimiento[] = [sampleWithPartialData];
        expectedResult = service.addProcedimientoToCollectionIfMissing(procedimientoCollection, procedimiento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(procedimiento);
      });

      it('should add only unique Procedimiento to an array', () => {
        const procedimientoArray: IProcedimiento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const procedimientoCollection: IProcedimiento[] = [sampleWithRequiredData];
        expectedResult = service.addProcedimientoToCollectionIfMissing(procedimientoCollection, ...procedimientoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const procedimiento: IProcedimiento = sampleWithRequiredData;
        const procedimiento2: IProcedimiento = sampleWithPartialData;
        expectedResult = service.addProcedimientoToCollectionIfMissing([], procedimiento, procedimiento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(procedimiento);
        expect(expectedResult).toContain(procedimiento2);
      });

      it('should accept null and undefined values', () => {
        const procedimiento: IProcedimiento = sampleWithRequiredData;
        expectedResult = service.addProcedimientoToCollectionIfMissing([], null, procedimiento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(procedimiento);
      });

      it('should return initial array if no Procedimiento is added', () => {
        const procedimientoCollection: IProcedimiento[] = [sampleWithRequiredData];
        expectedResult = service.addProcedimientoToCollectionIfMissing(procedimientoCollection, undefined, null);
        expect(expectedResult).toEqual(procedimientoCollection);
      });
    });

    describe('compareProcedimiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProcedimiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProcedimiento(entity1, entity2);
        const compareResult2 = service.compareProcedimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProcedimiento(entity1, entity2);
        const compareResult2 = service.compareProcedimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProcedimiento(entity1, entity2);
        const compareResult2 = service.compareProcedimiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
