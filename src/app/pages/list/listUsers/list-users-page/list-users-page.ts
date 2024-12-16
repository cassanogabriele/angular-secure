import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.html',
  styleUrls: ['./list-users-page.scss']
})

export class ListUsersPage implements OnInit {
  // Tableau de stockage des utilisateurs
  public users: any[];
  // Dictionnaire stockant les résultats utilisateurs récupérés trié en seule ligne par utilisateur
  public uniqueUsers: any[] = [];
  private httpSubscription: Subscription;
  // Flag pour savoir quand la page est chargée et ne pas afficher le message avant que les données ne soient récupérées
  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    // Appeler la fonction listUsers lorsque le composant est initialisé
    this.listUsers();    
  }

  listUsers(){
    // Appel de l'API CodeIgniter pour récupérer les utilisateurs
    this.http.get(environment.apiUrl + 'user').subscribe((data: any) => {
      this.users = data.data;
      
     // Créer un dictionnaire pour stocker les rôles associés à chaque utilisateur
    const userRolesMap: { [key: string]: any } = {};
      this.users.forEach((user) => {
        // Utilisateur courant
        const userId = user.id;

        // Si l'utilisateur n'est pas encore ajouté à la liste unique, l'ajouter
        if (!userRolesMap[userId]) {
          userRolesMap[userId] = {
            id: user.id,
            name: user.name,
            email: user.email,
            active: user.active,
            created_at: user.created_at,
            roles: []
          };
        }

        // Ajouter le rôle actuel à la liste des rôles de l'utilisateur (si ce rôle n'est pas déjà présent)
        if (user.role_user && !userRolesMap[userId].roles.includes(user.role_user)) {
          userRolesMap[userId].roles.push(user.role_user);
        }
      });

      // Convertir le dictionnaire en tableau unique
      this.uniqueUsers = Object.values(userRolesMap);

      // Ajouter un espace après chaque virgule dans la liste des rôles
      this.uniqueUsers.forEach(user => {
        user.roles = user.roles.join(', ');
      });     

      this.dataLoaded = true; 
    });
  }

  editUser(userId: number): void {
    // Récupération de l'id de l'utilisateur et affichage de ses infos dans une autre page
    this.router.navigate(['/list/editUser', userId]);
  }

  editRoles(userId: number): void {
    // Récupération de l'id de l'utilisateur et affichage de ses infos dans une autre page
    this.router.navigate(['/list/editRolesUser', userId]);
  }

  activeUser(userId: number){
    // Activation dans la même page
    this.http.get(environment.apiUrl + 'user/activate/' + userId).subscribe(
      (data: any) => {
        this.toastr.success('L\'utilisateur ' + userId +  ' a été activé avec succès', 'Activation de l\'utilisateur');
        this.listUsers();   
      },
      (error) => {
        console.error('Erreur lors de l\'activation de l\'utilisateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'activation de l\'utilisateur', 'Erreur');
      }
    );
  }

  deactiveUser(userId: number){
    // Activation dans la même page
    this.http.get(environment.apiUrl + 'user/deactivate/' + userId).subscribe(
      (data: any) => {
        this.toastr.success('L\'utilisateur ' + userId +  ' a été désactivé avec succès', 'Désactivation de l\'utilisateur');
        this.listUsers();   
      },
      (error) => {
        console.error('Erreur lors de la désactivatiin de l\'utilisateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la désactivation de l\'utilisateur', 'Erreur');
      }
    );
  }

  deleteUser(userId: number){
    // Suppression dans la même page
    this.http.get(environment.apiUrl + 'user/delete/' + userId).subscribe(
      (data: any) => {
        this.toastr.success('L\'utilisateur ' + userId +  ' a été supprimé avec succès', 'Suppression de l\'utilisateur');
        this.listUsers();   
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur', 'Erreur');
      }
    );
  }
}
