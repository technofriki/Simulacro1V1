import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../Models/Producto';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-productos-list',
  styleUrl: './productos-list.css',
  templateUrl: './productos-list.html',
})
export class ProductosList implements OnInit{
  productos = signal<Producto[]>([]);
  private service = inject (ProductosService)

  ngOnInit(){
    this.service.getProductos().subscribe({
      next: (data) => {this.productos.set(data);},
      error: () => alert ('No se pudieron obtener los productos'),
    })
  }
}
