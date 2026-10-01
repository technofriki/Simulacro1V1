import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-producto-form',
  styleUrl: './producto-form.css',
  templateUrl: './producto-form.html',
})
export class ProductoForm implements OnInit{

  private fb = inject (FormBuilder);
  private service = inject (ProductosService);
  private route = inject (ActivatedRoute);
  private router = inject (Router);

  esEdicion = signal (false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.required, Validators.min(1), Validators.max(500000)]],
    categoria: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  get c(){
    return this.form.controls;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.esEdicion.set(true);

      this.service.getProducto(id).subscribe({
        next: (data) => this.form.patchValue(data),
        error: () => this.error.set('No se pudo obtener el producto'),
      });
    }
  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const producto = this.form.getRawValue();
    const request = this.esEdicion() ? 
    this.service.editarProducto({...producto, id: this.route.snapshot.paramMap.get('id')!})
    : this.service.crearProducto(producto);

    request.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: () => this.error.set('No se pudo guardar el producto'),
    });
  }
    
  
}
