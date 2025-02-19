import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/central.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias-crear.component.html',
  styleUrls: ['./categorias-crear.component.css']
})
export class CategoriasComponent  {
    categoriaForm: FormGroup;


    ngOnInit(): void {
        this.categoriaForm = this.fb.group({
            codigo: ['', [Validators.required, Validators.minLength(3)]],
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            descripcion: ['']
        });
    }

    constructor(private fb: FormBuilder, private itemService: ItemService) {
        this.categoriaForm = this.fb.group({
            codigo: ['', [Validators.required, Validators.minLength(3)]],  // Validación: mínimo 3 caracteres
            nombre: ['', [Validators.required, Validators.minLength(3)]],  // Validación: mínimo 3 caracteres
            descripcion: ['']
        });
    }
    

    // Función para obtener errores de un campo específico
    getErrorMessage(controlName: string): string | null {
        const control = this.categoriaForm.get(controlName);
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

    guardarCategoria(): void {
        if (this.categoriaForm.valid) {
            const productoData = {
                codigo: this.categoriaForm.get('codigo')?.value.trim(),
                nombre: this.categoriaForm.get('nombre')?.value.trim(),
                descripcion: this.categoriaForm.get('descripcion')?.value.trim() || null
            };
    
            this.itemService.guardarCategoria(productoData).subscribe({
                next: (response) => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'El producto se ha guardado correctamente.',
                        confirmButtonColor: '#3085d6'
                    });
                    this.categoriaForm.reset();
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