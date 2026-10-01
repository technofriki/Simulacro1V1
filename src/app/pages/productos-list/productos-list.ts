import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  busqueda = signal('');
  campoOrden = signal<'nombre' | 'precio'>('nombre');
  ascendente = signal(true);

  private service = inject (ProductosService)

  productosFiltrados = computed(()=> {
    const texto = this.busqueda().toLowerCase();
    const filtrados = this.productos().filter(p=> p.nombre.toLowerCase().includes(texto));

    const factor = this.ascendente() ? 1 : -1;
    return [...filtrados].sort((a,b)=> {
      if(this.campoOrden() === 'precio'){
        return (a.precio - b.precio) * factor;
      }
      return a.nombre.localeCompare(b.nombre) * factor;
    });
  });



  ngOnInit(){
    this.service.getProductos().subscribe({
      next: (data) => {this.productos.set(data);},
      error: () => alert ('No se pudieron obtener los productos'),
    })
  }


  actualizarBusqueda (event: Event){
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  ordenarPor(campo: 'nombre' | 'precio'){
    if(this.campoOrden() === campo){
      this.ascendente.set(!this.ascendente());
    }else{
      this.campoOrden.set(campo);
      this.ascendente.set(true);
    }
  }

  eliminar(id: string){
    if(!confirm('Eliminar este producto?')) return;
    this.service.eliminarProducto(id).subscribe({
      next: () => this.productos.update(lista => lista.filter(p => p.id !== id)),
      error: () => alert('No se pudo eliminar el producto'),
    });
  }
}
