import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDocumento, NewDocumento } from '../documento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocumento for edit and NewDocumentoFormGroupInput for create.
 */
type DocumentoFormGroupInput = IDocumento | PartialWithRequiredKeyOf<NewDocumento>;

type DocumentoFormDefaults = Pick<NewDocumento, 'id' | 'requerido'>;

type DocumentoFormGroupContent = {
  id: FormControl<IDocumento['id'] | NewDocumento['id']>;
  nombre: FormControl<IDocumento['nombre']>;
  requerido: FormControl<IDocumento['requerido']>;
  codigo: FormControl<IDocumento['codigo']>;
  tipoTramite: FormControl<IDocumento['tipoTramite']>;
};

export type DocumentoFormGroup = FormGroup<DocumentoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentoFormService {
  createDocumentoFormGroup(documento: DocumentoFormGroupInput = { id: null }): DocumentoFormGroup {
    const documentoRawValue = {
      ...this.getFormDefaults(),
      ...documento,
    };
    return new FormGroup<DocumentoFormGroupContent>({
      id: new FormControl(
        { value: documentoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(documentoRawValue.nombre, {
        validators: [Validators.required],
      }),
      requerido: new FormControl(documentoRawValue.requerido, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(documentoRawValue.codigo),
      tipoTramite: new FormControl(documentoRawValue.tipoTramite),
    });
  }

  getDocumento(form: DocumentoFormGroup): IDocumento | NewDocumento {
    return form.getRawValue() as IDocumento | NewDocumento;
  }

  resetForm(form: DocumentoFormGroup, documento: DocumentoFormGroupInput): void {
    const documentoRawValue = { ...this.getFormDefaults(), ...documento };
    form.reset(
      {
        ...documentoRawValue,
        id: { value: documentoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DocumentoFormDefaults {
    return {
      id: null,
      requerido: false,
    };
  }
}
