import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { uploadBytes } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor(private cloudStorage:Storage) { }

  //https://blog.angular-university.io/angular-file-upload/
  //Solo aceptar ficheros jpeg, jpg, png en el frontend
  async uploadProfilePhoto(userID:string,file:File): Promise<string>{

    const storageRef = ref(this.cloudStorage,'profilePhotos/'+userID);

    await uploadBytes(storageRef,file).then(()=>{
      console.log("La foto de perfil se ha subido correctamente.");
    }).catch((error)=>{
      console.log("Error al subir la foto de perfil. Error: "+error);
    });

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }


}
