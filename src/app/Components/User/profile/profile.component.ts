import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserInterface } from 'src/app/Models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private AuthService: AuthService
    //private UserInterface: UserInterface
  ) { }

  user: UserInterface = {
    name: '',
    email: '',
    password: '',
    photoUrl: '',
    roles: {
      type: null
    }
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.AuthService.isAuth().subscribe(user => {
      if(user){
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId; //verifica si fue logeado con red social.
        console.log('user:',user);
      }
    })
  }

}
