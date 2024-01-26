import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../diagnostico-formulario-053.test-samples';

import { DiagnosticoFormulario053Service } from './diagnostico-formulario-053.service';

const requireRestSample: IDiagnosticoFormulario053 = {
  ...sampleWithRequiredData,
};

describe('DiagnosticoFormulario053 Service', () => {
  let service: DiagnosticoFormulario053Service;
  let httpMock: HttpTestingController;
  let expectedResult: IDiagnosticoFormulario053 | IDiagnosticoFormulario053[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DiagnosticoFormulario053Service);
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

    it('should create a DiagnosticoFormulario053', () => {
      const diagnosticoFormulario053 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(diagnosticoFormulario053).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DiagnosticoFormulario053', () => {
      const diagnosticoFormulario053 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(diagnosticoFormulario053).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DiagnosticoFormulario053', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DiagnosticoFormulario053', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DiagnosticoFormulario053', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDiagnosticoFormulario053ToCollectionIfMissing', () => {
      it('should add a DiagnosticoFormulario053 to an empty array', () => {
        const diagnosticoFormulario053: IDiagnosticoFormulario053 = sampleWithRequiredData;
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing([], diagnosticoFormulario053);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(diagnosticoFormulario053);
      });

      it('should not add a DiagnosticoFormulario053 to an array that contains it', () => {
        const diagnosticoFormulario053: IDiagnosticoFormulario053 = sampleWithRequiredData;
        const diagnosticoFormulario053Collection: IDiagnosticoFormulario053[] = [
          {
            ...diagnosticoFormulario053,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing(
          diagnosticoFormulario053Collection,
          diagnosticoFormulario053,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DiagnosticoFormulario053 to an array that doesn't contain it", () => {
        const diagnosticoFormulario053: IDiagnosticoFormulario053 = sampleWithRequiredData;
        const diagnosticoFormulario053Collection: IDiagnosticoFormulario053[] = [sampleWithPartialData];
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing(
          diagnosticoFormulario053Collection,
          diagnosticoFormulario053,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(diagnosticoFormulario053);
      });

      it('should add only unique DiagnosticoFormulario053 to an array', () => {
        const diagnosticoFormulario053Array: IDiagnosticoFormulario053[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const diagnosticoFormulario053Collection: IDiagnosticoFormulario053[] = [sampleWithRequiredData];
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing(
          diagnosticoFormulario053Collection,
          ...diagnosticoFormulario053Array,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const diagnosticoFormulario053: IDiagnosticoFormulario053 = sampleWithRequiredData;
        const diagnosticoFormulario0532: IDiagnosticoFormulario053 = sampleWithPartialData;
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing([], diagnosticoFormulario053, diagnosticoFormulario0532);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(diagnosticoFormulario053);
        expect(expectedResult).toContain(diagnosticoFormulario0532);
      });

      it('should accept null and undefined values', () => {
        const diagnosticoFormulario053: IDiagnosticoFormulario053 = sampleWithRequiredData;
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing([], null, diagnosticoFormulario053, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(diagnosticoFormulario053);
      });

      it('should return initial array if no DiagnosticoFormulario053 is added', () => {
        const diagnosticoFormulario053Collection: IDiagnosticoFormulario053[] = [sampleWithRequiredData];
        expectedResult = service.addDiagnosticoFormulario053ToCollectionIfMissing(diagnosticoFormulario053Collection, undefined, null);
        expect(expectedResult).toEqual(diagnosticoFormulario053Collection);
      });
    });

    describe('compareDiagnosticoFormulario053', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDiagnosticoFormulario053(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDiagnosticoFormulario053(entity1, entity2);
        const compareResult2 = service.compareDiagnosticoFormulario053(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDiagnosticoFormulario053(entity1, entity2);
        const compareResult2 = service.compareDiagnosticoFormulario053(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDiagnosticoFormulario053(entity1, entity2);
        const compareResult2 = service.compareDiagnosticoFormulario053(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
