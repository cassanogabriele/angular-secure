// Importation des modules Angular nécessaires
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Importation des composants Angular réutilisables
import { AlertComponent } from './lib/components/alert/alert.component';
import { BreadcrumComponent } from './lib/components/breadcrum/breadcrum.component';
import { FooterComponent } from './lib/components/footer/footer.component';
import { HamburgerButtonComponent } from './lib/components/hamburger-button/hamburger-button.component';
import { LayoutHorizontalComponent } from './lib/components/layouts/layout-horizontal/layout-horizontal.component';
import { LogoComponent } from './lib/components/logo/logo.component';
import { NavbarComponent } from './lib/components/navbar/navbar.component';
import { ShowHidePasswordButtonComponent } from './lib/components/show-hide-password-button/show-hide-password-button.component';
import { SkeletonLoaderComponent } from './lib/components/skeleton-loader/skeleton-loader.component';
// Importation des gardes (guards) pour la gestion des autorisation
import { AuthGuard } from './lib/guards/auth.guard';
import { NoAuthGuard } from './lib/guards/no-auth.guard';
// Importation des intercepteurs HTTP personnalisé
import { JwtInterceptor } from './lib/interceptors/jwt.interceptor';
import { ServerErrorInterceptor } from './lib/interceptors/server-error.interceptor';
// Importation des pages de l'application
import { LoginPage } from './pages/auth/login/login.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { HomePage } from './pages/home/home.page';
// Importation des modules Angular pour les animations et les composants Matériel
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './lib/modules/material-module';
// Importation de la directive personnalisée SortableIconDirective
import { SortableIconDirective } from './lib/directives/sortable.directive';
// Importation des composants supplémentaires
import { ConfirmChallengeComponent } from './lib/components/confirm-challenge/confirm-challenge.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPage } from './pages/settings/admin/admin.page';
import { HasRolesDirective } from './lib/directives/has-roles.directive';
import { TableComponent } from './lib/components/table/table.component';
import { ExportCsvButtonComponent } from './lib/components/export-csv-button/export-csv-button.component';
import { ButtonComponent } from './lib/components/button/button.component';
import { SlideOverComponent } from './lib/components/slide-over/slide-over.component';
import { ListUsersPage } from './pages/list/listUsers/list-users-page/list-users-page';
import { ListClientsPage } from './pages/list/listClients/list-clients-page/list-clients.page';
import { ListAdministratorsPage } from './pages/list/listAdministrators/list-administrators-page/list-administrators-page.page';
import { EditUserPage } from './pages/edit/editUsers/edit-user-page/edit-user-page.page';
import { ToastrModule } from 'ngx-toastr';
import { EditClientPage } from './pages/edit/editClients/edit-client-page/edit-client-page.page';
import { EditAdministratorPage } from './pages/edit/editAdministrators/edit-administrator-page/edit-administrator-page';
import { AddUserPage } from './pages/add/addUser/add-user-page/add-user-page.page';
import { EditRoleUserPage } from './pages/edit/editRolesUser/edit-role-user/edit-role-user.page';
import { RecoverUsersPage } from './pages/recover/recoverUsers/recover-users/recover-users.page';
import { AddClientPage } from './pages/add/addClient/add-client/add-client.page';
import { RecoverClientsPage } from './pages/recover/recoverClients/recover-clients/recover-clients.page';
import { AddAdministratorPage } from './pages/add/addAdministrator/add-administrator/add-administrator.page';
import { RecoverAdministratorsPage } from './pages/recover/recoverAdministrators/recover-administrators/recover-administrators.page';

// Définition du module principal de l'application
@NgModule({
  // Déclarations des composants, directives et pipes utilisés dans l'application
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutHorizontalComponent,
    LogoComponent,
    HamburgerButtonComponent,
    BreadcrumComponent,
    SkeletonLoaderComponent,
    ShowHidePasswordButtonComponent,
    AlertComponent,
    RegisterPage,
    LoginPage,
    HomePage,
    SortableIconDirective,
    HasRolesDirective,
    ConfirmChallengeComponent,  
    AdminPage,
    TableComponent,
    ExportCsvButtonComponent,
    ButtonComponent,
    SlideOverComponent,
    ListUsersPage,
    ListClientsPage,
    ListAdministratorsPage,
    EditUserPage,
    EditClientPage,
    EditAdministratorPage,
    AddUserPage,
    EditRoleUserPage,
    RecoverUsersPage,
    AddClientPage,
    RecoverClientsPage,
    AddAdministratorPage,
    RecoverAdministratorsPage,
  ],
  // Importation des modules utilisés dans l'application
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  // Déclaration des fournisseurs de services (services, gardes, intercepteurs)
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ],
  // Définition du composant racine de l'application
  bootstrap: [AppComponent]
})
export class AppModule { }
