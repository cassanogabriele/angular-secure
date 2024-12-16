// Importation des modules et dépendances nécessaires
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { HttpResult } from 'src/app/lib/interfaces/httpResult.interface';
import { AuthService } from 'src/app/lib/services/auth/auth.service';
import { getErrors } from 'src/app/lib/utils/helpers/helpers.utils';

// Définition du composant avec son template et ses styles
@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  // Déclaration d'une propriété pour stocker les erreurs de connexion
  errors: string;

  // Déclaration du formulaire réactif avec les champs nécessaires
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  // Déclaration du composant et injection des dépendantes (Router, AuthService)
  constructor(private _router: Router, private _authService: AuthService,) {
    this.errors = '';
    this.initForm();
    this.redirectLoggedUsers();
  }

  /*
  Méthode appelée lors du clic sur le bouton "Se connecter". Elle récupère les données du formulaire et les envoie au service d'authentification.
  Si la réponse est positive, on stocke le token dans le "local storage" et on redirige vers la page d'accueil, sinon, on affiche les erreurs.
  */
  onClickSignIn(): void {  
    // Appel de la fonction "login" du "authService" 

    // pipe : utilisée pour chaîner des opérateurs RxJS sur un observable. 
    this._authService.login(this.form.value).pipe(
      tap((response: HttpResult) => {
        this._authService.setUserToken(response.data);
        this._router.navigateByUrl("/");
      }),
      catchError((error: any) => {
        this.errors = getErrors(error);
        return of(null);
      })
    ).subscribe();
  }

  // Initialisation du formulaire
  private initForm(): void {
    this.form.setValue({
      email: '',
      password: '',
    });
  }


  // Redirection des utilisateurs connectés vers la page d'accueil
  private redirectLoggedUsers(): void {
    if (this._authService.isLoggedIn)
      this._router.navigateByUrl("/");
  }
}
