// Composant qui représente un volet latéral dans une interface utilisateur

// Import du module Component et des classes EventEmitter, HostListener, Input, OnInit, Output depuis Angular
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

// Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-slide-over',
  templateUrl: './slide-over.component.html',
  styleUrls: ['./slide-over.component.scss']
})

export class SlideOverComponent implements OnInit {
  // Propriété pour indiquer si le volet est ouvert (par défaut, ouvert)
  public opened: boolean = true;

  // Propriété d'entrée pour définir le titre du volet
  @Input() public title: string = '';
  // Événement émis lorsque le volet est fermé
  @Output() public onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  // Constructeur du composant
  constructor() { }

  // Méthode du cycle de vie du composant, appelée après l'initialisation
  ngOnInit(): void {
    // Gestionnaire d'événement pour le défilement de la fenêtre
    window.onscroll = function(ev) {
      if(window.scrollY > 50){
        // Ajuste la position du volet en fonction du défilement
        document.getElementById("slide-over").style.top = "0";
        document.getElementById("backdrop").style.top = "0";
      }else{
        document.getElementById("slide-over").style.top = "50px";
        document.getElementById("backdrop").style.top = "50px";
      }
    };
  }

  // Méthode appelée lors du clic sur le bouton de fermeture du volet
  onClickCloseButton(){
    this.opened = false;
    this.onClose.emit(false);
  }
}
