import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Producto } from '../Models/Producto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private url = 'http://localhost:3000/productos';
  private http: HttpClient = inject(HttpClient);

  getProductos() {
    return this.http.get<Producto[]>(this.url);
  }

  getProducto(id: string) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto)
  }

  editarProducto(producto: Producto): Observable <Producto> {
    return this.http.put<Producto>(`${this.url}/${producto.id}`, producto)
  }

  eliminarProducto(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}
