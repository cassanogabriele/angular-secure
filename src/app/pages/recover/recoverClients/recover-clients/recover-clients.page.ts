import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-clients',
  templateUrl: './recover-clients.page.html',
  styleUrls: ['./recover-clients.page.scss']
})
export class RecoverClientsPage implements OnInit {
  // Tableau de stockage des clients récupérés
  public recoveredClients: any[];

  // Stocker les clients récupérés
  selectedClientIds: number[] = [];
  private httpSubscription: Subscription;

  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.http.get(environment.apiUrl + 'client/recoveredClients').subscribe((data: any) => {
      this.recoveredClients = data.data;
    });

    this.dataLoaded = true; 
  }

  toggleClientSelection(userId: number): void {
    const index = this.selectedClientIds.indexOf(userId);

    if (index === -1) {
      this.selectedClientIds.push(userId);
    } else {
      this.selectedClientIds.splice(index, 1);
    }
  }

  reactivateClient(): void {
    this.selectedClientIds.forEach(clientId => {
      this.httpSubscription =  this.http.get(environment.apiUrl + 'client/reactivateClients/' + clientId).subscribe(
        (data: any) => {
          this.toastr.success('Le client ' + clientId  + ' a été réactivé', 'Réactivation du client');
          this.router.navigate(['/list/listClients']);
        },
        (error) => {
          console.error('Erreur lors de la réactivation du client :', error);
          this.toastr.error('Une erreur s\'est produite lors la réactivation du client', 'Erreur');
        }
      );
    });
  }  
}
