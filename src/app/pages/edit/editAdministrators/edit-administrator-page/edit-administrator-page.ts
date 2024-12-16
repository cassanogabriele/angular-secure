import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-administrator-page',
  templateUrl: './edit-administrator-page.html',
  styleUrls: ['./edit-administrator-page.scss']
})

export class EditAdministratorPage implements OnInit {
  administratorId: number;
  administrator: any;

  private routeSubscription: Subscription;
  private httpSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Récupérez l'ID de l'administrateur à partir de la route
    this.routeSubscription = this.route.params.subscribe(params => {
      this.administratorId = +params['administratorId'];
    
      this.httpSubscription = this.http.get(environment.apiUrl + 'administrator/' + this.administratorId).subscribe((data: any) => {
        this.administrator = data.data;    
      });
    });
  }

  // Mettre à jour l'administrateur
  updateInfosAdministrator(administratorId: number): void {
    this.httpSubscription = this.http.put(environment.apiUrl + 'administrator/' + this.administratorId, this.administrator).subscribe(
      (data: any) => {
        this.toastr.success('L\'administrateur ' + this.administratorId + ' a été mis à jour avec succès', 'Mise à jour de l\'administrator');
        this.router.navigate(['/list/listAdministrators']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'administrateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la mise à jour de l\'administrateur', 'Erreur');
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
