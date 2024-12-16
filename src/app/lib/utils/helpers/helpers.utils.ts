export function firstLetterToUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function randomHSL() {
  return 'hsla(' + ~~(360 * Math.random()) + ',' + '70%,' + '80%,1)';
}

export function objectToCSV(data: any) {
  const csvRows = [];

  /* Get headers as every csv data format
  has header (head means column name)
  so objects key is nothing but column name
  for csv data using Object.key() function.
  We fetch key of object as column name for
  csv */
  const headers = Object.keys(data[0]);

  /* Using push() method we push fetched
     data into csvRows[] array */
  csvRows.push(headers.join('|'));

  // Loop to get value of each objects key
  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      return `"${val}"`;
    });

    // To add, separator between each value
    csvRows.push(values.join('|'));
  }

  /* To add new line for each objects values
     and this return statement array csvRows
     to this function.*/
  return csvRows.join('\n');
}

export function downloadFile(data: string, fileName: string, fileType = 'text/plain') {
  const blob = new Blob([data], { type: `${fileType};charset=utf-8;` });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

export function getErrors(errors: any): string {
  let errorMsg = 'Une erreur inconnue est survenue';

  if (errors.error?.messages)
    return errors.error.messages;

  if (errors instanceof HttpErrorResponse) {
    // HttpErrorResponse - extract error message from the response body
    if (errors.error && errors.error.message) {
      errorMsg = errors.error.message;
    } else if (errors.message) {
      errorMsg = errors.message;
    }
    else if (errors.statusText) {
      errorMsg = errors.statusText;
    }
  }
  return errors;
 // return errorMsg;
}


export function completeDateInput(event: any) {
  if (event.inputType === 'deleteContentBackward') {
    if (event.target.value.length === 3 || event.target.value.length === 6) {
      event.target.value = event.target.value.substring(0, event.target.value.length - 1);
    }
    return;
  }

  const date = event.target.value;
  if (date.length === 2 && isNaN(date.substring(0, 2))) {
    event.target.value = '';
    return;
  }

  if (date.length === 3 && date.substring(3, 1) !== '/') {
    event.target.value = date.substring(0, 2) + '/' + date.substring(3, 1);
    return;
  }

  if (date.length === 5 && isNaN(date.substring(3, 5))) {
    event.target.value = date.substring(0, 3);
    return;
  }

  if (date.length === 6 && date.substring(6, 1) !== '/') {
    event.target.value = date.substring(0, 5) + '/' + date.substring(5, 6);
    return;
  }

  if (date.length === 10 && isNaN(date.substring(6, 10))) {
    event.target.value = date.substring(0, 6);
    return;
  }

  if (date.length === 2 || date.length === 5) event.target.value = date + '/';

  if (date.length > 10) event.target.value = date.substring(0, 10);

  //Check if date is valid with Date object
  if (date.length === 10) {
    var m = moment(date, 'DD/MM/YYYY');
    if (m.isValid() === false) {
      event.target.value = '';
      return;
    }
  }
}

export function isEnterKey(event: any) {
  return (event.code === 'Enter' || event.code === 'NumpadEnter') ? true : false;
}
