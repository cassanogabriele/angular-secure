/*
Service Angular utilisé comme garde pour les routes afin de contrôler l'accès en fonction de l'authentification 
de l'utilisateur et de leurs rôles.
*/

// Import du décorateur Injectable et des classes nécessaires depuis Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// Décorateur Injectable pour indiquer qu'il s'agit d'un service injectable
@Injectable()

export class AuthGuard implements CanActivate {
  // Constructeur avec injection des dépendances Router et AuthService
  constructor(private _router: Router, private _authService: AuthService){}

  // Méthode "canActivate", exigée par l'interface CanActivate
  canActivate(
    /*
    Lorsqu'un garde de route est évalué, il reçoit un "ActivatedRouteSnapshot", en tant que paramètre 
    "next", il permet d'inspecter l'état actuel de la route et de prendre des décisions en fonction de 
    ces informations. Il peut vérifier les paramètres de route, les données statiques associées, etc, 
    pour déterminer si l'accès à la route doit être autorisé ou refusé. 
    */
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // Vérifier si l'utilisateur est connecté
      const isLoggedIn = this._authService.isLoggedIn;
      // Récupérer les rôles requis de la configuration de la route
      const requiredRoles = next.data?.['roles'];

    // Si l'endpoint nécessite des rôles et que l'utilisateur est connecté
    if (requiredRoles && isLoggedIn) {
      // Récupérer les rôles de l'utilisateur
      const userRoles = this._authService.getUserRoles();
      // Vérifier si l'utilisateur a au moins l'un des rôles requis
      const hasRequiredRole = requiredRoles.some((role: string) => userRoles.includes(role));
      return hasRequiredRole;
      // Si l'endpoint nécessite simplement que l'utilisateur soit connecté
    } else if (isLoggedIn) {
      return true;
      // Si l'utilisateur n'est pas connecté ou n'a pas le bon rôle, rediriger vers la page de connexion
    } else {
      this._router.navigate(['auth/login']);
      return false;
    }
  }
}
