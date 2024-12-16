// Pas utilisé, supprimer plus tard
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType } from '../../enums/alert.enum';
import { TableParam } from '../../interfaces/table.param.interface';
import { AbstractListPageService } from '../../base-page/list-page/list-page.service';
import { catchError, of, tap } from 'rxjs';
import { HttpResult } from '../../interfaces/httpResult.interface';
import { getErrors } from '../../utils/helpers/helpers.utils';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends AbstractListPageService implements AfterViewInit {

  public errorMessage: string;
  public alertType: AlertType = AlertType.error;
  public columnNumber: number = 0;
  public subColumnNumber: number = 0;

  private _defaultHeaders: string[];
  private _subDefaultHeaders: string[];

  @Input() public params: TableParam;

  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

  //#region Getters / Setters

  public get defaultHeaders() {
    return this._defaultHeaders;
  }
  public set defaultHeaders(value: string[]) {
    this._defaultHeaders = value;
    value.forEach(element => {
      if (typeof (this.data[0][element]) !== 'object' || this.data[0][element] === 'selected' || this.data[0][element] === 'expanded') {
        this.columnNumber++;
      }
    });
  }

  public get subDefaultHeaders() {
    return this._subDefaultHeaders;
  }
  public set subDefaultHeaders(value: string[]) {
    this._subDefaultHeaders = value;
    value.forEach(element => {
      //if childProperty is not an array then it is an object, so transform it into an array
      if(!Array.isArray(this.data[0][this.params.childProperty]))
        this.data.forEach((d:any) => {
          d[this.params.childProperty] = [d[this.params.childProperty]];
        });

      if (typeof (this.data[0][this.params.childProperty][element]) !== 'object') {
        this.subColumnNumber++;
      }
    });
  }

  //#endregion
  constructor(private cdref: ChangeDetectorRef) {
    super();
    this.itemsPerPage = 10;
  }
  ngAfterViewInit(): void {
    if (this.params) {
      if (this.params.data === undefined && this.params.callback === undefined)
        throw new Error('You must set data or callback in table params');
      //Set du nombre d'élements par page
      if (this.params.itemsPerPage)
        this.itemsPerPage = this.params.itemsPerPage;

      //Initialisation des données
      if (this.params.callback) {
        this.params.callback.pipe(
          tap((response: any) => {
            //#region Si le paramètre selectable est à true ou childProperty != null, on ajoute une propriété selected / expanded à chaque élément du tableau
            if (this.params.selectable || this.params.childProperty) {
              if(response.data === undefined)
                response.data = response;

              response.data.forEach((element: any) => {
                element.selected = false;
                element.expanded = false;
              });
            }
            //#endregion

            //#region Set des données
            this.data = response.data;
            this.requestEmmited = true;
            //#endregion

            //#region Set des headers de la table
            if (response.data.length > 0) {
              this.defaultHeaders = Object.keys(response.data[0]);
              if (this.params.childProperty) {
                if(typeof response.data[0][this.params.childProperty] === 'object')
                  this.subDefaultHeaders = Object.keys(response.data[0][this.params.childProperty]);
                else
                  this.subDefaultHeaders = Object.keys(response.data[0][this.params.childProperty][0]);
              }
            }

            //#endregion
          }), catchError((error: any) => {
            this.alertType = AlertType.error;
            this.errorMessage = getErrors(error)
            this.data = [];
            this.requestEmmited = true;
            return of(null);
          })).subscribe();
      } else if (this.params.data) {
        //#region Si le paramètre selectable est à true, on ajoute une propriété selected à chaque élément du tableau
        if (this.params.selectable || this.params.childProperty) {
          this.params.data.forEach((element: any) => {
            element.selected = false;
            element.expanded = false;
          });
        }
        //#endregion

        //#region Set des données
        this.data = this.params.data;
        this.requestEmmited = true;
        //#endregion

        //#region Set des headers de la table
        if (this.data.length > 0) {
          this.defaultHeaders = Object.keys(this.data[0]);
          if (this.params.childProperty) {
            this.subDefaultHeaders = Object.keys(this.data[0][this.params.childProperty][0]);
          }
        }
        //#endregion

        this.cdref.detectChanges();
      }

    }
  }

  getType(value: any) {
    return typeof value;
  }

  onClickRow(row:any,event:any){
    if(event.target.classList.contains("mat-checkbox-inner-container")) //On ne fait rien si on clique sur la checkbox
      return;
    row.expanded = !row.expanded
  }

  onClickAdd() {
    this.onAdd.emit(true);
  }

  onClickEdit() {
    this.onEdit.emit(this.getSelected()[0]);
  }

  onClickDelete() {
    this.onDelete.emit(this.getSelected());
  }
}
