// productos.component.ts

import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/central.service'; // Importa el servicio
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productoEditado: any = {}; // Para almacenar el producto que se va a editar

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.itemService.ListarProductos().subscribe({
      next: (data) => {
        console.log("Datos recibidos de /productos/listar:", data);
        this.productos = data;
      },
      error: (error) => {
        console.error("Error al obtener productos:", error);
      }
    });
  }

  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            this.productos = this.productos.filter(producto => producto.id !== id);
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            console.error("❌ Error al eliminar producto:", error);
          }
        });
      }
    });
  }
  

  editarProducto(producto: any): void {
    this.productoEditado = { ...producto }; // Copiar los datos del producto a editar
  }

  guardarEdicion(): void {
    this.itemService.editarProducto(this.productoEditado.id, this.productoEditado).subscribe({
      next: (response) => {
        console.log("✅ Producto editado con éxito:", response);
        this.listarProductos(); // Recargar los productos después de la edición
        this.productoEditado = {}; // Limpiar la información del producto editado
      },
      error: (error) => {
        console.error("❌ Error al editar el producto:", error);
      }
    });
  }
}
