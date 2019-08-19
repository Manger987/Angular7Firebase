import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
    ) { }
  
  isAuth(){
    //Metodo Comprueba si el usuario esta logueado.
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  registerUser(email:string, password:string) {
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(err => console.log('error Auth/registerUser : ',reject(err)))
    });
  }
  
  loginEmailUser(email:string,password:string) {
    return new Promise((resolve,reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData => 
        resolve(userData),
        err => reject(err));
    });
  }
  loginFacebookUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then((credential) => {
      this.updateUserData(credential.user);
    })
  }
  loginGoogleUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((credential) => {
      this.updateUserData(credential.user);
    })
  }
  logOutUser(){
    this.afsAuth.auth.signOut();
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        type: 2
      }
    }
    return userRef.set(data, { merge:true });
  }

  isUserAdmin(userUid: string){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();//devuelve documento correspondiente al userUid
  }

  rolUser(rolId: number) {
    switch (rolId) {
      case 1 : {
        return 'admin';
        break;
      }  
      case 2 : {
        return 'Edit';  
        break;
      }  
      default : {
        return 'Writer';
        break;
      }  
    }
  }
  
}
