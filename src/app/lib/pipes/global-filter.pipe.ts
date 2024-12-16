/*
Filtre personnalisé pour être utilisé dans les templates Angular pour filtrer une liste d'objets en 
fonction d'une chaîne de recherche "filterString".
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalFilter',
  standalone: true
})
export class GlobalFilterPipe implements PipeTransform {

  transform(value: any, filterString: string): any {
    const returnArray: any[] = [];

    // Si la valeur est vide ou si la chaîne de recherche est vide, on supprime le filtre
    if (value.lenght == 0 || filterString === '')
      return value;

    // Pour chaque élément de la liste reçue en paramètre, on vérifie si la chaîne de recherche est présente dans l'élément
    for(const item of value){
      Object.keys(item).forEach(p => {
        switch (typeof item[p]){
          case 'string':
            if (item[p].toUpperCase().indexOf(filterString.toUpperCase()) !== -1)
              if(returnArray.indexOf(item) === -1)
                returnArray.push(item);
            break;
          case 'number':
            if (item[p].toString().toUpperCase().indexOf(filterString.toUpperCase()) !== -1)
              if(returnArray.indexOf(item) === -1)
                returnArray.push(item);
            break;
          case 'boolean':
            if (item[p].toString().toUpperCase().indexOf(filterString.toUpperCase()) !== -1)
              if(returnArray.indexOf(item) === -1)
                returnArray.push(item);
            break;
          default:
            break;
        }
      });
    }

    return returnArray;
  }
}
