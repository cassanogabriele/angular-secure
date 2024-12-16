import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-role-user',
  templateUrl: './edit-role-user.page.html',
  styleUrls: ['./edit-role-user.page.scss']
})
export class EditRoleUserPage implements OnInit, OnDestroy {
  userId: number;
  // Rôles de l'utiliateur
  userRoles: any;
  private routeSubscription: Subscription;
  private httpSubscription: Subscription;
  // Tableau de tous les rôles existants
  public roles: any[];
  // Tableau des rôles sélectionnés 
  public checkedRoles: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // Récupérez l'ID de l'utilisateur à partir de la route
    this.routeSubscription = this.route.params.subscribe(params => {
      this.userId = +params['userId'];

      // Récupérer les rôles de l'utilisateur
      this.httpSubscription = this.http.get(environment.apiUrl + 'user/userRoles/' + this.userId).subscribe((data: any) => {
        this.userRoles = data.data;  

        // Récupérer la liste des rôles
        this.http.get(environment.apiUrl + 'user/roles').subscribe((data: any) => {
          this.roles = data.data;
        });
      });
    });
  }

  isRoleSelected(role: any): boolean {
    return this.userRoles.some((userRole: any) => userRole.id === role.id);
  }

  updateUserRoles(userId: number): void{
    // Récupérer les rôles sélectionnés
    this.checkedRoles = [];
    const checkboxes = document.getElementById("userRoles").getElementsByTagName('input');

    for (let i = 0; i < checkboxes.length; ++i) {
      const checkbox = checkboxes[i];
      if (checkbox.type === 'checkbox' && checkbox.checked) {
        this.checkedRoles.push( parseInt(checkbox.id));
      }
    }

    const userObject = {    
      roles: this.checkedRoles
    };  

    // Mettre à jour les rôles de l'utilisateur  
    this.http.put(environment.apiUrl + 'user/editRolesUser/' + this.userId, userObject).subscribe(
      (data: any) => {
        this.toastr.success('Les rôles ont été modifiés avec succès', 'Modification des rôles');
        this.router.navigate(['/list/listUsers']);
      },
      (error) => {
        console.error('Erreur lors de la modification des rôles :', error);
        this.toastr.error('Une erreur s\'est produite lors de la modifications des rôles', 'Erreur');
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    this.routeSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();
  }
}
