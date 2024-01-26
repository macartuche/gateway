import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFestivo } from '../festivo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../festivo.test-samples';

import { FestivoService, RestFestivo } from './festivo.service';

const requireRestSample: RestFestivo = {
  ...sampleWithRequiredData,
  fechaInicio: sampleWithRequiredData.fechaInicio?.format(DATE_FORMAT),
  fechaFin: sampleWithRequiredData.fechaFin?.format(DATE_FORMAT),
};

describe('Festivo Service', () => {
  let service: FestivoService;
  let httpMock: HttpTestingController;
  let expectedResult: IFestivo | IFestivo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FestivoService);
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

    it('should create a Festivo', () => {
      const festivo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(festivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Festivo', () => {
      const festivo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(festivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Festivo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Festivo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Festivo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFestivoToCollectionIfMissing', () => {
      it('should add a Festivo to an empty array', () => {
        const festivo: IFestivo = sampleWithRequiredData;
        expectedResult = service.addFestivoToCollectionIfMissing([], festivo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(festivo);
      });

      it('should not add a Festivo to an array that contains it', () => {
        const festivo: IFestivo = sampleWithRequiredData;
        const festivoCollection: IFestivo[] = [
          {
            ...festivo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFestivoToCollectionIfMissing(festivoCollection, festivo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Festivo to an array that doesn't contain it", () => {
        const festivo: IFestivo = sampleWithRequiredData;
        const festivoCollection: IFestivo[] = [sampleWithPartialData];
        expectedResult = service.addFestivoToCollectionIfMissing(festivoCollection, festivo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(festivo);
      });

      it('should add only unique Festivo to an array', () => {
        const festivoArray: IFestivo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const festivoCollection: IFestivo[] = [sampleWithRequiredData];
        expectedResult = service.addFestivoToCollectionIfMissing(festivoCollection, ...festivoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const festivo: IFestivo = sampleWithRequiredData;
        const festivo2: IFestivo = sampleWithPartialData;
        expectedResult = service.addFestivoToCollectionIfMissing([], festivo, festivo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(festivo);
        expect(expectedResult).toContain(festivo2);
      });

      it('should accept null and undefined values', () => {
        const festivo: IFestivo = sampleWithRequiredData;
        expectedResult = service.addFestivoToCollectionIfMissing([], null, festivo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(festivo);
      });

      it('should return initial array if no Festivo is added', () => {
        const festivoCollection: IFestivo[] = [sampleWithRequiredData];
        expectedResult = service.addFestivoToCollectionIfMissing(festivoCollection, undefined, null);
        expect(expectedResult).toEqual(festivoCollection);
      });
    });

    describe('compareFestivo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFestivo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFestivo(entity1, entity2);
        const compareResult2 = service.compareFestivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFestivo(entity1, entity2);
        const compareResult2 = service.compareFestivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFestivo(entity1, entity2);
        const compareResult2 = service.compareFestivo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
