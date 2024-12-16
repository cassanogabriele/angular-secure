
/*
Un autre intercepteur HTTP qui intercepte les erreurs lors des requêtes HTTP sortantes. 
Il est utilisé pour gérer les erreurs au niveau du serveur.  
*/

// Importation des modules nécessaires depuis Angular et d'autres dépendances.
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Indique à Angular que ce service peut être injecté dans d'autres composants ou services
@Injectable()

/*
La classe ServerErrorInterceptor implémente l'interface HttpInterceptor, indiquant qu'elle peut être 
utilisée pour intercepter et traiter les requêtes HTTP
*/
export class ServerErrorInterceptor implements HttpInterceptor {
  // Injection du service Router dans le constructeur pour la navigation
  constructor(private _router: Router) {}

  /*
  Implémentation de la méthode intercept de l'interface HttpInterceptor. Cette méthode est appelée à 
  chaque fois qu'une requête HTTP sortante est effectuée.
  */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Gestion des erreurs

    /*
    Utilisation de l'opérateur pipe pour ajouter une logique de gestion des erreurs à l'observable de
    la requête. L'opérateur catchError intercepte les erreurs HTTP.
    */
    return next.handle(request).pipe(      
      catchError((error: HttpErrorResponse) => {
        /*
        Vérification du statut de l'erreur : Si l'erreur HTTP a un statut de 401 (Non autorisé) ou 403
        (Interdit), l'utilisateur est redirigé vers la page de connexion.
        */
        if ([401, 403].includes(error.status)) {
          if(!request.url.indexOf('api/v1/auth/login'))           
            this._router.navigateByUrl('/auth/login');
          return throwError(() => error);
        } else {
          // Gestion d'autres erreurs

          // Si l'erreur n'est pas liée à l'authentification, elle est simplement consignée dans la console
          console.error(error);
          /*
          Retour de l'observable : La méthode retourne l'observable de la requête, avec ou sans 
          modification, en fonction de la gestion des erreurs effectuée.
          */
          return throwError(() => error);
        }
      }),
    );
  }
}
