import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEstablecimientoFestivo } from '../establecimiento-festivo.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../establecimiento-festivo.test-samples';

import { EstablecimientoFestivoService } from './establecimiento-festivo.service';

const requireRestSample: IEstablecimientoFestivo = {
  ...sampleWithRequiredData,
};

describe('EstablecimientoFestivo Service', () => {
  let service: EstablecimientoFestivoService;
  let httpMock: HttpTestingController;
  let expectedResult: IEstablecimientoFestivo | IEstablecimientoFestivo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EstablecimientoFestivoService);
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

    it('should create a EstablecimientoFestivo', () => {
      const establecimientoFestivo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(establecimientoFestivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EstablecimientoFestivo', () => {
      const establecimientoFestivo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(establecimientoFestivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EstablecimientoFestivo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EstablecimientoFestivo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EstablecimientoFestivo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEstablecimientoFestivoToCollectionIfMissing', () => {
      it('should add a EstablecimientoFestivo to an empty array', () => {
        const establecimientoFestivo: IEstablecimientoFestivo = sampleWithRequiredData;
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing([], establecimientoFestivo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(establecimientoFestivo);
      });

      it('should not add a EstablecimientoFestivo to an array that contains it', () => {
        const establecimientoFestivo: IEstablecimientoFestivo = sampleWithRequiredData;
        const establecimientoFestivoCollection: IEstablecimientoFestivo[] = [
          {
            ...establecimientoFestivo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing(establecimientoFestivoCollection, establecimientoFestivo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EstablecimientoFestivo to an array that doesn't contain it", () => {
        const establecimientoFestivo: IEstablecimientoFestivo = sampleWithRequiredData;
        const establecimientoFestivoCollection: IEstablecimientoFestivo[] = [sampleWithPartialData];
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing(establecimientoFestivoCollection, establecimientoFestivo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(establecimientoFestivo);
      });

      it('should add only unique EstablecimientoFestivo to an array', () => {
        const establecimientoFestivoArray: IEstablecimientoFestivo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const establecimientoFestivoCollection: IEstablecimientoFestivo[] = [sampleWithRequiredData];
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing(
          establecimientoFestivoCollection,
          ...establecimientoFestivoArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const establecimientoFestivo: IEstablecimientoFestivo = sampleWithRequiredData;
        const establecimientoFestivo2: IEstablecimientoFestivo = sampleWithPartialData;
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing([], establecimientoFestivo, establecimientoFestivo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(establecimientoFestivo);
        expect(expectedResult).toContain(establecimientoFestivo2);
      });

      it('should accept null and undefined values', () => {
        const establecimientoFestivo: IEstablecimientoFestivo = sampleWithRequiredData;
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing([], null, establecimientoFestivo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(establecimientoFestivo);
      });

      it('should return initial array if no EstablecimientoFestivo is added', () => {
        const establecimientoFestivoCollection: IEstablecimientoFestivo[] = [sampleWithRequiredData];
        expectedResult = service.addEstablecimientoFestivoToCollectionIfMissing(establecimientoFestivoCollection, undefined, null);
        expect(expectedResult).toEqual(establecimientoFestivoCollection);
      });
    });

    describe('compareEstablecimientoFestivo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEstablecimientoFestivo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEstablecimientoFestivo(entity1, entity2);
        const compareResult2 = service.compareEstablecimientoFestivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEstablecimientoFestivo(entity1, entity2);
        const compareResult2 = service.compareEstablecimientoFestivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEstablecimientoFestivo(entity1, entity2);
        const compareResult2 = service.compareEstablecimientoFestivo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
