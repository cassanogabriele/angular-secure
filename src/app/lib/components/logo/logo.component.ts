// Composant qui représente le logo 

// Import du module CommonModule depuis Angular et des éléments nécessaires pour créer un composant
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

// Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})

export class LogoComponent {
  // Propriétés du composant

  //  Le nom de l'application récupéré depuis la configuration de l'environnement. S'il n'est pas défini, il utilise la valeur par défaut 'App Name'
  public readonly appName: string = environment.appName || 'App Name';
  // L'acronyme de l'application récupéré depuis la configuration de l'environnement. S'il n'est pas défini, il utilise la valeur par défaut 'AN'
  public readonly appAcronym: string = environment.appAcronym || 'AN';
  // Le chemin vers le logo de l'application récupéré depuis la configuration de l'environnement. S'il n'est pas défini, il utilise la valeur par défaut 'assets/images/logo.png'
  public readonly appLogo: string = environment.appLogo || 'assets/images/logo.png';
}
