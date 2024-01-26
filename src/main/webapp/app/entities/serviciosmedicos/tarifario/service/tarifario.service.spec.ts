import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITarifario } from '../tarifario.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tarifario.test-samples';

import { TarifarioService } from './tarifario.service';

const requireRestSample: ITarifario = {
  ...sampleWithRequiredData,
};

describe('Tarifario Service', () => {
  let service: TarifarioService;
  let httpMock: HttpTestingController;
  let expectedResult: ITarifario | ITarifario[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TarifarioService);
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

    it('should create a Tarifario', () => {
      const tarifario = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tarifario).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Tarifario', () => {
      const tarifario = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tarifario).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Tarifario', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Tarifario', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Tarifario', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTarifarioToCollectionIfMissing', () => {
      it('should add a Tarifario to an empty array', () => {
        const tarifario: ITarifario = sampleWithRequiredData;
        expectedResult = service.addTarifarioToCollectionIfMissing([], tarifario);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tarifario);
      });

      it('should not add a Tarifario to an array that contains it', () => {
        const tarifario: ITarifario = sampleWithRequiredData;
        const tarifarioCollection: ITarifario[] = [
          {
            ...tarifario,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTarifarioToCollectionIfMissing(tarifarioCollection, tarifario);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Tarifario to an array that doesn't contain it", () => {
        const tarifario: ITarifario = sampleWithRequiredData;
        const tarifarioCollection: ITarifario[] = [sampleWithPartialData];
        expectedResult = service.addTarifarioToCollectionIfMissing(tarifarioCollection, tarifario);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tarifario);
      });

      it('should add only unique Tarifario to an array', () => {
        const tarifarioArray: ITarifario[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tarifarioCollection: ITarifario[] = [sampleWithRequiredData];
        expectedResult = service.addTarifarioToCollectionIfMissing(tarifarioCollection, ...tarifarioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tarifario: ITarifario = sampleWithRequiredData;
        const tarifario2: ITarifario = sampleWithPartialData;
        expectedResult = service.addTarifarioToCollectionIfMissing([], tarifario, tarifario2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tarifario);
        expect(expectedResult).toContain(tarifario2);
      });

      it('should accept null and undefined values', () => {
        const tarifario: ITarifario = sampleWithRequiredData;
        expectedResult = service.addTarifarioToCollectionIfMissing([], null, tarifario, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tarifario);
      });

      it('should return initial array if no Tarifario is added', () => {
        const tarifarioCollection: ITarifario[] = [sampleWithRequiredData];
        expectedResult = service.addTarifarioToCollectionIfMissing(tarifarioCollection, undefined, null);
        expect(expectedResult).toEqual(tarifarioCollection);
      });
    });

    describe('compareTarifario', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTarifario(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTarifario(entity1, entity2);
        const compareResult2 = service.compareTarifario(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTarifario(entity1, entity2);
        const compareResult2 = service.compareTarifario(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTarifario(entity1, entity2);
        const compareResult2 = service.compareTarifario(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
