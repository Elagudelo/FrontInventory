import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/central.service';

@Component({
    selector: 'app-producto-crear',
    templateUrl: './producto-crear.component.html',
    styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent {
    productoForm: FormGroup;

    constructor(private fb: FormBuilder, private itemService: ItemService) {
        this.productoForm = this.fb.group({
            codigo: ['', [Validators.required, Validators.minLength(3)]],  // Validación: mínimo 3 caracteres
            nombre: ['', [Validators.required, Validators.minLength(3)]],  // Validación: mínimo 3 caracteres
            descripcion: [''],
            stockActual: [0, [Validators.required, Validators.min(0)]],  // Validación de mínimo 0
            stockMinimo: [0, [Validators.required, Validators.min(0)]],  // Validación de mínimo 0
            precio: [0, [Validators.required, Validators.min(0)]],  // Validación de mínimo 0
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
            // Obtener los valores del formulario utilizando FormControl
            const codigo = this.productoForm.get('codigo')?.value.trim(); 
            const nombre = this.productoForm.get('nombre')?.value.trim();
            const descripcion = this.productoForm.get('descripcion')?.value.trim() || null;
            const stockActual = this.productoForm.get('stockActual')?.value || 0;
            const stockMinimo = this.productoForm.get('stockMinimo')?.value || 0;
            const precio = this.productoForm.get('precio')?.value || 0;
           
    

            // Crear el objeto que se enviará al backend
            const productoData = {
                codigo,
                nombre,
                descripcion,
                stockActual,
                stockMinimo,
                precio
            };

            console.log('Producto a enviar:', productoData);  // Verificar los datos antes de enviarlos

            // Llamar al servicio para guardar el producto
            this.itemService.guardarProducto(productoData).subscribe({
                next: (response) => {
                    console.log('Producto guardado correctamente:', response);
                    this.productoForm.reset();  // Restablecer el formulario después de guardar
                },
                error: (error) => {
                    console.error('Error al guardar el producto:', error);
                    // Mostrar un mensaje de error más claro en caso de fallos
                }
            });
        } else {
            console.warn('Formulario inválido:', this.productoForm.errors);
            // Mostrar errores en la consola si el formulario no es válido
            Object.keys(this.productoForm.controls).forEach(controlName => {
                const control = this.productoForm.get(controlName);
                if (control?.invalid) {
                    console.log(`El campo ${controlName} es inválido:`, control.errors);
                }
            });
        }
    }
}
