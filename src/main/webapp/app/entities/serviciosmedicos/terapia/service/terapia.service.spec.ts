import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITerapia } from '../terapia.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../terapia.test-samples';

import { TerapiaService } from './terapia.service';

const requireRestSample: ITerapia = {
  ...sampleWithRequiredData,
};

describe('Terapia Service', () => {
  let service: TerapiaService;
  let httpMock: HttpTestingController;
  let expectedResult: ITerapia | ITerapia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TerapiaService);
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

    it('should create a Terapia', () => {
      const terapia = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(terapia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Terapia', () => {
      const terapia = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(terapia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Terapia', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Terapia', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Terapia', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTerapiaToCollectionIfMissing', () => {
      it('should add a Terapia to an empty array', () => {
        const terapia: ITerapia = sampleWithRequiredData;
        expectedResult = service.addTerapiaToCollectionIfMissing([], terapia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terapia);
      });

      it('should not add a Terapia to an array that contains it', () => {
        const terapia: ITerapia = sampleWithRequiredData;
        const terapiaCollection: ITerapia[] = [
          {
            ...terapia,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTerapiaToCollectionIfMissing(terapiaCollection, terapia);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Terapia to an array that doesn't contain it", () => {
        const terapia: ITerapia = sampleWithRequiredData;
        const terapiaCollection: ITerapia[] = [sampleWithPartialData];
        expectedResult = service.addTerapiaToCollectionIfMissing(terapiaCollection, terapia);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terapia);
      });

      it('should add only unique Terapia to an array', () => {
        const terapiaArray: ITerapia[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const terapiaCollection: ITerapia[] = [sampleWithRequiredData];
        expectedResult = service.addTerapiaToCollectionIfMissing(terapiaCollection, ...terapiaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const terapia: ITerapia = sampleWithRequiredData;
        const terapia2: ITerapia = sampleWithPartialData;
        expectedResult = service.addTerapiaToCollectionIfMissing([], terapia, terapia2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(terapia);
        expect(expectedResult).toContain(terapia2);
      });

      it('should accept null and undefined values', () => {
        const terapia: ITerapia = sampleWithRequiredData;
        expectedResult = service.addTerapiaToCollectionIfMissing([], null, terapia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(terapia);
      });

      it('should return initial array if no Terapia is added', () => {
        const terapiaCollection: ITerapia[] = [sampleWithRequiredData];
        expectedResult = service.addTerapiaToCollectionIfMissing(terapiaCollection, undefined, null);
        expect(expectedResult).toEqual(terapiaCollection);
      });
    });

    describe('compareTerapia', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTerapia(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTerapia(entity1, entity2);
        const compareResult2 = service.compareTerapia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTerapia(entity1, entity2);
        const compareResult2 = service.compareTerapia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTerapia(entity1, entity2);
        const compareResult2 = service.compareTerapia(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
