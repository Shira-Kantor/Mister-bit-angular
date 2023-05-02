import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ChartComponent } from './views/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from './cmps/loader/loader.component';
import { SignupComponent } from './views/signup/signup.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { MovesListComponent } from './cmps/moves-list/moves-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    HomePageComponent,
    ContactDetailsComponent,
    AppHeaderComponent,
    ChartComponent,
    AppFooterComponent,
    ContactEditComponent,
    LoaderComponent,
    SignupComponent,
    TransferFundComponent,
    MovesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
