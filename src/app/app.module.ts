import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { BusinessCardService } from './business-card.service';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { WebcamModule } from './modules/webcam/webcam.module';
import { WebcamComponent } from './webcam/webcam.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBusinessCardsComponent } from './search-business-cards/search-business-cards.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateBusinessCardComponent } from './update-business-card/update-business-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-dashboard', pathMatch: 'full' },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'app-new-business-card', component: WebcamComponent, canActivate: [ AuthGuard ] },
  { path: 'app-update-business-card/:key', component: UpdateBusinessCardComponent, canActivate: [ AuthGuard ]},
  { path: 'app-search-business-cards', component: SearchBusinessCardsComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BusinessCardComponent,
    BusinessCardsComponent,
    WebcamComponent,
    SearchBusinessCardsComponent,
    UpdateBusinessCardComponent,
    PageNotFoundComponent
    // NewBusinessCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebcamModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule
  ],
  providers: [AuthService, BusinessCardService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
