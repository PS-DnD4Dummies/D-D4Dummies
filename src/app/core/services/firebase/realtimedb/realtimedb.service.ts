import { Injectable } from '@angular/core';

import { Database, child, get, getDatabase, ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RealtimedbService {

  constructor(private realtime:Database) { }

  async readPhotos(page:string):Promise<any>{

    const dbRef = ref(this.realtime);

    return await get(child(dbRef, `fotos/${page}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    }).catch((error) => {
      console.error(error);
      return null;
    });
  }



}
