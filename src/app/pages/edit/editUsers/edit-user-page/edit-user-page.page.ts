import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.html',
  styleUrls: ['./edit-user-page.scss']
})
export class EditUserPage implements OnInit, OnDestroy {
  userId: number;
  user: any;
  private routeSubscription: Subscription;
  private httpSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Récupérez l'ID de l'utilisateur à partir de la route
    this.routeSubscription = this.route.params.subscribe(params => {
      this.userId = +params['userId'];

      this.httpSubscription = this.http.get(environment.apiUrl + 'user/' + this.userId).subscribe((data: any) => {
        this.user = data.data;    
      });
    });
  }

  updateInfosUser(userId: number): void {
    this.httpSubscription = this.http.put(environment.apiUrl + 'user/' + this.userId, this.user).subscribe(
      (data: any) => {
        this.toastr.success('L\'utilisateur' + this.userId + ' a été mis à jour avec succès', 'Mise à jour de l\'utilisateur');
        this.router.navigate(['/list/listUsers']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur', 'Erreur');
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
