import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICronograma } from '../cronograma.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cronograma.test-samples';

import { CronogramaService, RestCronograma } from './cronograma.service';

const requireRestSample: RestCronograma = {
  ...sampleWithRequiredData,
  fechaInicio: sampleWithRequiredData.fechaInicio?.format(DATE_FORMAT),
  fechaFin: sampleWithRequiredData.fechaFin?.format(DATE_FORMAT),
};

describe('Cronograma Service', () => {
  let service: CronogramaService;
  let httpMock: HttpTestingController;
  let expectedResult: ICronograma | ICronograma[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CronogramaService);
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

    it('should create a Cronograma', () => {
      const cronograma = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cronograma).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Cronograma', () => {
      const cronograma = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cronograma).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Cronograma', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Cronograma', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Cronograma', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCronogramaToCollectionIfMissing', () => {
      it('should add a Cronograma to an empty array', () => {
        const cronograma: ICronograma = sampleWithRequiredData;
        expectedResult = service.addCronogramaToCollectionIfMissing([], cronograma);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cronograma);
      });

      it('should not add a Cronograma to an array that contains it', () => {
        const cronograma: ICronograma = sampleWithRequiredData;
        const cronogramaCollection: ICronograma[] = [
          {
            ...cronograma,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCronogramaToCollectionIfMissing(cronogramaCollection, cronograma);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Cronograma to an array that doesn't contain it", () => {
        const cronograma: ICronograma = sampleWithRequiredData;
        const cronogramaCollection: ICronograma[] = [sampleWithPartialData];
        expectedResult = service.addCronogramaToCollectionIfMissing(cronogramaCollection, cronograma);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cronograma);
      });

      it('should add only unique Cronograma to an array', () => {
        const cronogramaArray: ICronograma[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cronogramaCollection: ICronograma[] = [sampleWithRequiredData];
        expectedResult = service.addCronogramaToCollectionIfMissing(cronogramaCollection, ...cronogramaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cronograma: ICronograma = sampleWithRequiredData;
        const cronograma2: ICronograma = sampleWithPartialData;
        expectedResult = service.addCronogramaToCollectionIfMissing([], cronograma, cronograma2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cronograma);
        expect(expectedResult).toContain(cronograma2);
      });

      it('should accept null and undefined values', () => {
        const cronograma: ICronograma = sampleWithRequiredData;
        expectedResult = service.addCronogramaToCollectionIfMissing([], null, cronograma, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cronograma);
      });

      it('should return initial array if no Cronograma is added', () => {
        const cronogramaCollection: ICronograma[] = [sampleWithRequiredData];
        expectedResult = service.addCronogramaToCollectionIfMissing(cronogramaCollection, undefined, null);
        expect(expectedResult).toEqual(cronogramaCollection);
      });
    });

    describe('compareCronograma', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCronograma(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCronograma(entity1, entity2);
        const compareResult2 = service.compareCronograma(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCronograma(entity1, entity2);
        const compareResult2 = service.compareCronograma(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCronograma(entity1, entity2);
        const compareResult2 = service.compareCronograma(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
