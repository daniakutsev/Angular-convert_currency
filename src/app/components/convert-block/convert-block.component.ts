import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICurrencies, ICurrency} from "../services/currency.interface";

import {CurrencyService} from "../services/currency.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-convert-block',
  templateUrl: './convert-block.component.html',
  styleUrls: ['./convert-block.component.scss']
})
export class ConvertBlockComponent implements OnInit, OnDestroy {
  currencies: ICurrencies[] = [
    {name: 'UAH'},
    {name: 'USD'},
    {name: 'EUR'},
  ];

  usd: ICurrency | undefined
  eur: ICurrency | undefined

  cSub: Subscription

  firstValue: number = 1
  secondValue: number = 1
  firstCurrency: string = 'USD'
  secondCurrency: string = 'UAH'


  constructor(public currentService: CurrencyService) {

  }


  ngOnInit(): void {
    this.cSub = this.currentService.getAllCurrencies().subscribe(response => {

      // @ts-ignore
      let allCurrencies: ICurrency[] = response

      this.usd = allCurrencies.find(c => c.cc === 'USD')


      this.eur = allCurrencies.find(c => c.cc === 'EUR')
    })


  }


  onChange($event: any) {
    console.log($event)
    if (this.firstCurrency === this.secondCurrency) {
      this.firstValue = this.secondValue
    }
    if ($event === this.firstValue) {

      if (this.firstCurrency === 'USD'&& this.secondCurrency === 'UAH') {
        // @ts-ignore
        this.secondValue = parseInt(this.firstValue * this.usd?.rate * 100) / 100
      } else if (this.firstCurrency === 'EUR'&& this.secondCurrency === 'UAH') {
        // @ts-ignore
        this.secondValue = parseInt(this.firstValue * this.eur?.rate * 100) / 100
      } else if (this.firstCurrency === 'UAH' && this.secondCurrency === 'EUR') {
        // @ts-ignore
        this.secondValue = parseInt(this.firstValue / this.eur?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'UAH' && this.secondCurrency === 'USD') {
        // @ts-ignore
        this.secondValue = parseInt(this.firstValue / this.usd?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'USD' && this.secondCurrency === 'EUR') {
        // @ts-ignore
        this.secondValue = parseInt((this.firstValue * this.usd?.rate) / this.eur?.rate* 1000) / 1000
      }else if (this.firstCurrency === 'EUR' && this.secondCurrency === 'USD') {
        // @ts-ignore
        this.secondValue = parseInt((this.firstValue * this.eur?.rate) / this.usd?.rate* 1000) / 1000
      }
    } else if ($event === this.secondValue) {

      if (this.firstCurrency === 'USD'&& this.secondCurrency === 'UAH') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue / this.usd?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'EUR'&& this.secondCurrency === 'UAH') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue / this.eur?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'UAH' && this.secondCurrency === 'EUR') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue * this.eur?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'UAH' && this.secondCurrency === 'USD') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue * this.usd?.rate * 1000) / 1000
      }else if (this.firstCurrency === 'USD' && this.secondCurrency === 'EUR') {
        // @ts-ignore
        this.secondValue = parseInt((this.firstValue * this.usd?.rate) / this.eur?.rate* 1000) / 1000
      }else if (this.firstCurrency === 'EUR' && this.secondCurrency === 'USD') {
        // @ts-ignore
        this.secondValue = parseInt((this.firstValue * this.eur?.rate) / this.usd?.rate* 1000) / 1000
      }
    } else if ($event === this.firstCurrency || $event === this.secondCurrency) {
      if (this.firstCurrency === 'USD' && this.secondCurrency === 'UAH') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue / this.usd?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'EUR' && this.secondCurrency === 'UAH') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue / this.eur?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'UAH' && this.secondCurrency === 'EUR') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue * this.eur?.rate * 1000) / 1000
      } else if (this.firstCurrency === 'UAH' && this.secondCurrency === 'USD') {
        // @ts-ignore
        this.firstValue = parseInt(this.secondValue * this.usd?.rate * 1000) / 1000
      }else if (this.firstCurrency === 'USD' && this.secondCurrency === 'EUR') {
        // @ts-ignore
        this.secondValue = parseInt((this.firstValue * this.usd?.rate) / this.eur?.rate* 1000) / 1000
      }else if (this.firstCurrency === 'EUR' && this.secondCurrency === 'USD') {
        // @ts-ignore
        this.secondValue = parseInt((this.firstValue * this.eur?.rate) / this.usd?.rate* 1000) / 1000
      }
    }
  }


  ngOnDestroy(): void {
    if (this.cSub)
      this.cSub.unsubscribe()
  }

}
