import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContinuidadAsistencial } from '../continuidad-asistencial.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../continuidad-asistencial.test-samples';

import { ContinuidadAsistencialService } from './continuidad-asistencial.service';

const requireRestSample: IContinuidadAsistencial = {
  ...sampleWithRequiredData,
};

describe('ContinuidadAsistencial Service', () => {
  let service: ContinuidadAsistencialService;
  let httpMock: HttpTestingController;
  let expectedResult: IContinuidadAsistencial | IContinuidadAsistencial[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContinuidadAsistencialService);
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

    it('should create a ContinuidadAsistencial', () => {
      const continuidadAsistencial = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(continuidadAsistencial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContinuidadAsistencial', () => {
      const continuidadAsistencial = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(continuidadAsistencial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContinuidadAsistencial', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContinuidadAsistencial', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContinuidadAsistencial', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContinuidadAsistencialToCollectionIfMissing', () => {
      it('should add a ContinuidadAsistencial to an empty array', () => {
        const continuidadAsistencial: IContinuidadAsistencial = sampleWithRequiredData;
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing([], continuidadAsistencial);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(continuidadAsistencial);
      });

      it('should not add a ContinuidadAsistencial to an array that contains it', () => {
        const continuidadAsistencial: IContinuidadAsistencial = sampleWithRequiredData;
        const continuidadAsistencialCollection: IContinuidadAsistencial[] = [
          {
            ...continuidadAsistencial,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing(continuidadAsistencialCollection, continuidadAsistencial);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContinuidadAsistencial to an array that doesn't contain it", () => {
        const continuidadAsistencial: IContinuidadAsistencial = sampleWithRequiredData;
        const continuidadAsistencialCollection: IContinuidadAsistencial[] = [sampleWithPartialData];
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing(continuidadAsistencialCollection, continuidadAsistencial);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(continuidadAsistencial);
      });

      it('should add only unique ContinuidadAsistencial to an array', () => {
        const continuidadAsistencialArray: IContinuidadAsistencial[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const continuidadAsistencialCollection: IContinuidadAsistencial[] = [sampleWithRequiredData];
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing(
          continuidadAsistencialCollection,
          ...continuidadAsistencialArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const continuidadAsistencial: IContinuidadAsistencial = sampleWithRequiredData;
        const continuidadAsistencial2: IContinuidadAsistencial = sampleWithPartialData;
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing([], continuidadAsistencial, continuidadAsistencial2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(continuidadAsistencial);
        expect(expectedResult).toContain(continuidadAsistencial2);
      });

      it('should accept null and undefined values', () => {
        const continuidadAsistencial: IContinuidadAsistencial = sampleWithRequiredData;
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing([], null, continuidadAsistencial, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(continuidadAsistencial);
      });

      it('should return initial array if no ContinuidadAsistencial is added', () => {
        const continuidadAsistencialCollection: IContinuidadAsistencial[] = [sampleWithRequiredData];
        expectedResult = service.addContinuidadAsistencialToCollectionIfMissing(continuidadAsistencialCollection, undefined, null);
        expect(expectedResult).toEqual(continuidadAsistencialCollection);
      });
    });

    describe('compareContinuidadAsistencial', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContinuidadAsistencial(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContinuidadAsistencial(entity1, entity2);
        const compareResult2 = service.compareContinuidadAsistencial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContinuidadAsistencial(entity1, entity2);
        const compareResult2 = service.compareContinuidadAsistencial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContinuidadAsistencial(entity1, entity2);
        const compareResult2 = service.compareContinuidadAsistencial(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
