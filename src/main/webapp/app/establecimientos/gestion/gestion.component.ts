/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import SharedModule from 'app/shared/shared.module';
import { EstablecimientosService } from '../service/establecimientos.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IZona } from 'app/entities/zona/zona.model';
import { IProvincia } from 'app/entities/provincia/provincia.model';
import { IDistrito } from 'app/entities/distrito/distrito.model';
import { ICanton } from 'app/entities/canton/canton.model';
import { ICircuito } from 'app/entities/circuito/circuito.model';
import { IParroquia } from 'app/entities/parroquia/parroquia.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IEstablecimiento } from 'app/entities/establecimiento/establecimiento.model';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { MatTableModule } from '@angular/material/table';
import { ServicioComun } from 'app/shared/services/servicio-comun.service';
import { CrearEstablecimientoDialogoComponent } from 'app/shared/dialogs/crear-establecimiento-dialogo/crear-establecimiento-dialogo.component';
import { EditarEstablecimientoDialogoComponent } from 'app/shared/dialogs/editar-establecimiento-dialogo/editar-establecimiento-dialogo.component';

export class TootipAux {
  etiqueta = '';
  valor = '';
}

@Component({
  standalone: true,
  selector: 'jhi-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule, MatTableModule],
})
export class GestionComponent implements OnInit {
  zonas: IZona[] = [];
  provincias: IProvincia[] = [];
  distritos: IDistrito[] = [];
  cantones: ICanton[] = [];
  circuitos: ICircuito[] = [];
  parroquias: IParroquia[] = [];
  establecimientos: IEstablecimiento[] = [];

  form: FormGroup = new FormGroup({
    zona: new FormControl(),
    provincia: new FormControl(),
    distrito: new FormControl(),
    canton: new FormControl(),
    circuito: new FormControl(),
    parroquia: new FormControl(),
    criterio: new FormControl(''),
  });

  ascending = true;
  totalItems = 0;
  pagina = 0;
  itemsPerPage = ITEMS_PER_PAGE;

  columnasMostradas: string[] = ['id', 'unicodigo', 'nombre', 'tipo', 'parroquia', 'estado', 'acciones'];

  constructor(
    private establecimientosService: EstablecimientosService,
    private servicioComunService: ServicioComun,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.cargarDataInicial();
    this.buscar();
  }

  async cargarDataInicial(): Promise<void> {
    const respuestaZona = await this.establecimientosService.obtenerZonas();
    const zonaBody = respuestaZona.body ?? {
      ok: false,
      mensaje: '',
      zonas: [],
    };

    this.zonas = zonaBody.zonas;
  }

  async seleccionZona(zonaid: number | null): Promise<void> {
    this.spinner.show();
    const respuesta = await this.establecimientosService.obtenerProvinciaPorZona(zonaid);
    const body = respuesta.body ?? {
      ok: false,
      mensaje: '',
      provincias: [],
    };

    this.provincias = body.provincias;
    this.spinner.hide();
  }

  async seleccionProvincia(provinciaid: number | null): Promise<void> {
    this.spinner.show();
    const respuesta = await this.establecimientosService.obtenerDistritoPorProvincia(provinciaid);
    const body = respuesta.body ?? {
      ok: false,
      mensaje: '',
      distritos: [],
    };

    this.distritos = body.distritos;
    this.spinner.hide();
  }

  async seleccionDistrito(distritoid: number | null): Promise<void> {
    this.spinner.show();
    const respuesta = await this.establecimientosService.obtenerCantonPorDistrito(distritoid);
    const body = respuesta.body ?? {
      ok: false,
      mensaje: '',
      cantones: [],
    };

    this.cantones = body.cantones;
    this.spinner.hide();
  }

  async seleccionCanton(cantonid: number | null): Promise<void> {
    this.spinner.show();
    const respuesta = await this.establecimientosService.obtenerCircuitoPorCanton(cantonid);
    const body = respuesta.body ?? {
      ok: false,
      mensaje: '',
      circuitos: [],
    };

    this.circuitos = body.circuitos;
    this.spinner.hide();
  }

  async seleccionCircuito(circuitoid: number | null): Promise<void> {
    this.spinner.show();
    const respuesta = await this.establecimientosService.obtenerParroquiaPorCircuito(circuitoid);
    const body = respuesta.body ?? {
      ok: false,
      mensaje: '',
      parroquias: [],
    };

    this.parroquias = body.parroquias;
    this.spinner.hide();
  }

  limpiar(): void {
    this.form.reset();
    this.buscar();
  }

