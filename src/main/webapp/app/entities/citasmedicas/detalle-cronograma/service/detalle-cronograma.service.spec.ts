import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDetalleCronograma } from '../detalle-cronograma.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../detalle-cronograma.test-samples';

import { DetalleCronogramaService, RestDetalleCronograma } from './detalle-cronograma.service';

const requireRestSample: RestDetalleCronograma = {
  ...sampleWithRequiredData,
  fecha: sampleWithRequiredData.fecha?.format(DATE_FORMAT),
  fechaDesactivacion: sampleWithRequiredData.fechaDesactivacion?.format(DATE_FORMAT),
};

describe('DetalleCronograma Service', () => {
  let service: DetalleCronogramaService;
  let httpMock: HttpTestingController;
  let expectedResult: IDetalleCronograma | IDetalleCronograma[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DetalleCronogramaService);
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

    it('should create a DetalleCronograma', () => {
      const detalleCronograma = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(detalleCronograma).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DetalleCronograma', () => {
      const detalleCronograma = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(detalleCronograma).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DetalleCronograma', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DetalleCronograma', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DetalleCronograma', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDetalleCronogramaToCollectionIfMissing', () => {
      it('should add a DetalleCronograma to an empty array', () => {
        const detalleCronograma: IDetalleCronograma = sampleWithRequiredData;
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing([], detalleCronograma);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(detalleCronograma);
      });

      it('should not add a DetalleCronograma to an array that contains it', () => {
        const detalleCronograma: IDetalleCronograma = sampleWithRequiredData;
        const detalleCronogramaCollection: IDetalleCronograma[] = [
          {
            ...detalleCronograma,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing(detalleCronogramaCollection, detalleCronograma);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DetalleCronograma to an array that doesn't contain it", () => {
        const detalleCronograma: IDetalleCronograma = sampleWithRequiredData;
        const detalleCronogramaCollection: IDetalleCronograma[] = [sampleWithPartialData];
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing(detalleCronogramaCollection, detalleCronograma);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(detalleCronograma);
      });

      it('should add only unique DetalleCronograma to an array', () => {
        const detalleCronogramaArray: IDetalleCronograma[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const detalleCronogramaCollection: IDetalleCronograma[] = [sampleWithRequiredData];
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing(detalleCronogramaCollection, ...detalleCronogramaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const detalleCronograma: IDetalleCronograma = sampleWithRequiredData;
        const detalleCronograma2: IDetalleCronograma = sampleWithPartialData;
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing([], detalleCronograma, detalleCronograma2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(detalleCronograma);
        expect(expectedResult).toContain(detalleCronograma2);
      });

      it('should accept null and undefined values', () => {
        const detalleCronograma: IDetalleCronograma = sampleWithRequiredData;
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing([], null, detalleCronograma, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(detalleCronograma);
      });

      it('should return initial array if no DetalleCronograma is added', () => {
        const detalleCronogramaCollection: IDetalleCronograma[] = [sampleWithRequiredData];
        expectedResult = service.addDetalleCronogramaToCollectionIfMissing(detalleCronogramaCollection, undefined, null);
        expect(expectedResult).toEqual(detalleCronogramaCollection);
      });
    });

    describe('compareDetalleCronograma', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDetalleCronograma(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDetalleCronograma(entity1, entity2);
        const compareResult2 = service.compareDetalleCronograma(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDetalleCronograma(entity1, entity2);
        const compareResult2 = service.compareDetalleCronograma(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDetalleCronograma(entity1, entity2);
        const compareResult2 = service.compareDetalleCronograma(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
