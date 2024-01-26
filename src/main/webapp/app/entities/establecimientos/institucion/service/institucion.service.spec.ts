import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInstitucion } from '../institucion.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../institucion.test-samples';

import { InstitucionService } from './institucion.service';

const requireRestSample: IInstitucion = {
  ...sampleWithRequiredData,
};

describe('Institucion Service', () => {
  let service: InstitucionService;
  let httpMock: HttpTestingController;
  let expectedResult: IInstitucion | IInstitucion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InstitucionService);
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

    it('should create a Institucion', () => {
      const institucion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(institucion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Institucion', () => {
      const institucion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(institucion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Institucion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Institucion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Institucion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInstitucionToCollectionIfMissing', () => {
      it('should add a Institucion to an empty array', () => {
        const institucion: IInstitucion = sampleWithRequiredData;
        expectedResult = service.addInstitucionToCollectionIfMissing([], institucion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institucion);
      });

      it('should not add a Institucion to an array that contains it', () => {
        const institucion: IInstitucion = sampleWithRequiredData;
        const institucionCollection: IInstitucion[] = [
          {
            ...institucion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInstitucionToCollectionIfMissing(institucionCollection, institucion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Institucion to an array that doesn't contain it", () => {
        const institucion: IInstitucion = sampleWithRequiredData;
        const institucionCollection: IInstitucion[] = [sampleWithPartialData];
        expectedResult = service.addInstitucionToCollectionIfMissing(institucionCollection, institucion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institucion);
      });

      it('should add only unique Institucion to an array', () => {
        const institucionArray: IInstitucion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const institucionCollection: IInstitucion[] = [sampleWithRequiredData];
        expectedResult = service.addInstitucionToCollectionIfMissing(institucionCollection, ...institucionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const institucion: IInstitucion = sampleWithRequiredData;
        const institucion2: IInstitucion = sampleWithPartialData;
        expectedResult = service.addInstitucionToCollectionIfMissing([], institucion, institucion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(institucion);
        expect(expectedResult).toContain(institucion2);
      });

      it('should accept null and undefined values', () => {
        const institucion: IInstitucion = sampleWithRequiredData;
        expectedResult = service.addInstitucionToCollectionIfMissing([], null, institucion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(institucion);
      });

      it('should return initial array if no Institucion is added', () => {
        const institucionCollection: IInstitucion[] = [sampleWithRequiredData];
        expectedResult = service.addInstitucionToCollectionIfMissing(institucionCollection, undefined, null);
        expect(expectedResult).toEqual(institucionCollection);
      });
    });

    describe('compareInstitucion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareInstitucion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareInstitucion(entity1, entity2);
        const compareResult2 = service.compareInstitucion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareInstitucion(entity1, entity2);
        const compareResult2 = service.compareInstitucion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareInstitucion(entity1, entity2);
        const compareResult2 = service.compareInstitucion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
