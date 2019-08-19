import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private AuthService:AuthService
    ) { }

  public email:string = '';
  public password:string = '';
  ngOnInit() {
  }

  onLogin():void { //Se pone void cuando no devuelve nada.
    this.AuthService.loginEmailUser(this.email,this.password)
    .then((res) => {
      this.onLoginRedirect();
    })
    .catch(err => console.log('ERROR: Login/onLogin:', err.message));
  }

  onLoginGoogle(): void {
    this.AuthService.loginGoogleUser().
    then((res) => {
      console.log('resUser:',res);
      this.onLoginRedirect();
    }).catch(err =>{
      console.log('ERROR login/onLoginGoogle:', err.message);
    })
    
  }

  onLoginFacebook(){
    this.AuthService.loginFacebookUser()
    .then((res)=>{
      console.log('resUser:',res);
      this.onLoginRedirect();
    }).catch( err => console.log('ERROR login/onLoginFacebook:', err.message));
  }

  onLogOut(){
    this.AuthService.logOutUser();
  }
  
  onLoginRedirect() : void { //Void cuando no devuelve nada
    this.router.navigate(['item/itemList']);
  }
}
