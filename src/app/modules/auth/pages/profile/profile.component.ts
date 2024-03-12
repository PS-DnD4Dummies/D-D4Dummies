import { Component } from '@angular/core';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FormsModule } from '@angular/forms'; //para usar el form que cambia los paraametros

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  email: string = '';
  password: string = '';
  newDisplayName: string = '';
  newPhotoURL: string = '';
  username: string = '';
  birthDate: string = '';

  auth!:any;
  selectedFileUrl!: string;

  constructor(private authService: AuthenticationFirebaseService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.signUp("aaaa@getMaxListeners.com", "ccccccccccc") //ver como conseguir usuario aqui creado.
    this.authService.currentAuthStatus.subscribe(auth =>{console.log(auth); this.auth = auth});
    //****codigo para ver3ificar****
    if (this.auth && this.auth.uid){ //si existe el usuario y esta autenticado.
      this.authService.currentAuthStatus.subscribe(userInfo=> { // ver como accedee a esto da error.
        this.username = userInfo.displayName;
        this.birthDate = userInfo.birthDate; // no se esta mostrando
        this.email = userInfo.email;
      },
        (error: any) => {
        console.error('Error obteniendo información del usuario:', error);
      }
    );
    //****codigo para ver3ificar****
  }
    
  }
  updateProfile(): void {
    // Llama a la función updateProfile del servicio con los parámetros necesarios
    this.authService.updateProfile(this.auth, this.newDisplayName, this.newPhotoURL);
  }
  onFileSelected(event: any): void {
    const input = event.target;
    const file = input.files[0];
  
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        this.selectedFileUrl = URL.createObjectURL(file);
      } else {
        console.error('Por favor, selecciona un archivo PNG o JPG.');
        this.selectedFileUrl = '';
      }
    }
  }

}

