export interface IFuncionalidad {
  id: number;
  nombre?: string | null;
  descripcion?: string | null;
  url?: string | null;
  activo?: boolean | null;
  icono?: string | null;
  visible?: boolean | null;
  hijos?: Pick<IFuncionalidad, 'id'>[] | null;
  padre?: Pick<IFuncionalidad, 'id'> | null;
}

export type NewFuncionalidad = Omit<IFuncionalidad, 'id'> & { id: null };
