// Importation des modules Angular nécessaires
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importation du service de garde (guard) d'authentification
import { AuthGuard, } from './lib/guards/auth.guard';
// Importation des composants de pages de l'application
import { LoginPage } from './pages/auth/login/login.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { HomePage } from './pages/home/home.page';
// import { AppearancePage } from './pages/settings/appearance/appearance.page';
import { AdminPage } from './pages/settings/admin/admin.page';
import { ListUsersPage } from './pages/list/listUsers/list-users-page/list-users-page';
import { ListClientsPage } from './pages/list/listClients/list-clients-page/list-clients.page';
import { ListAdministratorsPage } from './pages/list/listAdministrators/list-administrators-page/list-administrators-page.page';
import { EditUserPage } from './pages/edit/editUsers/edit-user-page/edit-user-page.page';
import { EditClientPage } from './pages/edit/editClients/edit-client-page/edit-client-page.page';
import { EditAdministratorPage } from './pages/edit/editAdministrators/edit-administrator-page/edit-administrator-page';
import { AddUserPage } from './pages/add/addUser/add-user-page/add-user-page.page';
import { EditRoleUserPage } from './pages/edit/editRolesUser/edit-role-user/edit-role-user.page';
import { RecoverUsersPage } from './pages/recover/recoverUsers/recover-users/recover-users.page';
import { AddClientPage } from './pages/add/addClient/add-client/add-client.page';
import { RecoverClientsPage } from './pages/recover/recoverClients/recover-clients/recover-clients.page';
import { AddAdministratorPage } from './pages/add/addAdministrator/add-administrator/add-administrator.page';
import { RecoverAdministratorsPage } from './pages/recover/recoverAdministrators/recover-administrators/recover-administrators.page';


// Définition des routes de l'application
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginPage, title: "Connexion" },
      { path: 'register', component: RegisterPage },
    ]
  },
  { path: 'home', component: HomePage, canActivate: [AuthGuard], title: "Acceuil" },
  {
    path: 'settings', children: [     
      { path: 'admin', component: AdminPage, canActivate: [AuthGuard], data: { roles: ['admin'] }, title: "Admin" },
    ]
  },
  {
    path: 'list', children: [
      { path: 'listUsers', component: ListUsersPage, title: "Lister Utilisateurs" },
      { path: 'addUser', component: AddUserPage, title: "Ajouter utilisateur" },
      { path: 'editUser/:userId', component: EditUserPage, title: "Editer utilisateur" },
      { path: 'editRolesUser/:userId', component: EditRoleUserPage, title: "Editer les rôles utilisateur" },
      { path: 'recoverUsers', component: RecoverUsersPage, title: "Récupérer les utilisateurs supprimés" },
      { path: 'listClients', component: ListClientsPage, title: "Lister Clients" }, 
      { path: 'editClient/:clientId', component: EditClientPage, title: "Editer le client" },
      { path: 'addClient', component: AddClientPage, title: "Ajouter client" },   
      { path: 'recoverClient', component: RecoverClientsPage, title: "Ajouter client" },       
      { path: 'listAdministrators', component: ListAdministratorsPage, title: "Lister Administrateurs" },
      { path: 'editAdministrator/:administratorId', component: EditAdministratorPage, title: "Editer l'administrateur" },
      { path: 'addAdministrator', component: AddAdministratorPage, title: "Ajouter administrateur" },   
      { path: 'recoverAdministrators', component: RecoverAdministratorsPage, title: "Récupérer les administrateurs supprimés" },   
    ]
  },
];

// Définition du module de routage de l'application
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
