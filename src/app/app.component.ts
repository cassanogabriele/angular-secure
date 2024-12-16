// Importation des modules Angular nécessaires
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
// Importation d'un composant de mise en page
import { LayoutHorizontalComponent } from './lib/components/layouts/layout-horizontal/layout-horizontal.component';
// Importation du service d'authentification
import { AuthService } from './lib/services/auth/auth.service';

// Définition du composant avec le sélecteur, le modèle et les styles associés
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  // Propriété observable pour suivre l'état de connexion de l'utilisateur
  isLoggedIn$!: Observable<boolean>;

  // Constructeur du composant, injection des services nécessaires
  constructor(private _authService: AuthService, private router : Router) {}

  // Méthode du cycle de vie Angular, appelée après la création du composant
  ngOnInit(): void {
    // Initialisation de la propriété observable avec l'état de connexion du service d'authentification
    this.isLoggedIn$ = this._authService.isLoggedIn$;

    // Vérifier si le jeton est expiré 
    if(this._authService.isTokenExpired()){
      // Si le jeton est expiré, déconnexion de l'utilisateur et redirection vers la page d'accueil
      this._authService.logout();
      this.router.navigate(['/']);
    }
  }
}
