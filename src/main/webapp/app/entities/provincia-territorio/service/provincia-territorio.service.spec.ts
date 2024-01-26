import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProvinciaTerritorio } from '../provincia-territorio.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../provincia-territorio.test-samples';

import { ProvinciaTerritorioService } from './provincia-territorio.service';

const requireRestSample: IProvinciaTerritorio = {
  ...sampleWithRequiredData,
};

describe('ProvinciaTerritorio Service', () => {
  let service: ProvinciaTerritorioService;
  let httpMock: HttpTestingController;
  let expectedResult: IProvinciaTerritorio | IProvinciaTerritorio[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProvinciaTerritorioService);
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

    it('should create a ProvinciaTerritorio', () => {
      const provinciaTerritorio = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(provinciaTerritorio).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProvinciaTerritorio', () => {
      const provinciaTerritorio = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(provinciaTerritorio).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProvinciaTerritorio', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProvinciaTerritorio', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProvinciaTerritorio', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProvinciaTerritorioToCollectionIfMissing', () => {
      it('should add a ProvinciaTerritorio to an empty array', () => {
        const provinciaTerritorio: IProvinciaTerritorio = sampleWithRequiredData;
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing([], provinciaTerritorio);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(provinciaTerritorio);
      });

      it('should not add a ProvinciaTerritorio to an array that contains it', () => {
        const provinciaTerritorio: IProvinciaTerritorio = sampleWithRequiredData;
        const provinciaTerritorioCollection: IProvinciaTerritorio[] = [
          {
            ...provinciaTerritorio,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing(provinciaTerritorioCollection, provinciaTerritorio);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProvinciaTerritorio to an array that doesn't contain it", () => {
        const provinciaTerritorio: IProvinciaTerritorio = sampleWithRequiredData;
        const provinciaTerritorioCollection: IProvinciaTerritorio[] = [sampleWithPartialData];
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing(provinciaTerritorioCollection, provinciaTerritorio);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(provinciaTerritorio);
      });

      it('should add only unique ProvinciaTerritorio to an array', () => {
        const provinciaTerritorioArray: IProvinciaTerritorio[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const provinciaTerritorioCollection: IProvinciaTerritorio[] = [sampleWithRequiredData];
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing(provinciaTerritorioCollection, ...provinciaTerritorioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const provinciaTerritorio: IProvinciaTerritorio = sampleWithRequiredData;
        const provinciaTerritorio2: IProvinciaTerritorio = sampleWithPartialData;
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing([], provinciaTerritorio, provinciaTerritorio2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(provinciaTerritorio);
        expect(expectedResult).toContain(provinciaTerritorio2);
      });

      it('should accept null and undefined values', () => {
        const provinciaTerritorio: IProvinciaTerritorio = sampleWithRequiredData;
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing([], null, provinciaTerritorio, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(provinciaTerritorio);
      });

      it('should return initial array if no ProvinciaTerritorio is added', () => {
        const provinciaTerritorioCollection: IProvinciaTerritorio[] = [sampleWithRequiredData];
        expectedResult = service.addProvinciaTerritorioToCollectionIfMissing(provinciaTerritorioCollection, undefined, null);
        expect(expectedResult).toEqual(provinciaTerritorioCollection);
      });
    });

    describe('compareProvinciaTerritorio', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProvinciaTerritorio(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProvinciaTerritorio(entity1, entity2);
        const compareResult2 = service.compareProvinciaTerritorio(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProvinciaTerritorio(entity1, entity2);
        const compareResult2 = service.compareProvinciaTerritorio(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProvinciaTerritorio(entity1, entity2);
        const compareResult2 = service.compareProvinciaTerritorio(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
