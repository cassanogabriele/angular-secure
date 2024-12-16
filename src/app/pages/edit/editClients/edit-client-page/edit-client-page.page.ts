import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client-page',
  templateUrl: './edit-client-page.html',
  styleUrls: ['./edit-client-page.scss']
})
export class EditClientPage implements OnInit {
  clientId: number;
  client: any;
  private routeSubscription: Subscription;
  private httpSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Récupérez l'ID du client à partir de la route
    this.routeSubscription = this.route.params.subscribe(params => {
    this.clientId = +params['clientId'];

    this.httpSubscription = this.http.get(environment.apiUrl + 'client/' + this.clientId).subscribe((data: any) => {
      this.client = data.data;    
    });
   });
  }

  // Mettre à jour le client
  updateInfosClient(clientId: number): void {
    this.httpSubscription = this.http.put(environment.apiUrl + 'client/', this.client).subscribe(
      (data: any) => {
        this.toastr.success('Le client' + this.clientId + ' a été mis à jour avec succès', 'Mise à jour du client');
        this.router.navigate(['/list/listClients']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du client :', error);
        this.toastr.error('Une erreur s\'est produite lors de la mise à jour du client', 'Erreur');
      }
    );
  }
  
  ngOnDestroy(): void {
    // Se désabonner de tous les observables pour éviter les fuites de mémoire
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
