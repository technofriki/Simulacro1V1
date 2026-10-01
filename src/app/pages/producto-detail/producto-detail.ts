import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../Models/Producto';

@Component({
  imports: [RouterLink],
  selector: 'app-producto-detail',
  styleUrl: './producto-detail.css',
  templateUrl: './producto-detail.html',
})
export class ProductoDetail implements OnInit {
  producto = signal<Producto | null>(null);
  error = signal<string | null>(null);

  private service = inject(ProductosService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.service.getProducto(id).subscribe({
      next: (data) => this.producto.set(data),
      error: ()=> this.error.set('No se pudo obtener el producto'),
    })
  }
}
