import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFormulario053Referencia } from '../formulario-053-referencia.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../formulario-053-referencia.test-samples';

import { Formulario053ReferenciaService } from './formulario-053-referencia.service';

const requireRestSample: IFormulario053Referencia = {
  ...sampleWithRequiredData,
};

describe('Formulario053Referencia Service', () => {
  let service: Formulario053ReferenciaService;
  let httpMock: HttpTestingController;
  let expectedResult: IFormulario053Referencia | IFormulario053Referencia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Formulario053ReferenciaService);
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

    it('should create a Formulario053Referencia', () => {
      const formulario053Referencia = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(formulario053Referencia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Formulario053Referencia', () => {
      const formulario053Referencia = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(formulario053Referencia).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Formulario053Referencia', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Formulario053Referencia', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Formulario053Referencia', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFormulario053ReferenciaToCollectionIfMissing', () => {
      it('should add a Formulario053Referencia to an empty array', () => {
        const formulario053Referencia: IFormulario053Referencia = sampleWithRequiredData;
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing([], formulario053Referencia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(formulario053Referencia);
      });

      it('should not add a Formulario053Referencia to an array that contains it', () => {
        const formulario053Referencia: IFormulario053Referencia = sampleWithRequiredData;
        const formulario053ReferenciaCollection: IFormulario053Referencia[] = [
          {
            ...formulario053Referencia,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing(
          formulario053ReferenciaCollection,
          formulario053Referencia,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Formulario053Referencia to an array that doesn't contain it", () => {
        const formulario053Referencia: IFormulario053Referencia = sampleWithRequiredData;
        const formulario053ReferenciaCollection: IFormulario053Referencia[] = [sampleWithPartialData];
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing(
          formulario053ReferenciaCollection,
          formulario053Referencia,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(formulario053Referencia);
      });

      it('should add only unique Formulario053Referencia to an array', () => {
        const formulario053ReferenciaArray: IFormulario053Referencia[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const formulario053ReferenciaCollection: IFormulario053Referencia[] = [sampleWithRequiredData];
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing(
          formulario053ReferenciaCollection,
          ...formulario053ReferenciaArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const formulario053Referencia: IFormulario053Referencia = sampleWithRequiredData;
        const formulario053Referencia2: IFormulario053Referencia = sampleWithPartialData;
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing([], formulario053Referencia, formulario053Referencia2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(formulario053Referencia);
        expect(expectedResult).toContain(formulario053Referencia2);
      });

      it('should accept null and undefined values', () => {
        const formulario053Referencia: IFormulario053Referencia = sampleWithRequiredData;
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing([], null, formulario053Referencia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(formulario053Referencia);
      });

      it('should return initial array if no Formulario053Referencia is added', () => {
        const formulario053ReferenciaCollection: IFormulario053Referencia[] = [sampleWithRequiredData];
        expectedResult = service.addFormulario053ReferenciaToCollectionIfMissing(formulario053ReferenciaCollection, undefined, null);
        expect(expectedResult).toEqual(formulario053ReferenciaCollection);
      });
    });

    describe('compareFormulario053Referencia', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFormulario053Referencia(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFormulario053Referencia(entity1, entity2);
        const compareResult2 = service.compareFormulario053Referencia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFormulario053Referencia(entity1, entity2);
        const compareResult2 = service.compareFormulario053Referencia(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFormulario053Referencia(entity1, entity2);
        const compareResult2 = service.compareFormulario053Referencia(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
