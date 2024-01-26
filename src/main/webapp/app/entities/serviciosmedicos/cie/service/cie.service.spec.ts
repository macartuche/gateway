import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICie } from '../cie.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cie.test-samples';

import { CieService } from './cie.service';

const requireRestSample: ICie = {
  ...sampleWithRequiredData,
};

describe('Cie Service', () => {
  let service: CieService;
  let httpMock: HttpTestingController;
  let expectedResult: ICie | ICie[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CieService);
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

    it('should create a Cie', () => {
      const cie = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Cie', () => {
      const cie = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Cie', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Cie', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Cie', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCieToCollectionIfMissing', () => {
      it('should add a Cie to an empty array', () => {
        const cie: ICie = sampleWithRequiredData;
        expectedResult = service.addCieToCollectionIfMissing([], cie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cie);
      });

      it('should not add a Cie to an array that contains it', () => {
        const cie: ICie = sampleWithRequiredData;
        const cieCollection: ICie[] = [
          {
            ...cie,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCieToCollectionIfMissing(cieCollection, cie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Cie to an array that doesn't contain it", () => {
        const cie: ICie = sampleWithRequiredData;
        const cieCollection: ICie[] = [sampleWithPartialData];
        expectedResult = service.addCieToCollectionIfMissing(cieCollection, cie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cie);
      });

      it('should add only unique Cie to an array', () => {
        const cieArray: ICie[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cieCollection: ICie[] = [sampleWithRequiredData];
        expectedResult = service.addCieToCollectionIfMissing(cieCollection, ...cieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cie: ICie = sampleWithRequiredData;
        const cie2: ICie = sampleWithPartialData;
        expectedResult = service.addCieToCollectionIfMissing([], cie, cie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cie);
        expect(expectedResult).toContain(cie2);
      });

      it('should accept null and undefined values', () => {
        const cie: ICie = sampleWithRequiredData;
        expectedResult = service.addCieToCollectionIfMissing([], null, cie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cie);
      });

      it('should return initial array if no Cie is added', () => {
        const cieCollection: ICie[] = [sampleWithRequiredData];
        expectedResult = service.addCieToCollectionIfMissing(cieCollection, undefined, null);
        expect(expectedResult).toEqual(cieCollection);
      });
    });

    describe('compareCie', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCie(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCie(entity1, entity2);
        const compareResult2 = service.compareCie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCie(entity1, entity2);
        const compareResult2 = service.compareCie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCie(entity1, entity2);
        const compareResult2 = service.compareCie(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
