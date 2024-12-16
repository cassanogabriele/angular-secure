// Service utilisé pour empêcher l'accès à certaines routes lorsque l'utilisateur est déjà connecté

// Importation des modules nécessaires depuis Angular et les services personnalisés.
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

// Indique à Angular que ce service peut être injecté dans d'autres composants ou services.
@Injectable({
  providedIn: 'root',
})

// Implémentation de l'interface "CanActivate"
export class NoAuthGuard implements CanActivate {
  // Injection des services Router et AuthService dans le constructeur pour la navigation et la gestion de l'authentification
  constructor(private _router: Router, private _authService: AuthService) {}

  //  Implémentation de la méthode canActivate de l'interface. Cette méthode est appelée pour déterminer si une route peut être activée
  canActivate(): boolean {
    const isLoggedIn = this._authService.isLoggedIn;

    /*
    Si l'utilisateur est connecté, la méthode effectue une redirection vers la page d'accueil ('/') et
    retourne false pour indiquer que la route ne peut pas être activée.
    */
    if (isLoggedIn) {
      this._router.navigateByUrl('/');
      return false;
    }

    // Si l'utilisateur n'est pas connecté, la méthode retourne true, autorisant ainsi l'accès à la route.
    return true;
  }
}
