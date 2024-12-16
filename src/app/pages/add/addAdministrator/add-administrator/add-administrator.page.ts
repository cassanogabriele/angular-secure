import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.page.html',
  styleUrls: ['./add-administrator.page.scss']
})
export class AddAdministratorPage implements OnInit {
  // Propriétés pour stocker les valeurs du formulaire
  name: string;
  email: string;
  password: string; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  addAdministrator(): void {
    // Construire l'objet à envoyer dans la requête
    const userObject = {
      name: this.name,
      email: this.email,
      password: this.password,
      active: 1,
    };
    
    // Appeler l'API pour créer un nouvel administrateur
    this.http.post(environment.apiUrl + 'administrator/createAdministrator', userObject).subscribe(
      (data: any) => {
        this.toastr.success('L\'administrateur a été créé avec succès', 'Ajout d\'un administrateur');
        this.router.navigate(['/list/listAdministrators']);
      },
      (error) => {
        console.error('Erreur lors de la création de l\'administrateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la création de l\'administrateur', 'Erreur');
      }
    );
  }
}
