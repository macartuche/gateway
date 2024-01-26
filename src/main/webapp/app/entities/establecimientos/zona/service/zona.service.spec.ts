import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IZona } from '../zona.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../zona.test-samples';

import { ZonaService } from './zona.service';

const requireRestSample: IZona = {
  ...sampleWithRequiredData,
};

describe('Zona Service', () => {
  let service: ZonaService;
  let httpMock: HttpTestingController;
  let expectedResult: IZona | IZona[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ZonaService);
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

    it('should create a Zona', () => {
      const zona = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(zona).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Zona', () => {
      const zona = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(zona).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Zona', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Zona', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Zona', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addZonaToCollectionIfMissing', () => {
      it('should add a Zona to an empty array', () => {
        const zona: IZona = sampleWithRequiredData;
        expectedResult = service.addZonaToCollectionIfMissing([], zona);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(zona);
      });

      it('should not add a Zona to an array that contains it', () => {
        const zona: IZona = sampleWithRequiredData;
        const zonaCollection: IZona[] = [
          {
            ...zona,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addZonaToCollectionIfMissing(zonaCollection, zona);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Zona to an array that doesn't contain it", () => {
        const zona: IZona = sampleWithRequiredData;
        const zonaCollection: IZona[] = [sampleWithPartialData];
        expectedResult = service.addZonaToCollectionIfMissing(zonaCollection, zona);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(zona);
      });

      it('should add only unique Zona to an array', () => {
        const zonaArray: IZona[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const zonaCollection: IZona[] = [sampleWithRequiredData];
        expectedResult = service.addZonaToCollectionIfMissing(zonaCollection, ...zonaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const zona: IZona = sampleWithRequiredData;
        const zona2: IZona = sampleWithPartialData;
        expectedResult = service.addZonaToCollectionIfMissing([], zona, zona2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(zona);
        expect(expectedResult).toContain(zona2);
      });

      it('should accept null and undefined values', () => {
        const zona: IZona = sampleWithRequiredData;
        expectedResult = service.addZonaToCollectionIfMissing([], null, zona, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(zona);
      });

      it('should return initial array if no Zona is added', () => {
        const zonaCollection: IZona[] = [sampleWithRequiredData];
        expectedResult = service.addZonaToCollectionIfMissing(zonaCollection, undefined, null);
        expect(expectedResult).toEqual(zonaCollection);
      });
    });

    describe('compareZona', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareZona(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareZona(entity1, entity2);
        const compareResult2 = service.compareZona(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareZona(entity1, entity2);
        const compareResult2 = service.compareZona(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareZona(entity1, entity2);
        const compareResult2 = service.compareZona(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
