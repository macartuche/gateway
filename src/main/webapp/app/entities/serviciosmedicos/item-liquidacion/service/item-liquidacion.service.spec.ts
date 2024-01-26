import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IItemLiquidacion } from '../item-liquidacion.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../item-liquidacion.test-samples';

import { ItemLiquidacionService, RestItemLiquidacion } from './item-liquidacion.service';

const requireRestSample: RestItemLiquidacion = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.format(DATE_FORMAT),
};

describe('ItemLiquidacion Service', () => {
  let service: ItemLiquidacionService;
  let httpMock: HttpTestingController;
  let expectedResult: IItemLiquidacion | IItemLiquidacion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItemLiquidacionService);
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

    it('should create a ItemLiquidacion', () => {
      const itemLiquidacion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(itemLiquidacion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItemLiquidacion', () => {
      const itemLiquidacion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(itemLiquidacion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ItemLiquidacion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItemLiquidacion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ItemLiquidacion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addItemLiquidacionToCollectionIfMissing', () => {
      it('should add a ItemLiquidacion to an empty array', () => {
        const itemLiquidacion: IItemLiquidacion = sampleWithRequiredData;
        expectedResult = service.addItemLiquidacionToCollectionIfMissing([], itemLiquidacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemLiquidacion);
      });

      it('should not add a ItemLiquidacion to an array that contains it', () => {
        const itemLiquidacion: IItemLiquidacion = sampleWithRequiredData;
        const itemLiquidacionCollection: IItemLiquidacion[] = [
          {
            ...itemLiquidacion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItemLiquidacionToCollectionIfMissing(itemLiquidacionCollection, itemLiquidacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItemLiquidacion to an array that doesn't contain it", () => {
        const itemLiquidacion: IItemLiquidacion = sampleWithRequiredData;
        const itemLiquidacionCollection: IItemLiquidacion[] = [sampleWithPartialData];
        expectedResult = service.addItemLiquidacionToCollectionIfMissing(itemLiquidacionCollection, itemLiquidacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemLiquidacion);
      });

      it('should add only unique ItemLiquidacion to an array', () => {
        const itemLiquidacionArray: IItemLiquidacion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const itemLiquidacionCollection: IItemLiquidacion[] = [sampleWithRequiredData];
        expectedResult = service.addItemLiquidacionToCollectionIfMissing(itemLiquidacionCollection, ...itemLiquidacionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itemLiquidacion: IItemLiquidacion = sampleWithRequiredData;
        const itemLiquidacion2: IItemLiquidacion = sampleWithPartialData;
        expectedResult = service.addItemLiquidacionToCollectionIfMissing([], itemLiquidacion, itemLiquidacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itemLiquidacion);
        expect(expectedResult).toContain(itemLiquidacion2);
      });

      it('should accept null and undefined values', () => {
        const itemLiquidacion: IItemLiquidacion = sampleWithRequiredData;
        expectedResult = service.addItemLiquidacionToCollectionIfMissing([], null, itemLiquidacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itemLiquidacion);
      });

      it('should return initial array if no ItemLiquidacion is added', () => {
        const itemLiquidacionCollection: IItemLiquidacion[] = [sampleWithRequiredData];
        expectedResult = service.addItemLiquidacionToCollectionIfMissing(itemLiquidacionCollection, undefined, null);
        expect(expectedResult).toEqual(itemLiquidacionCollection);
      });
    });

    describe('compareItemLiquidacion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItemLiquidacion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareItemLiquidacion(entity1, entity2);
        const compareResult2 = service.compareItemLiquidacion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareItemLiquidacion(entity1, entity2);
        const compareResult2 = service.compareItemLiquidacion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareItemLiquidacion(entity1, entity2);
        const compareResult2 = service.compareItemLiquidacion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
