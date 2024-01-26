import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMotivoReferencia } from '../motivo-referencia.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../motivo-referencia.test-samples';

import { MotivoReferenciaService } from './motivo-referencia.service';

const requireRestSample: IMotivoReferencia = {
  ...sampleWithRequiredData,
};

describe('MotivoReferencia Service', () => {
  let service: MotivoReferenciaService;
  let httpMock: HttpTestingController;
  let expectedResult: IMotivoReferencia | IMotivoReferencia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MotivoReferenciaService);
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

    it('should create a MotivoReferencia', () => {
      const motivoReferencia = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(motivoReferencia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MotivoReferencia', () => {
      const motivoReferencia = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(motivoReferencia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MotivoReferencia', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MotivoReferencia', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MotivoReferencia', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMotivoReferenciaToCollectionIfMissing', () => {
      it('should add a MotivoReferencia to an empty array', () => {
        const motivoReferencia: IMotivoReferencia = sampleWithRequiredData;
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing([], motivoReferencia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(motivoReferencia);
      });

      it('should not add a MotivoReferencia to an array that contains it', () => {
        const motivoReferencia: IMotivoReferencia = sampleWithRequiredData;
        const motivoReferenciaCollection: IMotivoReferencia[] = [
          {
            ...motivoReferencia,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing(motivoReferenciaCollection, motivoReferencia);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MotivoReferencia to an array that doesn't contain it", () => {
        const motivoReferencia: IMotivoReferencia = sampleWithRequiredData;
        const motivoReferenciaCollection: IMotivoReferencia[] = [sampleWithPartialData];
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing(motivoReferenciaCollection, motivoReferencia);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(motivoReferencia);
      });

      it('should add only unique MotivoReferencia to an array', () => {
        const motivoReferenciaArray: IMotivoReferencia[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const motivoReferenciaCollection: IMotivoReferencia[] = [sampleWithRequiredData];
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing(motivoReferenciaCollection, ...motivoReferenciaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const motivoReferencia: IMotivoReferencia = sampleWithRequiredData;
        const motivoReferencia2: IMotivoReferencia = sampleWithPartialData;
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing([], motivoReferencia, motivoReferencia2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(motivoReferencia);
        expect(expectedResult).toContain(motivoReferencia2);
      });

      it('should accept null and undefined values', () => {
        const motivoReferencia: IMotivoReferencia = sampleWithRequiredData;
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing([], null, motivoReferencia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(motivoReferencia);
      });

      it('should return initial array if no MotivoReferencia is added', () => {
        const motivoReferenciaCollection: IMotivoReferencia[] = [sampleWithRequiredData];
        expectedResult = service.addMotivoReferenciaToCollectionIfMissing(motivoReferenciaCollection, undefined, null);
        expect(expectedResult).toEqual(motivoReferenciaCollection);
      });
    });

    describe('compareMotivoReferencia', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMotivoReferencia(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMotivoReferencia(entity1, entity2);
        const compareResult2 = service.compareMotivoReferencia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMotivoReferencia(entity1, entity2);
        const compareResult2 = service.compareMotivoReferencia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMotivoReferencia(entity1, entity2);
        const compareResult2 = service.compareMotivoReferencia(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
