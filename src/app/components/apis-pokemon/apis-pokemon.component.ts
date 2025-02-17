import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/central.service';

@Component({
  selector: 'app-apis-pokemon',
  templateUrl: './apis-pokemon.component.html',
  styleUrls: ['./apis-pokemon.component.css']
})
export class ApisPokemonComponent implements OnInit {
  items: any[] = []; // Array de items para almacenar los personajes
  characterId: number | null = null; // ID del personaje ingresado
  characterName: string = ''; // Almacenar el nombre del personaje ingresado
  item: any = null; // Datos del personaje
  isLoading: boolean = false;
  showHeader: boolean = true; // Control de visibilidad


  recognizedText: string = '';  // Variable para almacenar el texto reconocido

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    // Aquí no hacemos ninguna llamada a la API por defecto
  }

  // Método para consultar un personaje por ID
  fetchCharacter(): void {
    this.isLoading = true;
    if (this.characterId) {
      this.itemService.ApiDos(this.characterId).subscribe(data => {
        this.isLoading = false;
        console.log("Datos de personaje:", data); // Verifica los datos en la consola
        this.items = [data]; // Coloca el personaje en el array items
      });
    } else {
      alert('Por favor, ingrese un ID válido.');
    }
  }
  fetchCharacterByName(): void {
    this.isLoading = true;
    if (this.characterName.trim()) {
      this.itemService.ApiPorNombre(this.characterName).subscribe(data => {
        this.isLoading = false;
        console.log("Datos de personaje por nombre:", data);
        this.items = [data]; // Coloca el personaje en el array items
      }, error => {
        this.isLoading = false;
        console.error("Error al buscar personaje por nombre:", error);
        alert("No se encontró ningún personaje con ese nombre.");
      });
    } else {
      alert('Por favor, ingrese un nombre válido.');
    }
  }
  

  // Método para guardar los datos en la base de datos
  guardarDatos(): void {
    const personaje = this.items[0];
    this.itemService.guardarPersonaje(personaje).subscribe(
      (data) => {
        console.log("Personaje guardado con éxito:", data);
        alert('Personaje guardado con éxito!');
      },
      (error) => {
        console.error('Error al guardar el personaje:', error);
        alert('Error al guardar el personaje.');
      }
    );
  }

  // Método para iniciar la búsqueda por voz
  startVoiceSearch(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('La API de reconocimiento de voz no es compatible con este navegador.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Establecer el idioma español
    
    recognition.onstart = () => {
      console.log('El reconocimiento de voz ha comenzado...');
    };

    recognition.onresult = (event: any) => {
      const query = event.results[0][0].transcript; // Texto reconocido
      console.log('Texto reconocido:', query);
      this.recognizedText = query;  // Mostrar texto en la interfaz

      // Intentar convertir el texto reconocido a número (por si se mencionó un número)
      this.characterId = parseInt(query, 10);

      // Verificar si el texto es un número
      if (this.characterId) {
        console.log('Búsqueda exitosa, personaje encontrado con ID:', this.characterId);
        this.fetchCharacter(); // Realizamos la búsqueda
      } else {
        console.error('No se ha reconocido un ID válido.');
        alert('No se ha reconocido un ID válido. Por favor, intente de nuevo.');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Error al reconocer la voz:', event.error);
      if (event.error === 'aborted') {
        alert('El reconocimiento de voz fue interrumpido.');
      }
    };

    recognition.onend = () => {
      console.log('El reconocimiento de voz ha finalizado.');
    };

    try {
      recognition.start(); // Iniciar el reconocimiento de voz
    } catch (error) {
      console.error('Error al iniciar el reconocimiento de voz:', error);
    }
  }
}
