// Composant pour afficher les inforamtions statiques du pied de page

// Import des modules et des composants nécessaires depuis Angular et d'autres fichiers
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { environment } from 'src/environments/environment';

// / Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {
  // Propriété readonly pour stocker l'année en cours extraite de la date actuelle
  public readonly currentYear = new Date().getFullYear();
   // Propriété readonly pour stocker le nom de l'application à partir de l'environnement ou une valeur par défaut
  public readonly appName: string = environment.appName || 'App Name';
}