  async buscar(): Promise<void> {
    this.spinner.show();
    let respuesta;
    const parroquiaid = this.form.value.parroquia;

    const paginacion = {
      size: this.itemsPerPage,
      page: this.pagina,
    };

    if (parroquiaid !== null) {
      const peticion = {
        criterio: this.form.value.criterio,
        parroquiaid: this.form.value.parroquia,
      };

      respuesta = await this.servicioComunService.establecimientoPorParroquiaCriterio(peticion, paginacion);
    } else {
      const peticion = {
        criterio: this.form.value.criterio,
      };
      respuesta = await this.servicioComunService.buscarEstablecimientos(peticion, paginacion);
    }

    const respuestaBody = respuesta.body;
    this.establecimientos = respuestaBody!;

    this.spinner.hide();
  }

  desactivarReactivar(establecimiento: IEstablecimiento): void {
    console.log(establecimiento);

    Swal.fire({
      title: 'Confirmación',
      text: '¿Desea activar/desactivar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.value) {
        // desactivar
        this.spinner.show();
        const respuesta = await this.establecimientosService.activarDesactivar(establecimiento.id);
        const body = respuesta.body ?? {
          ok: false,
          mensaje: '',
          id: null,
        };

        if (body.ok) {
          this.toastr.success('Registro actualizado', 'Acción Exitosa');
          await this.buscar();
        } else {
          this.toastr.error(body.mensaje, 'Error');
        }
        this.spinner.hide();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // cancelar
      }
    });
  }

  nuevoEstablecimiento(): void {
    const dialogRef = this.dialog.open(CrearEstablecimientoDialogoComponent, {
      width: '50%',
      height: '750px',
      disableClose: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    dialogRef.afterClosed().subscribe(async result => {
      let respuesta: any;

      if (result !== '') {
        this.spinner.show();

        const parametros = {
          unicodigo: result[0].unicodigo,
          nombre: result[0].nombre,
          tipoId: result[0].tipo.id,
          entidadId: result[0].entidad.id,
          institucionId: result[0].institucion.id,
          barrio: result[0].barrio,
          direccion: result[0].direccion,
          referencia: result[0].referencia,
          telefono: result[0].telefono,
          horarioId: result[0].horario,
          ambitoId: result[0].ambito.id,
          parroquiaId: result[1].parroquia,
        };

        respuesta = await this.establecimientosService.crearEstablecimiento(parametros);

        const resultado = respuesta.body ?? null;
        if (resultado === null) {
          console.log('ERRRORRR');
          Swal.fire({
            title: 'Error!',
            text: 'Error inesperado',
            icon: 'error',
            confirmButtonText: 'Cool',
          });
        } else {
          if (resultado.ok) {
            this.toastr.success(resultado.mensaje, 'Acción Exitosa');
            await this.buscar();
          } else {
            this.toastr.error(resultado.mensaje, 'Error');
          }
        }
        this.spinner.hide();
      }
    });
  }

  abrirDialogoEditarEstablecimiento(data: IEstablecimiento): void {
    const dialogRef = this.dialog.open(EditarEstablecimientoDialogoComponent, {
      width: '50%',
      height: '690px',
      data,
      disableClose: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);

      let respuesta: any;

      if (result !== '') {
        this.spinner.show();

        const parametros = {
          id: data.id,
          unicodigo: result[0].unicodigo,
          nombre: result[0].nombre,
          tipoId: result[0].tipo,
          nivelId: result[0].nivel,
          entidadId: result[0].entidad.id,
          institucionId: result[0].institucion.id,
          barrio: result[0].barrio,
          direccion: result[0].direccion,
          referencia: result[0].referencia,
          telefono: result[0].telefono,
          horarioId: result[0].horario,
          ambitoId: result[0].ambito,
          parroquiaId: result[1].parroquia,
        };

        respuesta = await this.establecimientosService.editarEstablecimiento(parametros);

        const resultado = respuesta.body ?? null;
        if (resultado === null) {
          console.log('ERRRORRR');
          Swal.fire({
            title: 'Error!',
            text: 'Error inesperado',
            icon: 'error',
            confirmButtonText: 'Cool',
          });
        } else {
          if (resultado.ok) {
            this.toastr.success(resultado.mensaje, 'Acción Exitosa');
            await this.buscar();
          } else {
            this.toastr.error(resultado.mensaje, 'Error');
          }
        }
        this.spinner.hide();
      }
    });
  }

  public handlePage(e: any): void {
    this.pagina = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.buscar();
  }
}
