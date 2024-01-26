import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoEstablecimiento } from '../tipo-establecimiento.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tipo-establecimiento.test-samples';

import { TipoEstablecimientoService } from './tipo-establecimiento.service';

const requireRestSample: ITipoEstablecimiento = {
  ...sampleWithRequiredData,
};

describe('TipoEstablecimiento Service', () => {
  let service: TipoEstablecimientoService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoEstablecimiento | ITipoEstablecimiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoEstablecimientoService);
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

    it('should create a TipoEstablecimiento', () => {
      const tipoEstablecimiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoEstablecimiento', () => {
      const tipoEstablecimiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoEstablecimiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoEstablecimiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoEstablecimiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoEstablecimientoToCollectionIfMissing', () => {
      it('should add a TipoEstablecimiento to an empty array', () => {
        const tipoEstablecimiento: ITipoEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing([], tipoEstablecimiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoEstablecimiento);
      });

      it('should not add a TipoEstablecimiento to an array that contains it', () => {
        const tipoEstablecimiento: ITipoEstablecimiento = sampleWithRequiredData;
        const tipoEstablecimientoCollection: ITipoEstablecimiento[] = [
          {
            ...tipoEstablecimiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing(tipoEstablecimientoCollection, tipoEstablecimiento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoEstablecimiento to an array that doesn't contain it", () => {
        const tipoEstablecimiento: ITipoEstablecimiento = sampleWithRequiredData;
        const tipoEstablecimientoCollection: ITipoEstablecimiento[] = [sampleWithPartialData];
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing(tipoEstablecimientoCollection, tipoEstablecimiento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoEstablecimiento);
      });

      it('should add only unique TipoEstablecimiento to an array', () => {
        const tipoEstablecimientoArray: ITipoEstablecimiento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoEstablecimientoCollection: ITipoEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing(tipoEstablecimientoCollection, ...tipoEstablecimientoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoEstablecimiento: ITipoEstablecimiento = sampleWithRequiredData;
        const tipoEstablecimiento2: ITipoEstablecimiento = sampleWithPartialData;
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing([], tipoEstablecimiento, tipoEstablecimiento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoEstablecimiento);
        expect(expectedResult).toContain(tipoEstablecimiento2);
      });

      it('should accept null and undefined values', () => {
        const tipoEstablecimiento: ITipoEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing([], null, tipoEstablecimiento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoEstablecimiento);
      });

      it('should return initial array if no TipoEstablecimiento is added', () => {
        const tipoEstablecimientoCollection: ITipoEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addTipoEstablecimientoToCollectionIfMissing(tipoEstablecimientoCollection, undefined, null);
        expect(expectedResult).toEqual(tipoEstablecimientoCollection);
      });
    });

    describe('compareTipoEstablecimiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoEstablecimiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareTipoEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareTipoEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareTipoEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
