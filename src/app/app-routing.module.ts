import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { OffersComponent } from './Components/offers/offers.component';
import { ItemDetailComponent } from './Components/Items/item-detail/item-detail.component';
import { ItemListComponent } from './Components/Items/item-list/item-list.component';
import { LoginComponent } from './Components/User/login/login.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { Page404Component } from './Components/page404/page404.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  { path: 'item/itemList', component: ItemListComponent, canActivate: [AuthGuard] },
  { path: 'item/:id', component: ItemDetailComponent, canActivate: [AuthGuard] },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
