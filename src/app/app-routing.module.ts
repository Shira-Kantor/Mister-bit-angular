import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from '../app/views/contact-details/contact-details.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ChartComponent } from './views/chart/chart.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { authGuard } from './guards/auth-guard';
import { contactResolver } from './services/contact.resolver';
import { SignupComponent } from './views/signup/signup.component';


const routes: Routes = [
  { path: 'contacts', component: ContactIndexComponent },
  { path: 'edit', component: ContactEditComponent },
  { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver } },
  {
    path: 'contact-details/:id',
    component: ContactDetailsComponent,
    resolve: { contact: contactResolver },
    // canActivate: [authGuard],
  },
  { path: 'chart', component: ChartComponent },
  {
    path: 'home', component: HomePageComponent,
    canActivate: [authGuard]
  },
  { path: '', component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
