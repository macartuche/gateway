import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntidad } from '../entidad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../entidad.test-samples';

import { EntidadService } from './entidad.service';

const requireRestSample: IEntidad = {
  ...sampleWithRequiredData,
};

describe('Entidad Service', () => {
  let service: EntidadService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntidad | IEntidad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntidadService);
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

    it('should create a Entidad', () => {
      const entidad = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entidad).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Entidad', () => {
      const entidad = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entidad).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Entidad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Entidad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Entidad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntidadToCollectionIfMissing', () => {
      it('should add a Entidad to an empty array', () => {
        const entidad: IEntidad = sampleWithRequiredData;
        expectedResult = service.addEntidadToCollectionIfMissing([], entidad);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entidad);
      });

      it('should not add a Entidad to an array that contains it', () => {
        const entidad: IEntidad = sampleWithRequiredData;
        const entidadCollection: IEntidad[] = [
          {
            ...entidad,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntidadToCollectionIfMissing(entidadCollection, entidad);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Entidad to an array that doesn't contain it", () => {
        const entidad: IEntidad = sampleWithRequiredData;
        const entidadCollection: IEntidad[] = [sampleWithPartialData];
        expectedResult = service.addEntidadToCollectionIfMissing(entidadCollection, entidad);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entidad);
      });

      it('should add only unique Entidad to an array', () => {
        const entidadArray: IEntidad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const entidadCollection: IEntidad[] = [sampleWithRequiredData];
        expectedResult = service.addEntidadToCollectionIfMissing(entidadCollection, ...entidadArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entidad: IEntidad = sampleWithRequiredData;
        const entidad2: IEntidad = sampleWithPartialData;
        expectedResult = service.addEntidadToCollectionIfMissing([], entidad, entidad2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entidad);
        expect(expectedResult).toContain(entidad2);
      });

      it('should accept null and undefined values', () => {
        const entidad: IEntidad = sampleWithRequiredData;
        expectedResult = service.addEntidadToCollectionIfMissing([], null, entidad, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entidad);
      });

      it('should return initial array if no Entidad is added', () => {
        const entidadCollection: IEntidad[] = [sampleWithRequiredData];
        expectedResult = service.addEntidadToCollectionIfMissing(entidadCollection, undefined, null);
        expect(expectedResult).toEqual(entidadCollection);
      });
    });

    describe('compareEntidad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntidad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEntidad(entity1, entity2);
        const compareResult2 = service.compareEntidad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEntidad(entity1, entity2);
        const compareResult2 = service.compareEntidad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEntidad(entity1, entity2);
        const compareResult2 = service.compareEntidad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
