import { Injectable } from '@angular/core';
import { Storage, ref } from '@angular/fire/storage';
import { uploadBytes } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor(private cloudStorage:Storage) { }

  //https://blog.angular-university.io/angular-file-upload/
  //Solo aceptar ficheros jpeg, jpg, png en el frontend
  async uploadProfilePhoto(userID:string,file:File): Promise<Boolean>{

    const storageRef = ref(this.cloudStorage,'profilePhotos/'+userID);

    if (file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png") {
      return false;
    }
  

    return await uploadBytes(storageRef,file).then(()=>{
      console.log("La foto de perfil se ha subido correctamente.");
      return true;
    }).catch((error)=>{
      console.log("Error al subir la foto de perfil. Error: "+error);
      return false;
    });
  }


}
