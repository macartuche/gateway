import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ItemCieComponent } from './list/item-cie.component';
import { ItemCieDetailComponent } from './detail/item-cie-detail.component';
import { ItemCieUpdateComponent } from './update/item-cie-update.component';
import ItemCieResolve from './route/item-cie-routing-resolve.service';

const itemCieRoute: Routes = [
  {
    path: '',
    component: ItemCieComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemCieDetailComponent,
    resolve: {
      itemCie: ItemCieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemCieUpdateComponent,
    resolve: {
      itemCie: ItemCieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemCieUpdateComponent,
    resolve: {
      itemCie: ItemCieResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itemCieRoute;
