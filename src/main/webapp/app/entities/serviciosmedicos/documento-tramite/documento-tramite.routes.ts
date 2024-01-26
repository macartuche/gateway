import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DocumentoTramiteComponent } from './list/documento-tramite.component';
import { DocumentoTramiteDetailComponent } from './detail/documento-tramite-detail.component';
import { DocumentoTramiteUpdateComponent } from './update/documento-tramite-update.component';
import DocumentoTramiteResolve from './route/documento-tramite-routing-resolve.service';

const documentoTramiteRoute: Routes = [
  {
    path: '',
    component: DocumentoTramiteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentoTramiteDetailComponent,
    resolve: {
      documentoTramite: DocumentoTramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentoTramiteUpdateComponent,
    resolve: {
      documentoTramite: DocumentoTramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentoTramiteUpdateComponent,
    resolve: {
      documentoTramite: DocumentoTramiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default documentoTramiteRoute;
