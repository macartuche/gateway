import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../formulario-053-contrareferencia.test-samples';

import { Formulario053ContrareferenciaService } from './formulario-053-contrareferencia.service';

const requireRestSample: IFormulario053Contrareferencia = {
  ...sampleWithRequiredData,
};

describe('Formulario053Contrareferencia Service', () => {
  let service: Formulario053ContrareferenciaService;
  let httpMock: HttpTestingController;
  let expectedResult: IFormulario053Contrareferencia | IFormulario053Contrareferencia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Formulario053ContrareferenciaService);
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

    it('should create a Formulario053Contrareferencia', () => {
      const formulario053Contrareferencia = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(formulario053Contrareferencia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Formulario053Contrareferencia', () => {
      const formulario053Contrareferencia = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(formulario053Contrareferencia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Formulario053Contrareferencia', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Formulario053Contrareferencia', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Formulario053Contrareferencia', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFormulario053ContrareferenciaToCollectionIfMissing', () => {
      it('should add a Formulario053Contrareferencia to an empty array', () => {
        const formulario053Contrareferencia: IFormulario053Contrareferencia = sampleWithRequiredData;
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing([], formulario053Contrareferencia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(formulario053Contrareferencia);
      });

      it('should not add a Formulario053Contrareferencia to an array that contains it', () => {
        const formulario053Contrareferencia: IFormulario053Contrareferencia = sampleWithRequiredData;
        const formulario053ContrareferenciaCollection: IFormulario053Contrareferencia[] = [
          {
            ...formulario053Contrareferencia,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing(
          formulario053ContrareferenciaCollection,
          formulario053Contrareferencia,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Formulario053Contrareferencia to an array that doesn't contain it", () => {
        const formulario053Contrareferencia: IFormulario053Contrareferencia = sampleWithRequiredData;
        const formulario053ContrareferenciaCollection: IFormulario053Contrareferencia[] = [sampleWithPartialData];
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing(
          formulario053ContrareferenciaCollection,
          formulario053Contrareferencia,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(formulario053Contrareferencia);
      });

      it('should add only unique Formulario053Contrareferencia to an array', () => {
        const formulario053ContrareferenciaArray: IFormulario053Contrareferencia[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const formulario053ContrareferenciaCollection: IFormulario053Contrareferencia[] = [sampleWithRequiredData];
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing(
          formulario053ContrareferenciaCollection,
          ...formulario053ContrareferenciaArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const formulario053Contrareferencia: IFormulario053Contrareferencia = sampleWithRequiredData;
        const formulario053Contrareferencia2: IFormulario053Contrareferencia = sampleWithPartialData;
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing(
          [],
          formulario053Contrareferencia,
          formulario053Contrareferencia2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(formulario053Contrareferencia);
        expect(expectedResult).toContain(formulario053Contrareferencia2);
      });

      it('should accept null and undefined values', () => {
        const formulario053Contrareferencia: IFormulario053Contrareferencia = sampleWithRequiredData;
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing([], null, formulario053Contrareferencia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(formulario053Contrareferencia);
      });

      it('should return initial array if no Formulario053Contrareferencia is added', () => {
        const formulario053ContrareferenciaCollection: IFormulario053Contrareferencia[] = [sampleWithRequiredData];
        expectedResult = service.addFormulario053ContrareferenciaToCollectionIfMissing(
          formulario053ContrareferenciaCollection,
          undefined,
          null,
        );
        expect(expectedResult).toEqual(formulario053ContrareferenciaCollection);
      });
    });

    describe('compareFormulario053Contrareferencia', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFormulario053Contrareferencia(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFormulario053Contrareferencia(entity1, entity2);
        const compareResult2 = service.compareFormulario053Contrareferencia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFormulario053Contrareferencia(entity1, entity2);
        const compareResult2 = service.compareFormulario053Contrareferencia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFormulario053Contrareferencia(entity1, entity2);
        const compareResult2 = service.compareFormulario053Contrareferencia(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
