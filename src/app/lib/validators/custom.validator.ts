import { AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
/*That is the custom validator class*/
//The validator function always take abstract control as argument, this will contain the input of the form
export function Major(control: AbstractControl) {
    if (control && control.value !== null || control.value !== undefined) {
        //TODO: Make it dynamicly
        const minMajorDate = new Date();
        const birthdate = new Date(control.value);
        minMajorDate.setMonth(minMajorDate.getMonth() - 216);
        minMajorDate.setMinutes(minMajorDate.getMinutes() + 1441);
        if (minMajorDate < birthdate) {
            return { 'isNotMajor': true };
        }
    }
    //If the user is major we need to return null to avoid returning error
    return null;
}

export function confirmPassword(control: AbstractControl) {
    if (control && control.value !== null || control.value !== undefined) {
        const confirmPassword = control.value;
        const passwordControl = control.root.get('password');

        if (passwordControl) {
            const passwordValue = passwordControl.value;
            if (confirmPassword != passwordValue) {
                return { 'isError': true };
            }
        }
    }
    return null;
}

export function forbiddenNames(control: AbstractControl){
    if (control && control.value !== null || control.value !== undefined) {
        const forbiddenUsernames = ['admin', 'test'];

        if (forbiddenUsernames.indexOf(control.value) != -1) {
            return { 'nameIsForbidden': true };
        }
    }
    return null;
}
export function forbiddenMailDomain(control: AbstractControl) {
    if (control && control.value !== null || control.value !== undefined) {
        //TODO Make it dynamic
        const forbiddenMailDomain = ['@4simpleemail.com'];
        const email = control.value;
        let error = false;
        for(let i = 0 ; i<forbiddenMailDomain.length ; i++){
            if(email != null){
                if(email.includes(forbiddenMailDomain[i])) {
                    error=true;
                    break;
                }
            }
        }

        if (error) {
            return { 'EmailDomainIsForbidden': true };
        }
    }
    return null;
}
