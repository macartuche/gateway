import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFirmaDigital } from '../firma-digital.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../firma-digital.test-samples';

import { FirmaDigitalService, RestFirmaDigital } from './firma-digital.service';

const requireRestSample: RestFirmaDigital = {
  ...sampleWithRequiredData,
  fechaDesde: sampleWithRequiredData.fechaDesde?.format(DATE_FORMAT),
  fechaHasta: sampleWithRequiredData.fechaHasta?.format(DATE_FORMAT),
};

describe('FirmaDigital Service', () => {
  let service: FirmaDigitalService;
  let httpMock: HttpTestingController;
  let expectedResult: IFirmaDigital | IFirmaDigital[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FirmaDigitalService);
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

    it('should create a FirmaDigital', () => {
      const firmaDigital = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(firmaDigital).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FirmaDigital', () => {
      const firmaDigital = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(firmaDigital).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FirmaDigital', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FirmaDigital', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FirmaDigital', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFirmaDigitalToCollectionIfMissing', () => {
      it('should add a FirmaDigital to an empty array', () => {
        const firmaDigital: IFirmaDigital = sampleWithRequiredData;
        expectedResult = service.addFirmaDigitalToCollectionIfMissing([], firmaDigital);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(firmaDigital);
      });

      it('should not add a FirmaDigital to an array that contains it', () => {
        const firmaDigital: IFirmaDigital = sampleWithRequiredData;
        const firmaDigitalCollection: IFirmaDigital[] = [
          {
            ...firmaDigital,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFirmaDigitalToCollectionIfMissing(firmaDigitalCollection, firmaDigital);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FirmaDigital to an array that doesn't contain it", () => {
        const firmaDigital: IFirmaDigital = sampleWithRequiredData;
        const firmaDigitalCollection: IFirmaDigital[] = [sampleWithPartialData];
        expectedResult = service.addFirmaDigitalToCollectionIfMissing(firmaDigitalCollection, firmaDigital);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(firmaDigital);
      });

      it('should add only unique FirmaDigital to an array', () => {
        const firmaDigitalArray: IFirmaDigital[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const firmaDigitalCollection: IFirmaDigital[] = [sampleWithRequiredData];
        expectedResult = service.addFirmaDigitalToCollectionIfMissing(firmaDigitalCollection, ...firmaDigitalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const firmaDigital: IFirmaDigital = sampleWithRequiredData;
        const firmaDigital2: IFirmaDigital = sampleWithPartialData;
        expectedResult = service.addFirmaDigitalToCollectionIfMissing([], firmaDigital, firmaDigital2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(firmaDigital);
        expect(expectedResult).toContain(firmaDigital2);
      });

      it('should accept null and undefined values', () => {
        const firmaDigital: IFirmaDigital = sampleWithRequiredData;
        expectedResult = service.addFirmaDigitalToCollectionIfMissing([], null, firmaDigital, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(firmaDigital);
      });

      it('should return initial array if no FirmaDigital is added', () => {
        const firmaDigitalCollection: IFirmaDigital[] = [sampleWithRequiredData];
        expectedResult = service.addFirmaDigitalToCollectionIfMissing(firmaDigitalCollection, undefined, null);
        expect(expectedResult).toEqual(firmaDigitalCollection);
      });
    });

    describe('compareFirmaDigital', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFirmaDigital(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFirmaDigital(entity1, entity2);
        const compareResult2 = service.compareFirmaDigital(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFirmaDigital(entity1, entity2);
        const compareResult2 = service.compareFirmaDigital(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFirmaDigital(entity1, entity2);
        const compareResult2 = service.compareFirmaDigital(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
