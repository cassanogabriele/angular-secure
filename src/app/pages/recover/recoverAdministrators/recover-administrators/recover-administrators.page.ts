import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover-administrators',
  templateUrl: './recover-administrators.page.html',
  styleUrls: ['./recover-administrators.page.scss']
})

export class RecoverAdministratorsPage implements OnInit {
  // Tableau de stockage des administrateurs récupérés
  public recoveredAdministrators: any[];
  // Dictionnaire stockant les résultats administrateurs récupérés trié en seule ligne par utilisateur
  public uniqueRecoveredAdministrators: any[] = [];
  private httpSubscription: Subscription;
  // Stocker les administrateurs récupérés
  selectedAdministratorsIds: number[] = [];

  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    // Appeler la fonction listUsers lorsque le composant est initialisé
    this.listRecoveredAdministrators();    
  }

  listRecoveredAdministrators(){
    this.http.get(environment.apiUrl + 'administrator/recoveredAdministrators').subscribe((data: any) => {
      this.recoveredAdministrators = data.data;    
    });

    this.dataLoaded = true; 
  }

  toggleAdministratorSelection(userId: number): void {
    const index = this.selectedAdministratorsIds.indexOf(userId);

    if (index === -1) {
      this.selectedAdministratorsIds.push(userId);
    } else {
      this.selectedAdministratorsIds.splice(index, 1);
    }
  }

  reactivateAdministrator(): void {
    this.selectedAdministratorsIds.forEach(administratorId => {
      this.httpSubscription =  this.http.get(environment.apiUrl + 'user/reactivateUsers/' + administratorId).subscribe(
        (data: any) => {
          this.toastr.success('L\'administrateur ' + administratorId + ' a été réactivé', 'Réactivation de l\'adminstrateur');
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
