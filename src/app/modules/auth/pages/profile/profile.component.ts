import { Component } from '@angular/core';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { Router } from '@angular/router';
import { ROUTES } from '@data/constanst/routes';
import { CharacterListLoaderComponent } from '@shared/components/character-list-loader/character-list-loader.component';
import { Character } from '@data/interfaces';
import { CharacterListHandlerService } from '@core/services/characterListHandler/character-list-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  isAuthenticated: boolean = false;
  username: string = '';
  email: string = '';
  birthDate!: Date;
  profilePhotoURL: string = '';

  uid = "";
  characterList : Character[] = [];

  newUsername: string = '';
  newEmail: string = '';
  newBirthDate: string = '';
  selectedFile: any;

  auth: any;
  displayImage: string = '/assets/images/default.jpg';
  usernameError: any;
  passwordError: any;
  birthdateError: any;

  isEditing: boolean = false;
  originalProfilePhotoURL: string = '';

  constructor(
    private authService: AuthenticationFirebaseService,
    private firestoreService: FirestoreService,
    private firebaseService: FirebaseService,
    private characterListLoaderComponent: CharacterListLoaderComponent,
    private characterListHandlerService: CharacterListHandlerService,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.currentAuthStatus.subscribe(auth => {
      this.isAuthenticated = !!auth;
      if (auth) {
        this.auth = auth;
        this.uid = auth.uid;
        this.firestoreService.readRealTimeUser(this.uid).subscribe(user => {
          this.email = user.email;
          this.username = user.username;
          this.birthDate = new Date(user.birthdate.seconds*1000);
          this.profilePhotoURL = user.photoURL;
          this.originalProfilePhotoURL = user.photoURL; // Guardar la URL original

          this.reloadList();
        });
    }})

  }

  async reloadList() {
    try {
      const characters = await this.characterListHandlerService.loadCharacterList(this.uid);
      if (characters) {
        this.characterList = characters;
      }

    } catch (error) {
      console.error('Error al cargar la lista de personajes:', error);
    }
  }

  handleCharacterSelect(character: any) {
    this.characterListHandlerService.saveCharacterData(character);
    this.router.navigate([ROUTES.CHARACTER.DEFAULT]);
  }

  handleCharacterDelete(character: any) {
    if (character) {
        this.firestoreService.deleteCharacter(this.uid, character.name);
        this.reloadList();
    }
        
  }

  toggleEdit(): void {
    this.isEditing = true;
    this.newUsername = this.username;
    this.newEmail = this.email;
    this.newBirthDate = this.birthDate.toISOString().substring(0, 10);
  }

  cancelEdit(): void {
    this.isEditing = false;
    // Restaurar la URL original de la foto si se cancela la edición
    this.profilePhotoURL = this.originalProfilePhotoURL;
    // Reiniciar el archivo seleccionado
    this.selectedFile = null;
  }

  saveChanges(): void {
    let changes : {
      [key:string]:any} = {};

    if (this.newUsername != '') {
      if (this.checkForValidUsername(this.newUsername)) {
        changes["username"] = this.newUsername;
      } else {
        alert('Please enter a valid username.');
        return;
      }
    }

    if (this.newBirthDate != '') {
      if (this.isAdult(this.newBirthDate)) {
        changes["birthdate"] = this.birthDate;
      } else {
        alert('Please enter a valid birthdate.');
        return;
      }
    }

    if(this.selectedFile){
      changes["photoURL"] = "";
    }

    if (Object.keys(changes).length) {
      this.firestoreService.readUser(this.auth.uid).then(user => {
        if (user) {
          // Actualiza el perfil del usuario en la base de datos
          this.firebaseService.updateProfileInfo(user, changes, this.selectedFile, this.auth)
            .then(() => {
              // Después de guardar los cambios, cierra la edición y muestra el perfil nuevamente
              this.cancelEdit();
            })
            .catch(error => {
              console.error('Error updating profile:', error);
            });
        } else {
          console.log('No se encontró el usuario.');
        }
      });
    } else {
      // Si no hay cambios, simplemente cierra la edición
      this.cancelEdit();
    }
  }

  onFileSelected(event: any): void {
    if (!this.isEditing) {
      return;
    }

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSizeInMB = file.size / 1024 / 1024;
      const validExtensions = ['image/jpeg', 'image/png'];

      if (!validExtensions.includes(file.type)) {
        alert('Only .jpg and .png files are allowed.');
        return;
      }

      if (fileSizeInMB > 10) {
        alert('File size must be less than 10MB.');
        return;
      }

      // Mostrar la vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePhotoURL = reader.result as string;
      };

      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  parsePhotoGoogleURL(url: string): string {
    const partes = url.split('=');
    if (!url.includes("https://lh3.googleusercontent.com")) {
      return url;
    }
    if (partes.length === 2 && partes[0] && partes[1]) {
      partes[1] = 's1024';
      return partes.join('=');
    } else {
      return url;
    }
  }

  checkForValidUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,20}$/;
    return usernamePattern.test(username);
  }

  isAdult(birthDate: string): boolean {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const adultYear = today.getFullYear() - 18;
    const adultDate = new Date(today.setFullYear(adultYear));
    this.birthDate = birthDateObj;
    return birthDateObj <= adultDate;
  }

  checkForValidPassword(password: string): boolean {
    return true;
    /*const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);*/
  }
}
