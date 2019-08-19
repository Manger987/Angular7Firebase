import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private AuthService:AuthService,
    private afsAuth: AngularFireAuth
    ) { }

  public app_name:string = "BioBazar";
  public isLogged:boolean = false;
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.AuthService.isAuth().subscribe((auth) => {
      if (auth) {
        console.log('Auth logged');
        this.isLogged = true;
      } else {
        console.log('User Not Login.')
        this.isLogged = false;
      }
    })
  }

  
  onLogOut(){
    this.afsAuth.auth.signOut();
  }

}
