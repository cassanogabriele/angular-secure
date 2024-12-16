// Importation des modules et dépendances nécessaires
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { storage } from '../../utils/storage/storage.utils';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpResult } from '../../interfaces/httpResult.interface';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

// Décorateur indiquant qu'il s'agit d'un service injectable dans toute l'application
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // Déclarations des variables
  public isLoggedIn$        = new BehaviorSubject<boolean>(!!storage.getItem('App/session'));
  private readonly prefix   = 'auth/';
  private readonly AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });

  // Constructeur du service avec injection du service HTTP
  constructor(private http : HttpClient) { }
  
  // Getters et Setters
  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  // Méthodes

  // Appel de l'API pour la connection et connexion de l'utilisateur
  login(body:any): Observable<HttpResult> {
    // Requête sur l'API CodeIgniter
    return this.http.post(environment.apiUrl + "auth/login",body) as Observable<HttpResult>;
  }

  // login(body: any): Observable<HttpResult> {
  //   return this.http.post(environment.apiUrl + 'auth/login', body, { responseType: 'text' }).pipe(
  //     map((response: any) => {
  //       // Si la réponse est vide ou invalide, renvoyer une erreur
  //       console.log(response);
        
  //       if (!response) {
  //         throw new Error('Réponse vide ou invalide');
  //       }
  
  //       // Essayez de parser la réponse en tant qu'objet JSON
  //       let parsedResponse;
  //       try {
  //         parsedResponse = JSON.parse(response);
  //       } catch (error) {
  //         console.error('Erreur lors du parsing de la réponse JSON:', error);
  //         throw new Error('Erreur lors du parsing de la réponse JSON');
  //       }
  
  //       // Traitez ici la réponse si nécessaire
  //       return parsedResponse as HttpResult; // ou une transformation adaptée à votre cas
  //     }),
  //     catchError((error) => {
  //       console.error('Erreur lors de la connexion:', error);
  //       return throwError(error);
  //     })
  //   );
  // }

  /**   
   * @param response : Token
   */

  // BehaviorSubject : type d'observable utilisé pour gérer les flux de données asynchrones
  
  // Met à jour le token d'authentification et  lestocke  dans le local storage
  setUserToken(response:Token): void {
    // Stockage du token dans le local storage sous la clé "App/Session"
    storage.setItem('App/session', {access_token: JSON.stringify(response)});
   // Mise à jour du BehaviorSubject `isLoggedIn$` pour indiquer que l'utilisateur est connecté
    this.isLoggedIn$.next(true);
  }

  // Déconnexion de l'utilisation et suppression du token du local storage, mise à jour le BehaviorSubject
  logout(): void {
    // Suppression du token d'authentification du local storage sous la clé 'App/session'
    storage.removeItem('App/session');
    // Mise à jour du BehaviorSubject `isLoggedIn$` pour indiquer que l'utilisateur n'est plus connecté
    this.isLoggedIn$.next(false);
  }
  
  // Récupération des rôles stocké dans le localstorage de l'utilisateur connecté, elle retourne les rôles de l'utilisateur connecté
  getUserRoles(): string[] {
    // Déclaration d'un tableau pour stocker les rôles
    const roles : string[] = [];

    // Vérifier si l'utilisateur est connecté
    if(this.isLoggedIn){      
      // Récupération du token d'authentification depuis le local storage
      const jwt = JSON.parse(storage.getItem('App/session')?.access_token);

      // Vérifier si le token est présent
      if(jwt.access_token)
      {
        // Décodage du payload JWT pour obtenir les rôles (partie contenant les accès et le rôle de l'utilisateur)
        const payload = atob(jwt.access_token.split('.')[1]);
        const rolesObjects = JSON.parse(payload).roles;

        // Ajout des rôles dans le tableau
        rolesObjects.forEach((role : any) => {
          roles.push(role.name)
        });
      }      
    }
    
    return roles;
  }

  // Vérifie si le token d'authentification de l'utilisateur connecté a expiré ou non
  getUserToken(): string {
    // Le token du "localStorage" : il contient une partie "payLoad" contenant les accès et le rôle de l'utilisateur
    const tokenString = storage.getItem('App/session')?.access_token;

    if(tokenString)
      return JSON.parse(tokenString).access_token;

    return '';
  }
 
  // Vérifie si le token d'authentification de l'utilisateur connecté a expiré en comparant la date d'expiration du token avec la date actuelle
  isTokenExpired(): boolean {
    // Obtenir de la date actuelle
    const now = new Date();
    // Obtenir de la date d'expiration du toke
    const expirationDate = this.getTokenExpirationDate(this.getUserToken());

    // Vérifier si la date d'expiration est indéfinie (le token n'a pas de date d'expiration)
    if (expirationDate === null)
      return true;

    // Vérifier si la date d'expiration est antérieure à la date actuelle 
    return expirationDate < now;
  }

  /**
   * @param requiredRoles : les rôles nécessaires pour accéder à la page
   * @returns boolean : true si l'utilisateur a les rôles nécessaires
   */  

  // Vérifie si l'utilisateur connecté possède au moins l'un des rôles requis.
  hasRoles(requiredRoles: string[]): boolean {
    // Récupération des rôles de l'utilisateur connecté
    const userRoles = this.getUserRoles();    
    // Vérifier si au moins l'un des rôles requis est présent dans les rôles de l'utilisateur
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  /**
   * @param token : le token sous forme de chaine de l'utilisateur connecté
   * @returns Date : la date d'expiration du token
   */

  // Décoder le payload d'un token d'authentification JWT pour obtenir la date d'expiration du token.
  private getTokenExpirationDate(token: string): Date | null {    
    // Vérifier si le token est nul, vide ou indéfini
    if (token === null || token === '' || token === undefined)
      return null;

    // Décodage du payload JWT
    const decoded = JSON.parse(atob(token.split('.')[1]));

    // Vérifier si la propriété 'exp' (date d'expiration) est définie dans le payload
    if (decoded.exp === undefined)
      return null;

    const date = new Date(0);

    // Retour de la date d'expiration
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
