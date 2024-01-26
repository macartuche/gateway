import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ItemLiquidacionComponent } from './list/item-liquidacion.component';
import { ItemLiquidacionDetailComponent } from './detail/item-liquidacion-detail.component';
import { ItemLiquidacionUpdateComponent } from './update/item-liquidacion-update.component';
import ItemLiquidacionResolve from './route/item-liquidacion-routing-resolve.service';

const itemLiquidacionRoute: Routes = [
  {
    path: '',
    component: ItemLiquidacionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemLiquidacionDetailComponent,
    resolve: {
      itemLiquidacion: ItemLiquidacionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemLiquidacionUpdateComponent,
    resolve: {
      itemLiquidacion: ItemLiquidacionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemLiquidacionUpdateComponent,
    resolve: {
      itemLiquidacion: ItemLiquidacionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itemLiquidacionRoute;
