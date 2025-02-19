import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/central.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-producto-crear',
    templateUrl: './producto-crear.component.html',
    styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent {
    productoForm: FormGroup;


    ngOnInit(): void {
        this.productoForm = this.fb.group({
            codigo: ['', [Validators.required, Validators.minLength(3)]],
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            descripcion: [''],
            stockActual: [ [Validators.required, Validators.min(0)]],
            stockMinimo: [ [Validators.required, Validators.min(0)]],
            precio: [ [Validators.required, Validators.min(0)]],
            categoria: [''],
            proveedor: ['']
        });
    }

    constructor(private fb: FormBuilder, private itemService: ItemService) {
        this.productoForm = this.fb.group({
            codigo: ['', [Validators.required, Validators.minLength(3)]],  // Validación: mínimo 3 caracteres
            nombre: ['', [Validators.required, Validators.minLength(3)]],  // Validación: mínimo 3 caracteres
            descripcion: [''],
            stockActual: [ [Validators.required, Validators.min(0)]],  // Validación de mínimo 0
            stockMinimo: [ [Validators.required, Validators.min(0)]],  // Validación de mínimo 0
            precio: [ [Validators.required, Validators.min(0)]],  // Validación de mínimo 0
            categoria: [''],
            proveedor: ['']
        });
    }
    

    // Función para obtener errores de un campo específico
    getErrorMessage(controlName: string): string | null {
        const control = this.productoForm.get(controlName);
        if (control?.hasError('required')) {
            return `${controlName} es obligatorio.`;
        }
        if (control?.hasError('minlength')) {
            return `${controlName} debe tener al menos 3 caracteres.`;
        }
        if (control?.hasError('min')) {
            return `${controlName} debe ser mayor o igual a 0.`;
        }
        return null;
    }

    guardarProducto(): void {
        if (this.productoForm.valid) {
            const productoData = {
                codigo: this.productoForm.get('codigo')?.value.trim(),
                nombre: this.productoForm.get('nombre')?.value.trim(),
                descripcion: this.productoForm.get('descripcion')?.value.trim() || null,
                stockActual: this.productoForm.get('stockActual')?.value || 0,
                stockMinimo: this.productoForm.get('stockMinimo')?.value || 0,
                precio: this.productoForm.get('precio')?.value || 0
            };
    
            this.itemService.guardarProducto(productoData).subscribe({
                next: (response) => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El producto se ha guardado correctamente.',
                        confirmButtonColor: '#3085d6'
                    });
                    this.productoForm.reset();
                },
                error: (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al guardar el producto.',
                        confirmButtonColor: '#d33'
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Formulario inválido',
                text: 'Por favor, complete todos los campos obligatorios correctamente.',
                confirmButtonColor: '#f39c12'
            });
        }
    }
    


}
