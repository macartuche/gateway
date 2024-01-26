import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../doctor-especialidad-establecimiento.test-samples';

import { DoctorEspecialidadEstablecimientoService } from './doctor-especialidad-establecimiento.service';

const requireRestSample: IDoctorEspecialidadEstablecimiento = {
  ...sampleWithRequiredData,
};

describe('DoctorEspecialidadEstablecimiento Service', () => {
  let service: DoctorEspecialidadEstablecimientoService;
  let httpMock: HttpTestingController;
  let expectedResult: IDoctorEspecialidadEstablecimiento | IDoctorEspecialidadEstablecimiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DoctorEspecialidadEstablecimientoService);
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

    it('should create a DoctorEspecialidadEstablecimiento', () => {
      const doctorEspecialidadEstablecimiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(doctorEspecialidadEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DoctorEspecialidadEstablecimiento', () => {
      const doctorEspecialidadEstablecimiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(doctorEspecialidadEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DoctorEspecialidadEstablecimiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DoctorEspecialidadEstablecimiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DoctorEspecialidadEstablecimiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDoctorEspecialidadEstablecimientoToCollectionIfMissing', () => {
      it('should add a DoctorEspecialidadEstablecimiento to an empty array', () => {
        const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing([], doctorEspecialidadEstablecimiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(doctorEspecialidadEstablecimiento);
      });

      it('should not add a DoctorEspecialidadEstablecimiento to an array that contains it', () => {
        const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = sampleWithRequiredData;
        const doctorEspecialidadEstablecimientoCollection: IDoctorEspecialidadEstablecimiento[] = [
          {
            ...doctorEspecialidadEstablecimiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing(
          doctorEspecialidadEstablecimientoCollection,
          doctorEspecialidadEstablecimiento,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DoctorEspecialidadEstablecimiento to an array that doesn't contain it", () => {
        const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = sampleWithRequiredData;
        const doctorEspecialidadEstablecimientoCollection: IDoctorEspecialidadEstablecimiento[] = [sampleWithPartialData];
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing(
          doctorEspecialidadEstablecimientoCollection,
          doctorEspecialidadEstablecimiento,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(doctorEspecialidadEstablecimiento);
      });

      it('should add only unique DoctorEspecialidadEstablecimiento to an array', () => {
        const doctorEspecialidadEstablecimientoArray: IDoctorEspecialidadEstablecimiento[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const doctorEspecialidadEstablecimientoCollection: IDoctorEspecialidadEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing(
          doctorEspecialidadEstablecimientoCollection,
          ...doctorEspecialidadEstablecimientoArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = sampleWithRequiredData;
        const doctorEspecialidadEstablecimiento2: IDoctorEspecialidadEstablecimiento = sampleWithPartialData;
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing(
          [],
          doctorEspecialidadEstablecimiento,
          doctorEspecialidadEstablecimiento2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(doctorEspecialidadEstablecimiento);
        expect(expectedResult).toContain(doctorEspecialidadEstablecimiento2);
      });

      it('should accept null and undefined values', () => {
        const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing(
          [],
          null,
          doctorEspecialidadEstablecimiento,
          undefined,
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(doctorEspecialidadEstablecimiento);
      });

      it('should return initial array if no DoctorEspecialidadEstablecimiento is added', () => {
        const doctorEspecialidadEstablecimientoCollection: IDoctorEspecialidadEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addDoctorEspecialidadEstablecimientoToCollectionIfMissing(
          doctorEspecialidadEstablecimientoCollection,
          undefined,
          null,
        );
        expect(expectedResult).toEqual(doctorEspecialidadEstablecimientoCollection);
      });
    });

    describe('compareDoctorEspecialidadEstablecimiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDoctorEspecialidadEstablecimiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDoctorEspecialidadEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareDoctorEspecialidadEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDoctorEspecialidadEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareDoctorEspecialidadEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDoctorEspecialidadEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareDoctorEspecialidadEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
