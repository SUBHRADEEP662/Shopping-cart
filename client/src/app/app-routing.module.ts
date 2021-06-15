import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductViewComponent } from './product-view/product-view.component'
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'product', component: ProductViewComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
