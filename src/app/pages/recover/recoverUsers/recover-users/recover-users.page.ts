import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-users',
  templateUrl: './recover-users.page.html',
  styleUrls: ['./recover-users.page.scss']
})
export class RecoverUsersPage implements OnInit {
  // Tableau de stockage des utilisateurs récupérés
  public recoveredUsers: any[];
  // Dictionnaire stockant les résultats utilisateurs récupérés trié en seule ligne par utilisateur
  public uniqueRecoveredUsers: any[] = [];
  private httpSubscription: Subscription;

  // Stocker les utilisateurs récupérés
  selectedUserIds: number[] = [];

  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    // Appeler la fonction listUsers lorsque le composant est initialisé
    this.listRecoveredUsers();    
  }

  listRecoveredUsers(){
    // Appel de l'API CodeIgniter pour récupérer les utilisateurs
    this.http.get(environment.apiUrl + 'user/recoveredUsers').subscribe((data: any) => {
      this.recoveredUsers = data.data;
      
     // Créer un dictionnaire pour stocker les rôles associés à chaque utilisateur
    const userRolesMap: { [key: string]: any } = {};
      this.recoveredUsers.forEach((recoveredUser) => {
        // Utilisateur courant
        const userId = recoveredUser.id;

        // Si l'utilisateur n'est pas encore ajouté à la liste unique, l'ajouter
        if (!userRolesMap[userId]) {
          userRolesMap[userId] = {
            id: recoveredUser.id,
            name: recoveredUser.name,
            email: recoveredUser.email,
            active: recoveredUser.active,
            created_at: recoveredUser.created_at,
            roles: []
          };
        }

        // Ajouter le rôle actuel à la liste des rôles de l'utilisateur (si ce rôle n'est pas déjà présent)
        if (recoveredUser.role_user && !userRolesMap[userId].roles.includes(recoveredUser.role_user)) {
          userRolesMap[userId].roles.push(recoveredUser.role_user);
        }
      });

      // Convertir le dictionnaire en tableau unique
      this.uniqueRecoveredUsers = Object.values(userRolesMap);

      // Ajouter un espace après chaque virgule dans la liste des rôles
      this.uniqueRecoveredUsers.forEach(recoveredUser => {
        recoveredUser.roles = recoveredUser.roles.join(', ');
      });   
      
      this.dataLoaded = true; 
    });
  }

  toggleUserSelection(userId: number): void {
    const index = this.selectedUserIds.indexOf(userId);

    if (index === -1) {
      this.selectedUserIds.push(userId);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
  }
  
  reactivateUser(): void {
    this.selectedUserIds.forEach(admninistorId => {
      this.httpSubscription =  this.http.get(environment.apiUrl + 'administrator/reactivateAdministratorss/' + admninistorId).subscribe(
        (data: any) => {
          this.toastr.success('L\'administrateur ' + admninistorId  + ' a été réactivé', 'Réactivation de l\'administrateur');
          this.router.navigate(['/list/listAdministrators']);
        },
        (error) => {
          console.error('Erreur lors de la réactivation de l\'administrateur :', error);
          this.toastr.error('Une erreur s\'est produite lors la réactivation de l\'administrateur', 'Erreur');
        }
      );
    });
  }
}
