import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    provideFirebaseApp(() =>
    initializeApp({"projectId":"dnd4dummies-ccc4c","appId":"1:901122310306:web:78ee194daafc6ed50cd7fb","storageBucket":"dnd4dummies-ccc4c.appspot.com","apiKey":"AIzaSyAe4aopttJArT5OF-Krg0IqCc7-m6wNgvE","authDomain":"dnd4dummies-ccc4c.firebaseapp.com","messagingSenderId":"901122310306","measurementId":"G-WMLJ84ND12"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
})
export class CoreModule { }
