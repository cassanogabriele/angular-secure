
// Composant représentant un bouton d'explortation CSV permettant à l'utilisateur de télécharger les données spécifiées au format CSV

// Import des modules et fonctions nécessaires depuis Angular et d'autres fichiers
import { Component, Input, OnInit } from '@angular/core';
import { downloadFile, objectToCSV } from '../../utils/helpers/helpers.utils';

// Déclaration du composant avec le sélecteur, le modèle HTML et les styles associés
@Component({
  selector: 'app-export-csv-button',
  templateUrl: './export-csv-button.component.html',
  styleUrls: ['./export-csv-button.component.scss']
})

export class ExportCsvButtonComponent implements OnInit {
  // Propriété pour recevoir les données à exporter depuis le composant parent
  @Input() data: any;
  // Propriété pour spécifier le nom du fichier CSV à télécharger
  @Input() fileName: string;

  // Constructeur du composant
  constructor() { }

  // Méthode du cycle de vie OnInit appelée après la création du composant
  ngOnInit(): void {}

  // Fonction appelée lors du clic sur le bouton pour télécharger le fichier CSV
  onClickDownload() {
    // Convertir les données en format CSV à l'aide de la fonction objectToCSV
    const data = objectToCSV(this.data);
    // Télécharger le fichier CSV avec le nom spécifié à l'aide de la fonction downloadFile
    downloadFile(data, this.fileName);
  }
}

