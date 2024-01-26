import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IParroquiaTerritorio } from '../parroquia-territorio.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../parroquia-territorio.test-samples';

import { ParroquiaTerritorioService } from './parroquia-territorio.service';

const requireRestSample: IParroquiaTerritorio = {
  ...sampleWithRequiredData,
};

describe('ParroquiaTerritorio Service', () => {
  let service: ParroquiaTerritorioService;
  let httpMock: HttpTestingController;
  let expectedResult: IParroquiaTerritorio | IParroquiaTerritorio[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ParroquiaTerritorioService);
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

    it('should create a ParroquiaTerritorio', () => {
      const parroquiaTerritorio = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(parroquiaTerritorio).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ParroquiaTerritorio', () => {
      const parroquiaTerritorio = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(parroquiaTerritorio).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ParroquiaTerritorio', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ParroquiaTerritorio', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ParroquiaTerritorio', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addParroquiaTerritorioToCollectionIfMissing', () => {
      it('should add a ParroquiaTerritorio to an empty array', () => {
        const parroquiaTerritorio: IParroquiaTerritorio = sampleWithRequiredData;
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing([], parroquiaTerritorio);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parroquiaTerritorio);
      });

      it('should not add a ParroquiaTerritorio to an array that contains it', () => {
        const parroquiaTerritorio: IParroquiaTerritorio = sampleWithRequiredData;
        const parroquiaTerritorioCollection: IParroquiaTerritorio[] = [
          {
            ...parroquiaTerritorio,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing(parroquiaTerritorioCollection, parroquiaTerritorio);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ParroquiaTerritorio to an array that doesn't contain it", () => {
        const parroquiaTerritorio: IParroquiaTerritorio = sampleWithRequiredData;
        const parroquiaTerritorioCollection: IParroquiaTerritorio[] = [sampleWithPartialData];
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing(parroquiaTerritorioCollection, parroquiaTerritorio);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parroquiaTerritorio);
      });

      it('should add only unique ParroquiaTerritorio to an array', () => {
        const parroquiaTerritorioArray: IParroquiaTerritorio[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const parroquiaTerritorioCollection: IParroquiaTerritorio[] = [sampleWithRequiredData];
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing(parroquiaTerritorioCollection, ...parroquiaTerritorioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const parroquiaTerritorio: IParroquiaTerritorio = sampleWithRequiredData;
        const parroquiaTerritorio2: IParroquiaTerritorio = sampleWithPartialData;
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing([], parroquiaTerritorio, parroquiaTerritorio2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parroquiaTerritorio);
        expect(expectedResult).toContain(parroquiaTerritorio2);
      });

      it('should accept null and undefined values', () => {
        const parroquiaTerritorio: IParroquiaTerritorio = sampleWithRequiredData;
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing([], null, parroquiaTerritorio, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parroquiaTerritorio);
      });

      it('should return initial array if no ParroquiaTerritorio is added', () => {
        const parroquiaTerritorioCollection: IParroquiaTerritorio[] = [sampleWithRequiredData];
        expectedResult = service.addParroquiaTerritorioToCollectionIfMissing(parroquiaTerritorioCollection, undefined, null);
        expect(expectedResult).toEqual(parroquiaTerritorioCollection);
      });
    });

    describe('compareParroquiaTerritorio', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareParroquiaTerritorio(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareParroquiaTerritorio(entity1, entity2);
        const compareResult2 = service.compareParroquiaTerritorio(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareParroquiaTerritorio(entity1, entity2);
        const compareResult2 = service.compareParroquiaTerritorio(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareParroquiaTerritorio(entity1, entity2);
        const compareResult2 = service.compareParroquiaTerritorio(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
