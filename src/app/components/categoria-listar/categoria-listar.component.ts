import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/central.service'; // Importa el servicio
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {
  categorias: any[] = [];
  categoriaEditado: any = {}; // Para almacenar el producto que se va a editar

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.itemService.ListarCategorias().subscribe({
      next: (data) => {
        console.log("Datos recibidos de /categorias/listar:", data);
        this.categorias = data;
      },
      error: (error) => {
        console.error("Error al obtener categorias:", error);
      }
    });
  }

  eliminarCategoria(id: number): void {
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
        this.itemService.eliminarCategoria(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            this.categorias = this.categorias.filter(categoria => categoria.id !== id);
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
            console.error("Error al eliminar producto:", error);
          }
        });
      }
    });
  }
  
  editarCategoria(categoria: any): void {
    this.categoriaEditado = { ...categoria }; // Copiar los datos del producto a editar
  }

  guardarEdicion(): void {
    this.itemService.editarCategoria(this.categoriaEditado.id, this.categoriaEditado).subscribe({
      next: (response) => {
        console.log("Producto editado con éxito:", response);
        this.listarCategorias(); // Recargar los productos después de la edición
        this.categoriaEditado = {}; // Limpiar la información del producto editado
      },
      error: (error) => {
        console.error("Error al editar el producto:", error);
      }
    });
  }
}
