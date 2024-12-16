// Pas utilisé : à supprimer plus tard
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmChallengeData } from '../../interfaces/confirm-challenge-data';

@Component({
  selector: 'app-confirm-challenge',
  templateUrl: './confirm-challenge.component.html',
  styleUrls: ['./confirm-challenge.component.scss']
})

export class ConfirmChallengeComponent implements OnInit {
 // Propriétés d'entrée
  @Input() title: string;
  @Input() message: string;
  @Input() color: string;

  // Nombres générés pour le défi
  public num1: number;
  public num2: number;

  private _answer: number;
  private _confirm: boolean;

  constructor(public dialogRef: MatDialogRef<ConfirmChallengeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmChallengeData,
  ) {
    if(data != null){
      this.title = data.title;
      this.message = data.message;
      this.color = data.color;
    }
  }

  ngOnInit(): void {
    //Generate random numbers between 1 and 5
    this.num1 = Math.floor(Math.random() * 5) + 1;
    this.num2 = Math.floor(Math.random() * 5) + 1;

    //Set the answer
    this._answer = this.num1 + this.num2;

  }

  onClickCancel() {
    this.dialogRef.close(false);
  }

  onClickConfirm() {
    //Get the answer from the input
    let answer = parseInt((<HTMLInputElement>document.getElementById("challenge")).value);

    //Check if the answer is correct
    this._confirm = this._answer === answer;

    if(this._confirm)
      this.dialogRef.close(this._confirm);
  }

  onNoClick(): void {
    this.dialogRef.close(this._confirm);
  }
}

