import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICitaMedica } from '../cita-medica.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cita-medica.test-samples';

import { CitaMedicaService, RestCitaMedica } from './cita-medica.service';

const requireRestSample: RestCitaMedica = {
  ...sampleWithRequiredData,
  fechaInicioAtencion: sampleWithRequiredData.fechaInicioAtencion?.format(DATE_FORMAT),
  fechaFinAtencion: sampleWithRequiredData.fechaFinAtencion?.format(DATE_FORMAT),
  horaInicioAtencion: sampleWithRequiredData.horaInicioAtencion?.toJSON(),
  horaFinAtencion: sampleWithRequiredData.horaFinAtencion?.toJSON(),
};

describe('CitaMedica Service', () => {
  let service: CitaMedicaService;
  let httpMock: HttpTestingController;
  let expectedResult: ICitaMedica | ICitaMedica[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CitaMedicaService);
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

    it('should create a CitaMedica', () => {
      const citaMedica = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(citaMedica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CitaMedica', () => {
      const citaMedica = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(citaMedica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CitaMedica', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CitaMedica', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CitaMedica', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCitaMedicaToCollectionIfMissing', () => {
      it('should add a CitaMedica to an empty array', () => {
        const citaMedica: ICitaMedica = sampleWithRequiredData;
        expectedResult = service.addCitaMedicaToCollectionIfMissing([], citaMedica);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(citaMedica);
      });

      it('should not add a CitaMedica to an array that contains it', () => {
        const citaMedica: ICitaMedica = sampleWithRequiredData;
        const citaMedicaCollection: ICitaMedica[] = [
          {
            ...citaMedica,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCitaMedicaToCollectionIfMissing(citaMedicaCollection, citaMedica);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CitaMedica to an array that doesn't contain it", () => {
        const citaMedica: ICitaMedica = sampleWithRequiredData;
        const citaMedicaCollection: ICitaMedica[] = [sampleWithPartialData];
        expectedResult = service.addCitaMedicaToCollectionIfMissing(citaMedicaCollection, citaMedica);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(citaMedica);
      });

      it('should add only unique CitaMedica to an array', () => {
        const citaMedicaArray: ICitaMedica[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const citaMedicaCollection: ICitaMedica[] = [sampleWithRequiredData];
        expectedResult = service.addCitaMedicaToCollectionIfMissing(citaMedicaCollection, ...citaMedicaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const citaMedica: ICitaMedica = sampleWithRequiredData;
        const citaMedica2: ICitaMedica = sampleWithPartialData;
        expectedResult = service.addCitaMedicaToCollectionIfMissing([], citaMedica, citaMedica2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(citaMedica);
        expect(expectedResult).toContain(citaMedica2);
      });

      it('should accept null and undefined values', () => {
        const citaMedica: ICitaMedica = sampleWithRequiredData;
        expectedResult = service.addCitaMedicaToCollectionIfMissing([], null, citaMedica, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(citaMedica);
      });

      it('should return initial array if no CitaMedica is added', () => {
        const citaMedicaCollection: ICitaMedica[] = [sampleWithRequiredData];
        expectedResult = service.addCitaMedicaToCollectionIfMissing(citaMedicaCollection, undefined, null);
        expect(expectedResult).toEqual(citaMedicaCollection);
      });
    });

    describe('compareCitaMedica', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCitaMedica(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCitaMedica(entity1, entity2);
        const compareResult2 = service.compareCitaMedica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCitaMedica(entity1, entity2);
        const compareResult2 = service.compareCitaMedica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCitaMedica(entity1, entity2);
        const compareResult2 = service.compareCitaMedica(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
