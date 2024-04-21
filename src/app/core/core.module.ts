import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthenticationFirebaseService } from './services/firebase/authentication/authentication-firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConf } from '@data/constanst/environment';
import { FirestoreService } from './services/firebase/firestore/firestore.service';
import { HttpClientModule } from '@angular/common/http';
import { getDatabase, provideDatabase } from '@angular/fire/database';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(firebaseConf)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(()=> getDatabase(undefined,"https://dnd4dummies-ccc4c-default-rtdb.europe-west1.firebasedatabase.app"))
  ],
  providers:[
    ScreenTrackingService,
    UserTrackingService,
    AuthenticationFirebaseService,
    FirestoreService,
    HttpClientModule
  ],
  exports: []
  
})
export class CoreModule { }
