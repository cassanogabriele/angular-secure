/*
Intercepteur HTTP dans Angular permettant de manipuler les requêtes HTTP sortantes. Il est souvent utilisé 
pour attacher des jetons d'authentificaiton aux requêtes.
*/

// Importation des modules nécessaires depuis Angular et les services personnalisés
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

// Indique à Angular que ce service peut être injecté dans d'autres composants ou services.
@Injectable()

/*
La classe JwtInterceptor implémente l'interface HttpInterceptor, ce qui signifie qu'elle peut être utilisée 
pour intercepter et traiter les requêtes HTTP.
*/
export class JwtInterceptor implements HttpInterceptor {
  // Injection du service AuthService dans le constructeur pour l'authentification.
  constructor(private _authService: AuthService) { }

  /*
  Implémentation de la méthode intercept de l'interface HttpInterceptor. Cette méthode est appelée à
  chaque fois qu'une requête HTTP sortante est effectuée.
  */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // vérification factice isLoggedIn, mais dans la réalité, vous vérifieriez probablement si l'utilisateur est authentifié.
    const isLoggedIn = true;
    // Le token d'utilisateur est récupéré à partir du service AuthService.
    const token = this._authService.getUserToken();
    // Vérifier si l'URL de la requête commence par l'URL de l'API définie dans l'environnement et ne contient pas le segment 'auth'
    const isApiUrl = request.url.startsWith(environment.apiUrl) && !request.url.includes('auth');
      
    // Si l'utilisateur est connecté et l'URL est une URL d'API, la requête est clonée et les en-têtes sont modifiés pour inclure le token d'authentification
    if (isLoggedIn && isApiUrl) {      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // La requête modifiée est transmise au gestionnaire HTTP suivant avec next.handle(request)
    return next.handle(request);
  }
}
