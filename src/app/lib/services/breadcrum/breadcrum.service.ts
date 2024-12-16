// Service qui utilise RxJS pour gérer et partager l'état du fil d'Ariane

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breadcrum } from '../../interfaces/breadcrum.interface';

@Injectable({
  providedIn: 'root'
})

export class BreadcrumService {
  // BehaviorSubject pour suivre l'état actuel du fil d'Ariane
  private routes: BehaviorSubject<Breadcrum[]> = new BehaviorSubject<Breadcrum[]>([]);
  // Observable exposant la BehaviorSubject pour permettre aux composants de s'abonner aux changements
  public routes$: Observable<Breadcrum[]> = this.routes.asObservable();

  constructor(){}

  // Méthode pour mettre à jour le fil d'Ariane
  setRoutes(array: Breadcrum[]): any {
    // Utilisation de la méthode next() pour émettre une nouvelle valeur à tous les abonnés
    this.routes.next(array);
  }
}
