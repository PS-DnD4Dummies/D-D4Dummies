import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { uploadBytes } from '@firebase/storage';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  urls: String[];

  constructor(private cloudStorage:Storage, private http:HttpClient) { 
    this.urls = [];
  }
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
