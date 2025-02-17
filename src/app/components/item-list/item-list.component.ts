import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/central.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  showHeader: boolean = true; // Control de visibilidad
  items: any[] = []; // Declaramos el array de items

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.itemService.DatosDB().subscribe(
      data => {
        console.log('Datos recibidos:', data); // Imprime los datos recibidos
        this.items = data;
      },
      error => {
        console.error('Error al obtener los datos', error);
      }
    );
  }

  eliminarItem(id: number): void {
    if (id == null || id === undefined || id <= 0) {
      console.error('ID inválido:', id);
      alert('ID inválido para eliminación.');
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      this.itemService.eliminarPersonaje(id).subscribe(
        response => {
          console.log('Respuesta del backend:', response); // Debug para verificar respuesta
  
          // Ajustamos el mensaje según la respuesta del backend
          if (response && response.includes('correctamente')) { 
            alert('Elemento eliminado correctamente.');
            this.obtenerDatos(); // Refrescar la tabla
          } else {
            alert('El backend no pudo confirmar la eliminación. Respuesta: ' + response);
          }
        },
        error => {
          console.error('Error al eliminar el elemento:', error);
          alert('Error al eliminar el elemento.');
        }
      );
    }
  }
  
  
  
}