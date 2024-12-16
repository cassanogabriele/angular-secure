// Directive qui ajoute un icône de tri à un élément du DOM

// Import de la classe Directive, ElementRef, Renderer2 depuis Angular
import { Directive, ElementRef, Renderer2 } from '@angular/core';

// Déclaration de la directive avec le sélecteur '[sortable-icon]'
@Directive({
  selector: '[sortable-icon]'
})

export class SortableIconDirective {
  // Constructeur de la directive avec injection de dépendances
  constructor(private elRef: ElementRef,
    private renderer: Renderer2) {
    // Obtenir les éléments enfants de l'élément actuel
    const childs = this.elRef.nativeElement.children;

    // Utilisation d'un délai pour attendre que les enfants soient rendus
    setTimeout(() => {
      // Vérifier s'il y a des enfants
     if(childs.length > 0){
      // Créer un nouvel élément (icône de tri)
      const newElement = this.renderer.createElement('div');
      newElement.style.position = 'absolute';
      newElement.style.top = 0;
      newElement.style.cursor = 'pointer';
      newElement.style.right = 0;

      // Contenu de l'icône de tri (SVG)
      newElement.innerHTML = `
              <svg fill="#000000" height="10px" width="10px" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 490 490" xml:space="preserve">
        <g>
          <polygon fill="#FFFFFF" points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46
            0,194.27 37.087,221.213 	"/>
          <polygon fill="#FFFFFF" points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54
            490,295.715 452.913,268.802 	"/>
        </g>
        </svg>
      `;
      // Ajouter le nouvel élément (icône de tri) au premier enfant de l'élément actuel
      this.renderer.appendChild(childs[0], newElement);
     }
    });
  }
}
