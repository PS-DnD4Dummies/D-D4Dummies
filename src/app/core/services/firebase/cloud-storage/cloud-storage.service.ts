import { Injectable } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { uploadBytes } from '@firebase/storage';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class CloudStorageService {
  urls: String[];

  constructor(private cloudStorage:Storage) { 
    this.urls = [];
  }

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

  async getImagesFromFile(imageRoute:string):  Promise<String[]>{
    let urls: String[] = [];  

    const storageRef = await ref(this.cloudStorage, imageRoute);

    await listAll(storageRef).then(async response => {
      for(let item of response.items) {
        const url = await getDownloadURL(item);
        urls.push(url);
      }
    })

    return urls;
    
  }
  
}
