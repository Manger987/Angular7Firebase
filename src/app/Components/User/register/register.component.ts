import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import{ finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private AuthService:AuthService,
    private Router: Router,
    private storage:AngularFireStorage
    ) { }
    @ViewChild('imageUser', {static: false}) inputImageUser: ElementRef;//esta sacando el valor del input con la ruta de la imagen y la almacena en la variable inputImageUser
  public email: string = '';
  public password: string = '';
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  ngOnInit() {
  }

  onAddUser(){
    console.log('here');
    this.AuthService.registerUser(this.email,this.password)
    .then( (res) => {
      this.AuthService.isAuth().subscribe(user => {
        if(user){
          console.log('CurrentlyUser:',user);
          user.updateProfile({
            displayName:'',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(function(){
            console.log('USER UPDATE');
          }).catch(function(err){
            console.log('Error: register/onAddUser',err.message)
          });
        }
      });
      //this.Router.navigate(['item/itemList']);
    }).catch( (err) => console.log('Error register/onAddUser:',err.message));
  }

  onUpload(e){
     //console.log('Evento:',e.target.files[0]);
     const id = Math.random().toString(36).substring(2);
     const file = e.target.files[0];
     const filePath = `User/${id}`//ruta del fichero
     const ref = this.storage.ref(filePath);
     const task = this.storage.upload(filePath,file); //esta funcion sube la imagen
     this.uploadPercent = task.percentageChanges();
     task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL()))
     .subscribe();
  }
}
