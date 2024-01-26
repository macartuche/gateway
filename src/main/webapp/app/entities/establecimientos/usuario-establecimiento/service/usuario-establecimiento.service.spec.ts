import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUsuarioEstablecimiento } from '../usuario-establecimiento.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../usuario-establecimiento.test-samples';

import { UsuarioEstablecimientoService } from './usuario-establecimiento.service';

const requireRestSample: IUsuarioEstablecimiento = {
  ...sampleWithRequiredData,
};

describe('UsuarioEstablecimiento Service', () => {
  let service: UsuarioEstablecimientoService;
  let httpMock: HttpTestingController;
  let expectedResult: IUsuarioEstablecimiento | IUsuarioEstablecimiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuarioEstablecimientoService);
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

    it('should create a UsuarioEstablecimiento', () => {
      const usuarioEstablecimiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(usuarioEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UsuarioEstablecimiento', () => {
      const usuarioEstablecimiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(usuarioEstablecimiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UsuarioEstablecimiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UsuarioEstablecimiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UsuarioEstablecimiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUsuarioEstablecimientoToCollectionIfMissing', () => {
      it('should add a UsuarioEstablecimiento to an empty array', () => {
        const usuarioEstablecimiento: IUsuarioEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing([], usuarioEstablecimiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioEstablecimiento);
      });

      it('should not add a UsuarioEstablecimiento to an array that contains it', () => {
        const usuarioEstablecimiento: IUsuarioEstablecimiento = sampleWithRequiredData;
        const usuarioEstablecimientoCollection: IUsuarioEstablecimiento[] = [
          {
            ...usuarioEstablecimiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing(usuarioEstablecimientoCollection, usuarioEstablecimiento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UsuarioEstablecimiento to an array that doesn't contain it", () => {
        const usuarioEstablecimiento: IUsuarioEstablecimiento = sampleWithRequiredData;
        const usuarioEstablecimientoCollection: IUsuarioEstablecimiento[] = [sampleWithPartialData];
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing(usuarioEstablecimientoCollection, usuarioEstablecimiento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioEstablecimiento);
      });

      it('should add only unique UsuarioEstablecimiento to an array', () => {
        const usuarioEstablecimientoArray: IUsuarioEstablecimiento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const usuarioEstablecimientoCollection: IUsuarioEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing(
          usuarioEstablecimientoCollection,
          ...usuarioEstablecimientoArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuarioEstablecimiento: IUsuarioEstablecimiento = sampleWithRequiredData;
        const usuarioEstablecimiento2: IUsuarioEstablecimiento = sampleWithPartialData;
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing([], usuarioEstablecimiento, usuarioEstablecimiento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioEstablecimiento);
        expect(expectedResult).toContain(usuarioEstablecimiento2);
      });

      it('should accept null and undefined values', () => {
        const usuarioEstablecimiento: IUsuarioEstablecimiento = sampleWithRequiredData;
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing([], null, usuarioEstablecimiento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioEstablecimiento);
      });

      it('should return initial array if no UsuarioEstablecimiento is added', () => {
        const usuarioEstablecimientoCollection: IUsuarioEstablecimiento[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioEstablecimientoToCollectionIfMissing(usuarioEstablecimientoCollection, undefined, null);
        expect(expectedResult).toEqual(usuarioEstablecimientoCollection);
      });
    });

    describe('compareUsuarioEstablecimiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUsuarioEstablecimiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUsuarioEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareUsuarioEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUsuarioEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareUsuarioEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUsuarioEstablecimiento(entity1, entity2);
        const compareResult2 = service.compareUsuarioEstablecimiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
