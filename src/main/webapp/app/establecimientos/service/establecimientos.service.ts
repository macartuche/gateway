/* eslint-disable no-console */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import {
  CantonArbol,
  CircuitoArbol,
  DistritoArbol,
  EstablecimientoArbol,
  ParroquiaArbol,
  ProvinciaArbol,
  ZonaArbol,
  ZonaArbolResponse,
} from '../zona-arbol-response.model';
import { lastValueFrom } from 'rxjs';
import { TiposUbicacion } from 'app/config/constantes';
import { ComunResponse } from 'app/shared/model/comun-response.model';
import { CatalogoItemsListadoResponse } from 'app/shared/model/catalogo-items-listado-response.model';
import { EntidadesListadoResponse } from 'app/shared/model/entidades-listado-response.model';
import { InstitucionesListadoResponse } from 'app/shared/model/instituciones-listado-response.model';
import { IZona } from 'app/entities/zona/zona.model';
import { IProvincia } from 'app/entities/provincia/provincia.model';
import { IDistrito } from 'app/entities/distrito/distrito.model';
import { ICanton } from 'app/entities/canton/canton.model';
import { ICircuito } from 'app/entities/circuito/circuito.model';
import { IParroquia } from 'app/entities/parroquia/parroquia.model';
import { IEstablecimiento } from 'app/entities/establecimiento/establecimiento.model';
import { IZonaRespuesta } from 'app/shared/model/zona-respuesta.model';
import { IProvinciaRespuesta } from 'app/shared/model/provincia-respuesta.model';
import { IDistritoResponse } from 'app/shared/model/distrito-respuesta.model';
import { ICantonResponse } from 'app/shared/model/canton-respuesta.model';
import { ICircuitoResponse } from 'app/shared/model/circuito-respuesta.model';
import { IParroquiaResponse } from 'app/shared/model/parroquia-respuesta.model';
import { INivelesEstablecimientoRespuesta } from 'app/shared/model/niveles-respuesta.model';
import { ITiposEstablecimientoRespuesta } from 'app/shared/model/tipos-establecimiento-respuesta.model';
import { IHorariosEstablecimientoRespuesta } from 'app/shared/model/horarios-establecimiento-respuesta.model';
import { createRequestOption } from 'app/core/request/request-util';

