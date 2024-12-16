// Importation des modules Angular nécessaires
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// Importation de la directive personnalisée HasRolesDirective et de l'énumération UserRole
import { HasRolesDirective } from '../../directives/has-roles.directive';
import { UserRole } from '../../enums/user-role.enum';
// Importation des fonctionnalités RxJS pour la gestion des observables
import { Subject, takeUntil } from 'rxjs';
// Importation des composants de la barre de navigation
import { BreadcrumComponent } from '../breadcrum/breadcrum.component';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';
import { LogoComponent } from '../logo/logo.component';
// Importation des paramètres d'environnement et des services nécessaires
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { HttpResult } from '../../interfaces/httpResult.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements  OnDestroy{
  // Propriété déterminant la visibilité du fil d'Ariane, basée sur la configuration de l'environnement
  isBreadcrumVisible: boolean = environment.breadcrum.enabled;
  // Définition des rôles d'administrateur (peut être ajusté pour gérer plusieurs rôles)
  adminRoles = UserRole.Administrateur;
  // Création d'une instance de Subject pour la gestion de la désinscription lors de la destruction du composant
  _destroy$ = new Subject();

  // Constructeur du composant, injection des services nécessaires
  constructor(private _router: Router, private _authService: AuthService) {}

  // Gestionnaire d'événement pour le redimensionnement de la fenêtre
  @HostListener('window:resize', ['$event'])
  
 // Méthode appelée lors de la destruction du composant
  ngOnDestroy(): void {
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  // Méthode appelée lors du clic sur le bouton de déconnexion
  onClickSignOut(): void {
    // Appel de la méthode de déconnexion du service d'authentification et redirection vers la page de connexion
    this._authService.logout();
    // Redirection vers l'url de login
    this._router.navigateByUrl('auth/login');
  }

  // Méthode appelée lors du clic sur le bouton de hamburger (potentiellement pour animer l'en-tête)
  onClickHamburgerButton(status:any){
    // annimateHeader(status);
  }
}
