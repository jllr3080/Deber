// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'clubes',
        loadComponent: () => import('./clubes/clubes.component').then((m) => m.ClubesComponent)
      },
      {
        path: 'nuevoclub',
        loadComponent: () => import('./clubes/nuevoclub/nuevoClub.component').then((m) => m.NuevoClubComponent)
      },
       {
         path: 'editarclub/:club_id',
         loadComponent: () => import('./clubes/nuevoclub/nuevoClub.component').then((m) => m.NuevoClubComponent)
       },

       {
        path: 'miembros',
        loadComponent: () => import('./miembros/miembros.component').then((m) => m.MiembrosComponent)
      },
      {
         path: 'nuevomiembro',
         loadComponent: () => import('./miembros/nuevomiembro/nuevomiembro.component').then((m) => m.NuevoMiembroComponent)
       },
      {
          path: 'editarmiembro/:miembro_id',
          loadComponent: () => import('./miembros/nuevomiembro/nuevomiembro.component').then((m) => m.NuevoMiembroComponent)
        },
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m) => m.ClientesComponent)
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent)
      },
      {
        path: 'editarcliente/:idCliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent)
      },
      {
        path: 'editarFactura/:idFacturas',
        loadComponent: () => import('./facturas/nuevafactura/nuevafactura.component').then((m) => m.NuevafacturaComponent)
      },
      {
        path: 'nuevafactura',
        loadComponent: () => import('./facturas/nuevafactura/nuevafactura.component').then((m) => m.NuevafacturaComponent)
      },
      {
        path: 'facturas',
        loadComponent: () => import('./facturas/facturas.component').then((m) => m.FacturasComponent)
      },

      //Deber  de unidad de medida y de productos
      {
        path: 'unidadmedida',
        loadComponent: () => import('./unidadmedida/unidadmedida.component').then((m) => m.UnidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'productos',
        loadComponent: () => import('./productos/productos.component').then((m) => m.ProductosComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevaunidadmedida',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarunidadmedida/:id',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
        canActivate: [usuariosGuardGuard]
      },
     
      {
        path: 'nuevoproducto',
        loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarproducto/:id',
        loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
        canActivate: [usuariosGuardGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
