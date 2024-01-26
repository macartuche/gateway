import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DocumentoComponent } from './list/documento.component';
import { DocumentoDetailComponent } from './detail/documento-detail.component';
import { DocumentoUpdateComponent } from './update/documento-update.component';
import DocumentoResolve from './route/documento-routing-resolve.service';

const documentoRoute: Routes = [
  {
    path: '',
    component: DocumentoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentoDetailComponent,
    resolve: {
      documento: DocumentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default documentoRoute;
