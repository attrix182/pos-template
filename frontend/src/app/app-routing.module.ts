import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './pages/config/config.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  {path: 'panel', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'config', component:ConfigComponent},
  {path: '**', redirectTo: 'panel', pathMatch: 'full'},
  {path: '', redirectTo: 'panel', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
