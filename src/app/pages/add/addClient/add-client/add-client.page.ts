import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss']
})

export class AddClientPage implements OnInit {
  // Propriétés pour stocker les valeurs du formulaire
  name: string;
  email: string;
  password: string;
  taxe: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addClient(){
    // Construire l'objet à envoyer dans la requête
    const userObject = {
      name: this.name,
      email: this.email,
      password: this.password,
      active: 1,
    };

    // Appeler l'API pour créer un nouveau client
    this.http.post(environment.apiUrl + 'client', userObject).subscribe(
      (data: any) => {
        this.toastr.success('Le client a été créé avec succès', 'Ajout d\'un client');
        this.router.navigate(['/list/listClients']);
      },
      (error) => {
        console.error('Erreur lors de la création du client :', error);
        this.toastr.error('Une erreur s\'est produite lors de la création du client', 'Erreur');
      }
    );
  }
}
