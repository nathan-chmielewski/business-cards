import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { BusinessCardComponent } from './business-card/business-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusinessCardService } from './business-card.service';

const routes: Routes = [
  { path: '', redirectTo: 'app-login', pathMatch: 'full' },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BusinessCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, BusinessCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
