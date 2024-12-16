// Service qui définit un service Angular abstrait qui sert de base pour les services HTTP 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {
  // Propriété abstraite qui doit être implémentée par les sous-classes
  protected abstract readonly prefix: string;
  // En-tête HTTP pour les requêtes authentifiées
  protected readonly AuthJSON = new HttpHeaders({ 'Content-Type': 'application/json' });
  // Instance de HttpClient pour effectuer des requêtes HTTP
  protected http: HttpClient;

  // Constructeur du service
  constructor() {
    // Utilisation de la fonction inject pour obtenir une instance de HttpClient
    this.http = inject(HttpClient);
  }
}