@Injectable({ providedIn: 'root' })
export class EstablecimientosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  async obtenerArbolEstablecimientos(): Promise<HttpResponse<ZonaArbolResponse>> {
    const data = this.http.get<ZonaArbolResponse>(`${this.resourceUrl}/obtener-arbol-establecimientos`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearZona(zona: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-zona`, zona, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarZona(zona: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-zona`, zona, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearProvincia(provincia: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-provincia`, provincia, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarProvincia(provincia: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-provincia`, provincia, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearDistrito(distrito: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-distrito`, distrito, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarDistrito(distrito: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-distrito`, distrito, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearCanton(canton: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-canton`, canton, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarCanton(canton: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-canton`, canton, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearCircuito(circuito: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-circuito`, circuito, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarCircuito(canton: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-circuito`, canton, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearParroquia(parroquia: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-parroquia`, parroquia, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarParroquia(parroquia: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-parroquia`, parroquia, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async crearEstablecimiento(establecimiento: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/crear-establecimiento`, establecimiento, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async editarEstablecimiento(establecimiento: any): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/editar-establecimiento`, establecimiento, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerTiposParroquia(): Promise<HttpResponse<CatalogoItemsListadoResponse>> {
    const data = this.http.get<CatalogoItemsListadoResponse>(`${this.resourceUrl}/obtener-tipos-parroquia`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerTiposEstablecimiento(): Promise<HttpResponse<CatalogoItemsListadoResponse>> {
    const data = this.http.get<CatalogoItemsListadoResponse>(`${this.resourceUrl}/obtener-tipos-establecimiento`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerNivelesEstablecimiento(): Promise<HttpResponse<CatalogoItemsListadoResponse>> {
    const data = this.http.get<CatalogoItemsListadoResponse>(`${this.resourceUrl}/obtener-niveles-establecimiento`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerAmbito(): Promise<HttpResponse<CatalogoItemsListadoResponse>> {
    const data = this.http.get<CatalogoItemsListadoResponse>(`${this.resourceUrl}/obtener-ambito-establecimiento`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerEstidadesListado(): Promise<HttpResponse<EntidadesListadoResponse>> {
    const data = this.http.get<EntidadesListadoResponse>(`${this.resourceUrl}/obtener-todas-entidades`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerInstitucionesListado(): Promise<HttpResponse<InstitucionesListadoResponse>> {
    const data = this.http.get<InstitucionesListadoResponse>(`${this.resourceUrl}/obtener-todas-instituciones`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerTipoEspecialidades(): Promise<HttpResponse<CatalogoItemsListadoResponse>> {
    const data = this.http.get<CatalogoItemsListadoResponse>(`${this.resourceUrl}/items-tipo-especialidades`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerZonaPorId(id: number): Promise<HttpResponse<IZona>> {
    const data = this.http.get<IZona>(`${this.applicationConfigService.getEndpointFor('api/zonas')}/${id}`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerProvinciaPorId(id: number): Promise<HttpResponse<IProvincia>> {
    const data = this.http.get<IProvincia>(`${this.applicationConfigService.getEndpointFor('api/provincias')}/${id}`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerDistritoPorId(id: number): Promise<HttpResponse<IDistrito>> {
    const data = this.http.get<IDistrito>(`${this.applicationConfigService.getEndpointFor('api/distritos')}/${id}`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerCantonPorId(id: number): Promise<HttpResponse<ICanton>> {
    const data = this.http.get<ICanton>(`${this.applicationConfigService.getEndpointFor('api/cantons')}/${id}`, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerCircuitoPorId(id: number): Promise<HttpResponse<ICircuito>> {
    const data = this.http.get<ICircuito>(`${this.applicationConfigService.getEndpointFor('api/circuitos')}/${id}`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerParroquiaPorId(id: number): Promise<HttpResponse<IParroquia>> {
    const data = this.http.get<IParroquia>(`${this.applicationConfigService.getEndpointFor('api/parroquias')}/${id}`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerEstablecimientoPorId(id: number): Promise<HttpResponse<IEstablecimiento>> {
    const data = this.http.get<IEstablecimiento>(`${this.applicationConfigService.getEndpointFor('api/establecimientos')}/${id}`, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  obtenerArbol(zonas: ZonaArbol[]): any[] {
    return [
      {
        nombre: 'Zonas',
        esTitulo: true,
        tipo: TiposUbicacion.ZONA,
        padre: null,
        id: 'zona_0000',
        children: this.construirZonas(zonas),
      },
    ];
  }

  construirZonas(zonas: ZonaArbol[]): any[] {
    let zonasLista: any[] = [];
    for (let index = 0; index < zonas.length; index++) {
      const zona = zonas[index];
      zonasLista = [
        ...zonasLista,
        {
          nombre: zona.nombre,
          esTitulo: false,
          padre: null,
          id: `zona_${zona.id}`,
          idBD: zona.id,
          tipo: TiposUbicacion.ZONA,
          children: this.construirProvincias(zona.provincias, zona),
        },
      ];
    }
    return zonasLista;
  }

  construirProvincias(provincias: ProvinciaArbol[], padre: ZonaArbol): any[] {
    let provinciasLista: any[] = [];
    for (let index = 0; index < provincias.length; index++) {
      const provincia = provincias[index];
      provinciasLista = [
        ...provinciasLista,
        {
          nombre: provincia.nombre,
          esTitulo: false,
          children: this.construirDistritos(provincia.distritos, provincia),
          padre,
          id: `provincia_${provincia.id}`,
          idBD: provincia.id,
          tipo: TiposUbicacion.PROVINCIA,
        },
      ];
    }
    return [
      { nombre: 'Provincias', id: `provincia_0000`, padre, tipo: TiposUbicacion.PROVINCIA, esTitulo: true, children: provinciasLista },
    ];
  }

  construirDistritos(distritos: DistritoArbol[], padre: ProvinciaArbol): any[] {
    let distritosLista: any[] = [];
    for (let index = 0; index < distritos.length; index++) {
      const distrito = distritos[index];
      distritosLista = [
        ...distritosLista,
        {
          nombre: distrito.nombre,
          esTitulo: false,
          padre,
          children: this.construirCantones(distrito.cantones, distrito),
          id: `distrito_${distrito.id}`,
          tipo: TiposUbicacion.DISTRITO,
          idBD: distrito.id,
        },
      ];
    }
    return [{ nombre: 'Distritos', id: `distrito_0000`, padre, tipo: TiposUbicacion.DISTRITO, esTitulo: true, children: distritosLista }];
  }

  construirCantones(cantones: CantonArbol[], padre: DistritoArbol): any[] {
    let cantonesLista: any[] = [];
    for (let index = 0; index < cantones.length; index++) {
      const canton = cantones[index];
      cantonesLista = [
        ...cantonesLista,
        {
          nombre: canton.nombre,
          esTitulo: false,
          padre,
          children: this.construirCircuitos(canton.circuitos, canton),
          id: `canton_${canton.id}`,
          idBD: canton.id,
          tipo: TiposUbicacion.CANTON,
        },
      ];
    }
    return [{ nombre: 'Cantones', id: `canton_0000`, padre, tipo: TiposUbicacion.CANTON, esTitulo: true, children: cantonesLista }];
  }

  construirCircuitos(circuitos: CircuitoArbol[], padre: CantonArbol): any[] {
    let circuitosLista: any[] = [];
    for (let index = 0; index < circuitos.length; index++) {
      const circuito = circuitos[index];
      circuitosLista = [
        ...circuitosLista,
        {
          nombre: circuito.nombre,
          esTitulo: false,
          padre,
          children: this.construidParroquias(circuito.parroquias, circuito),
          id: `circuito_${circuito.id}`,
          idBD: circuito.id,
          tipo: TiposUbicacion.CIRCUITO,
        },
      ];
    }
    return [{ nombre: 'Circuitos', id: `circuito_0000`, padre, tipo: TiposUbicacion.CIRCUITO, esTitulo: true, children: circuitosLista }];
  }

  construidParroquias(parroquias: ParroquiaArbol[], padre: CircuitoArbol): any[] {
    let parroquiasLista: any[] = [];
    for (let index = 0; index < parroquias.length; index++) {
      const parroquia = parroquias[index];
      parroquiasLista = [
        ...parroquiasLista,
        {
          nombre: parroquia.nombre,
          esTitulo: false,
          padre,
          children: this.construirEstablecimientos(parroquia.establecimientos, parroquia),
          id: `parroquia_${parroquia.id}`,
          tipo: TiposUbicacion.PARROQUIA,
          idBD: parroquia.id,
        },
      ];
    }
    return [
      { nombre: 'Parroquias', id: `parroquia_0000`, padre, tipo: TiposUbicacion.PARROQUIA, esTitulo: true, children: parroquiasLista },
    ];
  }

  construirEstablecimientos(establecimientos: EstablecimientoArbol[], padre: ParroquiaArbol): any[] {
    let establecimientosLista: any[] = [];
    for (let index = 0; index < establecimientos.length; index++) {
      const establecimiento = establecimientos[index];
      establecimientosLista = [
        ...establecimientosLista,
        {
          nombre: establecimiento.nombre,
          esTitulo: false,
          padre,
          children: null,
          id: `establecimiento_${establecimiento.id}`,
          idBD: establecimiento.id,
          tipo: TiposUbicacion.ESTABLECIMIENTO,
        },
      ];
    }
    return [
      {
        nombre: 'Establecimientos',
        id: `establecimiento_0000`,
        padre,
        tipo: TiposUbicacion.ESTABLECIMIENTO,
        esTitulo: true,
        children: establecimientosLista,
      },
    ];
  }

  async obtenerZonas(): Promise<HttpResponse<IZonaRespuesta>> {
    const data = this.http.post<IZonaRespuesta>(`${this.resourceUrl}/obtener-zonas`, null, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerProvinciaPorZona(zonaid: number | null): Promise<HttpResponse<IProvinciaRespuesta>> {
    const data = this.http.post<IProvinciaRespuesta>(`${this.resourceUrl}/obtener-provincia-porzona`, zonaid, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerDistritoPorProvincia(provinciaid: number | null): Promise<HttpResponse<IDistritoResponse>> {
    const data = this.http.post<IDistritoResponse>(`${this.resourceUrl}/obtener-distrito-porprovincia`, provinciaid, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerCantonPorDistrito(distritoid: number | null): Promise<HttpResponse<ICantonResponse>> {
    const data = this.http.post<ICantonResponse>(`${this.resourceUrl}/obtener-canton-pordistrito`, distritoid, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerCircuitoPorCanton(cantonid: number | null): Promise<HttpResponse<ICircuitoResponse>> {
    const data = this.http.post<ICircuitoResponse>(`${this.resourceUrl}/obtener-circuito-porcanton`, cantonid, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerParroquiaPorCircuito(circuitoid: number | null): Promise<HttpResponse<IParroquiaResponse>> {
    const data = this.http.post<IParroquiaResponse>(`${this.resourceUrl}/obtener-parroquia-porcircuito`, circuitoid, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerNiveles(): Promise<HttpResponse<INivelesEstablecimientoRespuesta>> {
    const data = this.http.post<INivelesEstablecimientoRespuesta>(`${this.resourceUrl}/obtener-niveles`, null, { observe: 'response' });
    return await lastValueFrom(data);
  }

  async obtenerTipo(nivelid: number): Promise<HttpResponse<ITiposEstablecimientoRespuesta>> {
    const data = this.http.post<ITiposEstablecimientoRespuesta>(`${this.resourceUrl}/obtener-tipos-pornivel`, nivelid, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async obtenerHorarios(): Promise<HttpResponse<IHorariosEstablecimientoRespuesta>> {
    const data = this.http.post<IHorariosEstablecimientoRespuesta>(`${this.resourceUrl}/obtener-horarios-establecimiento`, null, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async activarDesactivar(establecimientoid: number): Promise<HttpResponse<ComunResponse>> {
    const data = this.http.post<ComunResponse>(`${this.resourceUrl}/activar-desactivar-establecimiento`, establecimientoid, {
      observe: 'response',
    });
    return await lastValueFrom(data);
  }

  async establecimientoPorTipo(peticion: any, req: any): Promise<HttpResponse<IEstablecimiento[]>> {
    const options = createRequestOption(req);

    const data = this.http.post<IEstablecimiento[]>(`${this.resourceUrl}/obtener-establecimientos-porTipo`, peticion, {
      params: options,
      observe: 'response',
    });
    return await lastValueFrom(data);
  }
}
