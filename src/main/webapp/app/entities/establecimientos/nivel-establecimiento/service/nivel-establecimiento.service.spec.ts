import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INivelEstablecimiento } from '../nivel-establecimiento.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../nivel-establecimiento.test-samples';

import { NivelEstablecimientoService } from './nivel-establecimiento.service';

const requireRestSample: INivelEstablecimiento = {
  ...sampleWithRequiredData,
};

describe('NivelEstablecimiento Service', () => {
  let service: NivelEstablecimientoService;
  let httpMock: HttpTestingController;
  let expectedResult: INivelEstablecimiento | INivelEstablecimiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NivelEstablecimientoService);
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

    it('should create a NivelEstablecimiento', () => {
      const nivelEstablecimiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(nivelEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NivelEstablecimiento', () => {
      const nivelEstablecimiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(nivelEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NivelEstablecimiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NivelEstablecimiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NivelEstablecimiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNivelEstablecimientoToCollectionIfMissing', () => {
      it('should add a NivelEstablecimiento to an empty array', () => {
        const nivelEstablecimiento: INivelEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing([], nivelEstablecimiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nivelEstablecimiento);
      });

      it('should not add a NivelEstablecimiento to an array that contains it', () => {
        const nivelEstablecimiento: INivelEstablecimiento = sampleWithRequiredData;
        const nivelEstablecimientoCollection: INivelEstablecimiento[] = [
          {
            ...nivelEstablecimiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing(nivelEstablecimientoCollection, nivelEstablecimiento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NivelEstablecimiento to an array that doesn't contain it", () => {
        const nivelEstablecimiento: INivelEstablecimiento = sampleWithRequiredData;
        const nivelEstablecimientoCollection: INivelEstablecimiento[] = [sampleWithPartialData];
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing(nivelEstablecimientoCollection, nivelEstablecimiento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nivelEstablecimiento);
      });

      it('should add only unique NivelEstablecimiento to an array', () => {
        const nivelEstablecimientoArray: INivelEstablecimiento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const nivelEstablecimientoCollection: INivelEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing(nivelEstablecimientoCollection, ...nivelEstablecimientoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nivelEstablecimiento: INivelEstablecimiento = sampleWithRequiredData;
        const nivelEstablecimiento2: INivelEstablecimiento = sampleWithPartialData;
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing([], nivelEstablecimiento, nivelEstablecimiento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nivelEstablecimiento);
        expect(expectedResult).toContain(nivelEstablecimiento2);
      });

      it('should accept null and undefined values', () => {
        const nivelEstablecimiento: INivelEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing([], null, nivelEstablecimiento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nivelEstablecimiento);
      });

      it('should return initial array if no NivelEstablecimiento is added', () => {
        const nivelEstablecimientoCollection: INivelEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addNivelEstablecimientoToCollectionIfMissing(nivelEstablecimientoCollection, undefined, null);
        expect(expectedResult).toEqual(nivelEstablecimientoCollection);
      });
    });

    describe('compareNivelEstablecimiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNivelEstablecimiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNivelEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareNivelEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNivelEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareNivelEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNivelEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareNivelEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
