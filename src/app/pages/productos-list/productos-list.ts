import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos';

@Component({
  imports: [],
  selector: 'app-productos-list',
  styleUrl: './productos-list.css',
  templateUrl: './productos-list.html',
})
export class ProductosList implements OnInit{
  private service = inject (ProductosService)

  ngOnInit(){
    this.service.getProductos().subscribe({
      next: (data) => {console.log(data);},
      error: () => alert ('No se pudieron obtener los productos'),
    })
  }
}
