import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDistrito } from '../distrito.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../distrito.test-samples';

import { DistritoService } from './distrito.service';

const requireRestSample: IDistrito = {
  ...sampleWithRequiredData,
};

describe('Distrito Service', () => {
  let service: DistritoService;
  let httpMock: HttpTestingController;
  let expectedResult: IDistrito | IDistrito[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DistritoService);
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

    it('should create a Distrito', () => {
      const distrito = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(distrito).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Distrito', () => {
      const distrito = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(distrito).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Distrito', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Distrito', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Distrito', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDistritoToCollectionIfMissing', () => {
      it('should add a Distrito to an empty array', () => {
        const distrito: IDistrito = sampleWithRequiredData;
        expectedResult = service.addDistritoToCollectionIfMissing([], distrito);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(distrito);
      });

      it('should not add a Distrito to an array that contains it', () => {
        const distrito: IDistrito = sampleWithRequiredData;
        const distritoCollection: IDistrito[] = [
          {
            ...distrito,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDistritoToCollectionIfMissing(distritoCollection, distrito);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Distrito to an array that doesn't contain it", () => {
        const distrito: IDistrito = sampleWithRequiredData;
        const distritoCollection: IDistrito[] = [sampleWithPartialData];
        expectedResult = service.addDistritoToCollectionIfMissing(distritoCollection, distrito);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(distrito);
      });

      it('should add only unique Distrito to an array', () => {
        const distritoArray: IDistrito[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const distritoCollection: IDistrito[] = [sampleWithRequiredData];
        expectedResult = service.addDistritoToCollectionIfMissing(distritoCollection, ...distritoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const distrito: IDistrito = sampleWithRequiredData;
        const distrito2: IDistrito = sampleWithPartialData;
        expectedResult = service.addDistritoToCollectionIfMissing([], distrito, distrito2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(distrito);
        expect(expectedResult).toContain(distrito2);
      });

      it('should accept null and undefined values', () => {
        const distrito: IDistrito = sampleWithRequiredData;
        expectedResult = service.addDistritoToCollectionIfMissing([], null, distrito, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(distrito);
      });

      it('should return initial array if no Distrito is added', () => {
        const distritoCollection: IDistrito[] = [sampleWithRequiredData];
        expectedResult = service.addDistritoToCollectionIfMissing(distritoCollection, undefined, null);
        expect(expectedResult).toEqual(distritoCollection);
      });
    });

    describe('compareDistrito', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDistrito(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDistrito(entity1, entity2);
        const compareResult2 = service.compareDistrito(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDistrito(entity1, entity2);
        const compareResult2 = service.compareDistrito(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDistrito(entity1, entity2);
        const compareResult2 = service.compareDistrito(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
