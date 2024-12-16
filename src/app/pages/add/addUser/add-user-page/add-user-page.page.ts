import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.html',
  styleUrls: ['./add-user-page.scss']
})

export class AddUserPage implements OnInit {
  // Propriétés pour stocker les valeurs du formulaire
  name: string;
  email: string;
  password: string;

  public roles: any[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {    
    // Récupérer la liste des rôles
    this.http.get(environment.apiUrl + 'user/roles').subscribe((data: any) => {
      this.roles = data.data;
    });
  }

  addUser(): void {
    // Récupérer les rôles sélectionnés
    const selectedRoles = this.roles.filter(role => role.selected).map(role => role.id);

    // Construire l'objet à envoyer dans la requête
    const userObject = {
      name: this.name,
      email: this.email,
      password: this.password,
      active: 1,
      roles: selectedRoles
    };
    
    // Appeler l'API pour créer un nouvel utilisateur
    this.http.post(environment.apiUrl + 'user', userObject).subscribe(
      (data: any) => {
        this.toastr.success('L\'utilisateur a été créé avec succès', 'Ajout d\'un utilisateur');
        this.router.navigate(['/list/listUsers']);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la création de l\'utilisateur', 'Erreur');
      }
    );
  }
}
