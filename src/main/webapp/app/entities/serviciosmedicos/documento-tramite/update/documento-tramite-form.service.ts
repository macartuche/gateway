import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDocumentoTramite, NewDocumentoTramite } from '../documento-tramite.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocumentoTramite for edit and NewDocumentoTramiteFormGroupInput for create.
 */
type DocumentoTramiteFormGroupInput = IDocumentoTramite | PartialWithRequiredKeyOf<NewDocumentoTramite>;

type DocumentoTramiteFormDefaults = Pick<NewDocumentoTramite, 'id'>;

type DocumentoTramiteFormGroupContent = {
  id: FormControl<IDocumentoTramite['id'] | NewDocumentoTramite['id']>;
  nombre: FormControl<IDocumentoTramite['nombre']>;
  fecha: FormControl<IDocumentoTramite['fecha']>;
  url: FormControl<IDocumentoTramite['url']>;
  documento: FormControl<IDocumentoTramite['documento']>;
  tramite: FormControl<IDocumentoTramite['tramite']>;
};

export type DocumentoTramiteFormGroup = FormGroup<DocumentoTramiteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentoTramiteFormService {
  createDocumentoTramiteFormGroup(documentoTramite: DocumentoTramiteFormGroupInput = { id: null }): DocumentoTramiteFormGroup {
    const documentoTramiteRawValue = {
      ...this.getFormDefaults(),
      ...documentoTramite,
    };
    return new FormGroup<DocumentoTramiteFormGroupContent>({
      id: new FormControl(
        { value: documentoTramiteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(documentoTramiteRawValue.nombre, {
        validators: [Validators.required],
      }),
      fecha: new FormControl(documentoTramiteRawValue.fecha, {
        validators: [Validators.required],
      }),
      url: new FormControl(documentoTramiteRawValue.url, {
        validators: [Validators.required],
      }),
      documento: new FormControl(documentoTramiteRawValue.documento, {
        validators: [Validators.required],
      }),
      tramite: new FormControl(documentoTramiteRawValue.tramite, {
        validators: [Validators.required],
      }),
    });
  }

  getDocumentoTramite(form: DocumentoTramiteFormGroup): IDocumentoTramite | NewDocumentoTramite {
    return form.getRawValue() as IDocumentoTramite | NewDocumentoTramite;
  }

  resetForm(form: DocumentoTramiteFormGroup, documentoTramite: DocumentoTramiteFormGroupInput): void {
    const documentoTramiteRawValue = { ...this.getFormDefaults(), ...documentoTramite };
    form.reset(
      {
        ...documentoTramiteRawValue,
        id: { value: documentoTramiteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DocumentoTramiteFormDefaults {
    return {
      id: null,
    };
  }
}
