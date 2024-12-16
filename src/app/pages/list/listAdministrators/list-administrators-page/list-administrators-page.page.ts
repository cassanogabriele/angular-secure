import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-administrators-page',
  templateUrl: './list-administrators-page.html',
  styleUrls: ['./list-administrators-page.scss']
})

export class ListAdministratorsPage implements OnInit {
  public administrators: any[];
  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.listAdministrators();
  }

  listAdministrators(){
    this.http.get(environment.apiUrl + 'administrator').subscribe((data: any) => {
      this.administrators = data.data;     
    });

    this.dataLoaded = true; 
  }

  editAdministrator(administratorId: number): void {
    // Récupération de l'id de l'utilisateur et affichage de ses infos dans une autre page
    this.router.navigate(['/list/editAdministrator', administratorId]);
  }

  activeAdministrator(administratorId: number){ 
    // Activation dans la même page
    this.http.get(environment.apiUrl + 'administrator/activate/' + administratorId).subscribe(
      (data: any) => {
        this.toastr.success('L\'administrateur ' + administratorId +  ' a été activé avec succès', 'Activation de l\'administrateur');
        this.listAdministrators();   
      },
      (error) => {
        console.error('Erreur lors de l\'activation de l\'administrateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de l\'activation de l\'administratreur', 'Erreur');
      }
    );
  }

  deactiveAdministrator(administratorId: number){    
    // Activation dans la même page
    this.http.get(environment.apiUrl + 'administrator/deactivate/' + administratorId).subscribe(
      (data: any) => {
        this.toastr.success('L\'administrateur ' + administratorId +  ' a été désactivé avec succès', 'Désactivation de l\'administrateur');
        this.listAdministrators();
      },
      (error) => {
        console.error('Erreur lors de la désactivation de l\'administrateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la désactivation de l\'administrateurt', 'Erreur');
      }
    );
  }

  deleteAdministrator(administratorId: number){
    // Suppression dans la même page
    this.http.get(environment.apiUrl + 'administrator/delete/' + administratorId).subscribe(
      (data: any) => {
        this.toastr.success('L\'administrateur ' + administratorId +  ' a été supprimé avec succès', 'Suppression de l\'administrateur');
        this.listAdministrators();   
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'administrateur :', error);
        this.toastr.error('Une erreur s\'est produite lors de la suppression de l\'administrateur', 'Erreur');
      }
    );
  }
}
