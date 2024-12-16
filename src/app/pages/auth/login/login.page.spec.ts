// Importation des modules nécessaires pour les test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// Importation du compte à tester
import { LoginPage } from './login.page';

// Bloc de description pour regrouper et décrire les tests du composant
describe('LoginPage', () => {
  // Déclaration des variables pour le composant et son fixutre
  let component: LoginPage;

  /*
  La classe ComposantFixture est fournie par le module du test Angular, elle est utilisée
  pour interagir avec avec un composant Angular lors des test unitaires. Le fixture est créé à 
  l'intérieur du bloc "foreach", à l'intérieur de la fonction "TestBed", qui permet de créer une 
  instance du composant à texte, et fournit des méthodes pour inspecter et manipuler le composant
  pendant les tests.
  */
  let fixture: ComponentFixture<LoginPage>;

  // Exécution avant chaque test
  beforeEach(async () => {
    // Configuration du module de test
    await TestBed.configureTestingModule({
      // Importation des modules de test nécessaires
      imports: [LoginPage, RouterTestingModule],
    }).compileComponents(); // Compilation des composants du module de test
    // Création d'une instance du composant et de son fixture
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    // Détection des changements dans le composant
    fixture.detectChanges();
  });

  // Cas de test : il vérifie si le compsant est crée avec succès
  it('should create', () => {
    // Assertion : on s'attend à ce que le composant soit truthy
    expect(component).toBeTruthy();
  });
});
