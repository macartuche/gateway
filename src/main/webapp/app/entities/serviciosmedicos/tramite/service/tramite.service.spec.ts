import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITramite } from '../tramite.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tramite.test-samples';

import { TramiteService } from './tramite.service';

const requireRestSample: ITramite = {
  ...sampleWithRequiredData,
};

describe('Tramite Service', () => {
  let service: TramiteService;
  let httpMock: HttpTestingController;
  let expectedResult: ITramite | ITramite[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TramiteService);
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

    it('should create a Tramite', () => {
      const tramite = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tramite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Tramite', () => {
      const tramite = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tramite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Tramite', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Tramite', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Tramite', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTramiteToCollectionIfMissing', () => {
      it('should add a Tramite to an empty array', () => {
        const tramite: ITramite = sampleWithRequiredData;
        expectedResult = service.addTramiteToCollectionIfMissing([], tramite);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tramite);
      });

      it('should not add a Tramite to an array that contains it', () => {
        const tramite: ITramite = sampleWithRequiredData;
        const tramiteCollection: ITramite[] = [
          {
            ...tramite,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTramiteToCollectionIfMissing(tramiteCollection, tramite);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Tramite to an array that doesn't contain it", () => {
        const tramite: ITramite = sampleWithRequiredData;
        const tramiteCollection: ITramite[] = [sampleWithPartialData];
        expectedResult = service.addTramiteToCollectionIfMissing(tramiteCollection, tramite);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tramite);
      });

      it('should add only unique Tramite to an array', () => {
        const tramiteArray: ITramite[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tramiteCollection: ITramite[] = [sampleWithRequiredData];
        expectedResult = service.addTramiteToCollectionIfMissing(tramiteCollection, ...tramiteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tramite: ITramite = sampleWithRequiredData;
        const tramite2: ITramite = sampleWithPartialData;
        expectedResult = service.addTramiteToCollectionIfMissing([], tramite, tramite2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tramite);
        expect(expectedResult).toContain(tramite2);
      });

      it('should accept null and undefined values', () => {
        const tramite: ITramite = sampleWithRequiredData;
        expectedResult = service.addTramiteToCollectionIfMissing([], null, tramite, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tramite);
      });

      it('should return initial array if no Tramite is added', () => {
        const tramiteCollection: ITramite[] = [sampleWithRequiredData];
        expectedResult = service.addTramiteToCollectionIfMissing(tramiteCollection, undefined, null);
        expect(expectedResult).toEqual(tramiteCollection);
      });
    });

    describe('compareTramite', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTramite(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTramite(entity1, entity2);
        const compareResult2 = service.compareTramite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTramite(entity1, entity2);
        const compareResult2 = service.compareTramite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTramite(entity1, entity2);
        const compareResult2 = service.compareTramite(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
