import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductosList } from './pages/productos-list/productos-list';
import { ProductoDetail } from './pages/producto-detail/producto-detail';
import { ProductoForm } from './pages/producto-form/producto-form';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'productos', component: ProductosList},
    {path: 'productos/:id', component: ProductoDetail},
    {path: 'form', component: ProductoForm},
    {path: 'form/:id', component: ProductoForm}
];
