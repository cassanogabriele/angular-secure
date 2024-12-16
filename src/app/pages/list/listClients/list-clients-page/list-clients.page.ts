import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-clients-page',
  templateUrl: './list-clients-page.html',
  styleUrls: ['./list-clients-page.scss']
})

export class ListClientsPage implements OnInit {
  public clients: any[];
  dataLoaded: boolean = false;

  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.listClients();
  }

  listClients(){
    this.http.get(environment.apiUrl + 'client').subscribe((data: any) => {
      this.clients = data;  
    });

    this.dataLoaded = true; 
  }

  editClient(clientId: number): void {      
    // Récupération de l'id de l'utilisateur et affichage de ses infos dans une autre page
    this.router.navigate(['/list/editClient', clientId]);
  } 

  activeClient(clientId: number){ 
    // Activation dans la même page
    this.http.get(environment.apiUrl + 'client/activate/' + clientId).subscribe(
      (data: any) => {
        this.toastr.success('Le client ' + clientId +  ' a été activé avec succès', 'Activation du client');
        this.listClients();   
      },
      (error) => {
        console.error('Erreur lors de l\'activation du client :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'activation du client', 'Erreur');
      }
    );
  }

  deactiveClient(clientId: number){    
    // Activation dans la même page
    this.http.get(environment.apiUrl + 'client/deactivate/' + clientId).subscribe(
      (data: any) => {
        this.toastr.success('Le client ' + clientId +  ' a été désactivé avec succès', 'Désactivation du client');
        this.listClients();
      },
      (error) => {
        console.error('Erreur lors de la désactivation du client :', error);
        this.toastr.error('Une erreur s\'est produite lors de la désactivation du client', 'Erreur');
      }
    );
  }

  deleteClient(clientId: number){
    // Suppression dans la même page
    this.http.get(environment.apiUrl + 'client/delete/' + clientId).subscribe(
      (data: any) => {
        this.toastr.success('Le client ' + clientId +  ' a été supprimé avec succès', 'Suppression du client');
        this.listClients();  
      },
      (error) => {
        console.error('Erreur lors de la suppression du client :', error);
        this.toastr.error('Une erreur s\'est produite lors de la suppression du client', 'Erreur');
      }
    );
  }
}
