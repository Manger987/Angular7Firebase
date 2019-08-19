import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './Components/Items/item-list/item-list.component';
import { ItemDetailComponent } from './Components/Items/item-detail/item-detail.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { ModalComponent } from './Components/modal/modal.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { OffersComponent } from './Components/offers/offers.component';
import { LoginComponent } from './Components/User/login/login.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { Page404Component } from './Components/page404/page404.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent,
    GalleryComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
