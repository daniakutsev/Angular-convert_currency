import {Component, OnInit} from '@angular/core';
import {ICurrency} from "../services/currency.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-convert-block',
  templateUrl: './convert-block.component.html',
  styleUrls: ['./convert-block.component.scss']
})
export class ConvertBlockComponent implements OnInit {
  currencies: ICurrency[] = [
    {name: 'UAH'},
    {name: 'USD'},
    {name: 'EUR'},
  ];



  firstValue: number = 1
  secondValue: number = 1
  firstCurrency: string = ''
  secondCurrency: string = ''

  constructor() {
  }

  ngOnInit(): void {

  }


}
