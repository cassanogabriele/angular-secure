// Directive qui permet de conditionner l'affichage d'un élément du DOM en fonction des rôles de l'utilisateur

// Import des classes Directive, ElementRef, Input, Renderer2 depuis Angular
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
// Import du service AuthService
import { AuthService } from '../services/auth/auth.service';

// Déclaration de la directive avec le sélecteur '[hasRoles]'
@Directive({
  selector: '[hasRoles]',
})

export class HasRolesDirective {
  // Propriété d'entrée 'hasRoles' pour spécifier les rôles requis
  @Input() hasRoles: string | undefined;

  // Constructeur de la directive avec injection de dépendances
  constructor(private _authService: AuthService,
      private elRef: ElementRef,
      private renderer: Renderer2
  ) {
    // Appel de la méthode validateAccess lors de la création de la directive
    this.validateAccess();
  }

  // Méthode du cycle de vie de la directive appelée lorsqu'il y a des changements
  ngOnChanges(changes: SimpleChanges): void {
    // Appel de la méthode validateAccess en réponse aux changements
    this.validateAccess();
  }

  // Méthode privée pour valider l'accès en fonction des rôles
  private validateAccess(): void {
    // Extraction des rôles requis à partir de la chaîne fournie
    const requiredRoles = this.hasRoles?.split(',') || undefined;

    // Vérification si l'utilisateur a les rôles requis
    if (requiredRoles && !this._authService.hasRoles(requiredRoles)) {
      // Si les rôles ne sont pas satisfaits, masquer l'élément du DOM en ajustant le style
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }
}
