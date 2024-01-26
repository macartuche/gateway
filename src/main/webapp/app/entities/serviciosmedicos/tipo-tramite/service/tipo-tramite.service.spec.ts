import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoTramite } from '../tipo-tramite.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-tramite.test-samples';

import { TipoTramiteService } from './tipo-tramite.service';

const requireRestSample: ITipoTramite = {
  ...sampleWithRequiredData,
};

describe('TipoTramite Service', () => {
  let service: TipoTramiteService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoTramite | ITipoTramite[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoTramiteService);
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

    it('should create a TipoTramite', () => {
      const tipoTramite = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoTramite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoTramite', () => {
      const tipoTramite = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoTramite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoTramite', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoTramite', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoTramite', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoTramiteToCollectionIfMissing', () => {
      it('should add a TipoTramite to an empty array', () => {
        const tipoTramite: ITipoTramite = sampleWithRequiredData;
        expectedResult = service.addTipoTramiteToCollectionIfMissing([], tipoTramite);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoTramite);
      });

      it('should not add a TipoTramite to an array that contains it', () => {
        const tipoTramite: ITipoTramite = sampleWithRequiredData;
        const tipoTramiteCollection: ITipoTramite[] = [
          {
            ...tipoTramite,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoTramiteToCollectionIfMissing(tipoTramiteCollection, tipoTramite);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoTramite to an array that doesn't contain it", () => {
        const tipoTramite: ITipoTramite = sampleWithRequiredData;
        const tipoTramiteCollection: ITipoTramite[] = [sampleWithPartialData];
        expectedResult = service.addTipoTramiteToCollectionIfMissing(tipoTramiteCollection, tipoTramite);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoTramite);
      });

      it('should add only unique TipoTramite to an array', () => {
        const tipoTramiteArray: ITipoTramite[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoTramiteCollection: ITipoTramite[] = [sampleWithRequiredData];
        expectedResult = service.addTipoTramiteToCollectionIfMissing(tipoTramiteCollection, ...tipoTramiteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoTramite: ITipoTramite = sampleWithRequiredData;
        const tipoTramite2: ITipoTramite = sampleWithPartialData;
        expectedResult = service.addTipoTramiteToCollectionIfMissing([], tipoTramite, tipoTramite2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoTramite);
        expect(expectedResult).toContain(tipoTramite2);
      });

      it('should accept null and undefined values', () => {
        const tipoTramite: ITipoTramite = sampleWithRequiredData;
        expectedResult = service.addTipoTramiteToCollectionIfMissing([], null, tipoTramite, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoTramite);
      });

      it('should return initial array if no TipoTramite is added', () => {
        const tipoTramiteCollection: ITipoTramite[] = [sampleWithRequiredData];
        expectedResult = service.addTipoTramiteToCollectionIfMissing(tipoTramiteCollection, undefined, null);
        expect(expectedResult).toEqual(tipoTramiteCollection);
      });
    });

    describe('compareTipoTramite', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoTramite(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoTramite(entity1, entity2);
        const compareResult2 = service.compareTipoTramite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoTramite(entity1, entity2);
        const compareResult2 = service.compareTipoTramite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoTramite(entity1, entity2);
        const compareResult2 = service.compareTipoTramite(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
