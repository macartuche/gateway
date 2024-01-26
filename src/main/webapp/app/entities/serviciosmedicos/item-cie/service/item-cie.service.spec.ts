import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IItemCie } from '../item-cie.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../item-cie.test-samples';

import { ItemCieService } from './item-cie.service';

const requireRestSample: IItemCie = {
  ...sampleWithRequiredData,
};

describe('ItemCie Service', () => {
  let service: ItemCieService;
  let httpMock: HttpTestingController;
  let expectedResult: IItemCie | IItemCie[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItemCieService);
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

    it('should create a ItemCie', () => {
      const itemCie = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(itemCie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItemCie', () => {
      const itemCie = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(itemCie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ItemCie', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItemCie', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ItemCie', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addItemCieToCollectionIfMissing', () => {
      it('should add a ItemCie to an empty array', () => {
        const itemCie: IItemCie = sampleWithRequiredData;
        expectedResult = service.addItemCieToCollectionIfMissing([], itemCie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemCie);
      });

      it('should not add a ItemCie to an array that contains it', () => {
        const itemCie: IItemCie = sampleWithRequiredData;
        const itemCieCollection: IItemCie[] = [
          {
            ...itemCie,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItemCieToCollectionIfMissing(itemCieCollection, itemCie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItemCie to an array that doesn't contain it", () => {
        const itemCie: IItemCie = sampleWithRequiredData;
        const itemCieCollection: IItemCie[] = [sampleWithPartialData];
        expectedResult = service.addItemCieToCollectionIfMissing(itemCieCollection, itemCie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemCie);
      });

      it('should add only unique ItemCie to an array', () => {
        const itemCieArray: IItemCie[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const itemCieCollection: IItemCie[] = [sampleWithRequiredData];
        expectedResult = service.addItemCieToCollectionIfMissing(itemCieCollection, ...itemCieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itemCie: IItemCie = sampleWithRequiredData;
        const itemCie2: IItemCie = sampleWithPartialData;
        expectedResult = service.addItemCieToCollectionIfMissing([], itemCie, itemCie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemCie);
        expect(expectedResult).toContain(itemCie2);
      });

      it('should accept null and undefined values', () => {
        const itemCie: IItemCie = sampleWithRequiredData;
        expectedResult = service.addItemCieToCollectionIfMissing([], null, itemCie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemCie);
      });

      it('should return initial array if no ItemCie is added', () => {
        const itemCieCollection: IItemCie[] = [sampleWithRequiredData];
        expectedResult = service.addItemCieToCollectionIfMissing(itemCieCollection, undefined, null);
        expect(expectedResult).toEqual(itemCieCollection);
      });
    });

    describe('compareItemCie', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItemCie(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareItemCie(entity1, entity2);
        const compareResult2 = service.compareItemCie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareItemCie(entity1, entity2);
        const compareResult2 = service.compareItemCie(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareItemCie(entity1, entity2);
        const compareResult2 = service.compareItemCie(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
