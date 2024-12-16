// Composant réutilisable conçu pour afficher des alerts à l'utilisateur

// Importation des modules Angular nécessaires
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importation de l'énumération AlertType
import { AlertType } from '../../enums/alert.enum';

// Définition du composant d'alerte
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})

export class AlertComponent implements AfterViewInit {
  // Propriétés d'entrée (@Input) pour recevoir des données du parent

  // Type d'alerte (success, error, warning, info)
  @Input() alertType: AlertType;
  // Message à afficher dans l'alerte
  @Input() message: string;
  // Titre de l'alerte
  @Input() title: string;
  // Temps d'affichage de l'alerte
  @Input() displayTime: number;
  // Événement de sortie (@Output) pour émettre un événement lorsque l'alerte est effacée
  @Output() clear = new EventEmitter<string>();

  // Constructeur du composant
  constructor() {}

  // Initialisation

  // Méthode du cycle de vie Angular, appelée après la création de la vue
  ngAfterViewInit(): void {
    // Si le temps d'affichage est inférieur à 2000 ms, le temps d'affichage est ajusté à 2000 ms
    if(this.displayTime < 2000)
      this.displayTime = 2000;

      // Ajustement du titre en fonction du type d'alerte
      if(this.alertType == AlertType.success && this.title)
        this.title = 'Succès';
      else if(this.alertType == AlertType.error && this.title)
        this.title = 'Erreur';
      else if(this.alertType == AlertType.warning && this.title)
        this.title = 'Attention';
      else if(this.alertType == AlertType.info && this.title)
        this.title = 'Information';
  }

  // Méthode appelée lorsqu'on clique sur le bouton de fermeture de l'alerte fermeture de l'alert
  onClickDismiss(): void {
    // Émission de l'événement de suppression de l'alerte
    this.clear.emit('');
  }
}
