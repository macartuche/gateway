import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDocumentoTramite } from '../documento-tramite.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../documento-tramite.test-samples';

import { DocumentoTramiteService, RestDocumentoTramite } from './documento-tramite.service';

const requireRestSample: RestDocumentoTramite = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.format(DATE_FORMAT),
};

describe('DocumentoTramite Service', () => {
  let service: DocumentoTramiteService;
  let httpMock: HttpTestingController;
  let expectedResult: IDocumentoTramite | IDocumentoTramite[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DocumentoTramiteService);
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

    it('should create a DocumentoTramite', () => {
      const documentoTramite = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(documentoTramite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DocumentoTramite', () => {
      const documentoTramite = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(documentoTramite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DocumentoTramite', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DocumentoTramite', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DocumentoTramite', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDocumentoTramiteToCollectionIfMissing', () => {
      it('should add a DocumentoTramite to an empty array', () => {
        const documentoTramite: IDocumentoTramite = sampleWithRequiredData;
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing([], documentoTramite);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentoTramite);
      });

      it('should not add a DocumentoTramite to an array that contains it', () => {
        const documentoTramite: IDocumentoTramite = sampleWithRequiredData;
        const documentoTramiteCollection: IDocumentoTramite[] = [
          {
            ...documentoTramite,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing(documentoTramiteCollection, documentoTramite);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DocumentoTramite to an array that doesn't contain it", () => {
        const documentoTramite: IDocumentoTramite = sampleWithRequiredData;
        const documentoTramiteCollection: IDocumentoTramite[] = [sampleWithPartialData];
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing(documentoTramiteCollection, documentoTramite);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentoTramite);
      });

      it('should add only unique DocumentoTramite to an array', () => {
        const documentoTramiteArray: IDocumentoTramite[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const documentoTramiteCollection: IDocumentoTramite[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing(documentoTramiteCollection, ...documentoTramiteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const documentoTramite: IDocumentoTramite = sampleWithRequiredData;
        const documentoTramite2: IDocumentoTramite = sampleWithPartialData;
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing([], documentoTramite, documentoTramite2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentoTramite);
        expect(expectedResult).toContain(documentoTramite2);
      });

      it('should accept null and undefined values', () => {
        const documentoTramite: IDocumentoTramite = sampleWithRequiredData;
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing([], null, documentoTramite, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentoTramite);
      });

      it('should return initial array if no DocumentoTramite is added', () => {
        const documentoTramiteCollection: IDocumentoTramite[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentoTramiteToCollectionIfMissing(documentoTramiteCollection, undefined, null);
        expect(expectedResult).toEqual(documentoTramiteCollection);
      });
    });

    describe('compareDocumentoTramite', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDocumentoTramite(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDocumentoTramite(entity1, entity2);
        const compareResult2 = service.compareDocumentoTramite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDocumentoTramite(entity1, entity2);
        const compareResult2 = service.compareDocumentoTramite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDocumentoTramite(entity1, entity2);
        const compareResult2 = service.compareDocumentoTramite(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
