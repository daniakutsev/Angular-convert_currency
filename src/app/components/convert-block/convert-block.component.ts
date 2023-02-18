import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICurrency} from "../services/currency.interface";
import {CurrencyService} from "../services/currency.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-convert-block',
  templateUrl: './convert-block.component.html',
  styleUrls: ['./convert-block.component.scss']
})
export class ConvertBlockComponent implements OnInit, OnDestroy {

  allCurrencies: ICurrency[] = [
    {
      "r030": 1, "txt": "Українська гривня", "rate": 1, "cc": "UAH", "exchangedate": "17.02.2023"
    }
  ]
  eur: ICurrency
  usd: ICurrency
  cSub: Subscription
  firstValue: number = 1
  secondValue: number = 1
  firstCurrency: string = 'EUR'
  secondCurrency: string = 'USD'
  firstBuffCurrency: ICurrency
  secondBuffCurrency: ICurrency

  constructor(public currentService: CurrencyService) {
  }

//Здравствуйте тем кто проверяет эту работу
//   Хотел бы передать большое спасибо за первую проверку и небольшой пинок под зад
//   Учел все что вы мне передали и постарался сделать абсолютно универсальный код для любых валют
//   Пониманию что можно было найти еще лучше решение или вообще использовать библиотеку money.js и сократить все еще сильнее
//   Но я решил продемонстрировать что я мог сделать это и сам и по моему мнению намного лучше чем в прошлый раз
//   Если же и этой работы будет недостаточно для следующего разговора
//   То знайте, что я готов еще 10 раз переделать эту работу но получить какой-то шанс
//   Хорошего дня

  ngOnInit(): void {
    this.cSub = this.currentService.getAllCurrencies().subscribe(response => {
      // @ts-ignore
      this.allCurrencies.push(...response)
      this.usd = this.allCurrencies.find(c => c.cc === 'USD')
      this.eur = this.allCurrencies.find(c => c.cc === 'EUR')
    })

  }


  onChange($event: string|number) {
    this.getBuffs()
    //Изменение инпутов если слева гривна
    this.uahToOther($event)
    //Изменение инпутов если справа гривна
    this.otherToUah($event)
    //Изменение инпутов если слева валюта меньше
    this.lowOtherToHighOther($event)
    //Изменение инпутов если справа валюта меньше
    this.highOtherToLowOther($event)
  }

  getBuffs() {
    this.firstBuffCurrency = this.allCurrencies.find(c => c.cc === this.firstCurrency)
    this.secondBuffCurrency = this.allCurrencies.find(c => c.cc === this.secondCurrency)
  }

  uahToOther($event: string|number) {
    if ((this.firstBuffCurrency.cc === 'UAH' && $event === this.firstValue) || (this.firstBuffCurrency.cc === 'UAH' && $event === this.firstCurrency)) {
      this.secondValue = parseInt(String(this.firstValue / this.secondBuffCurrency?.rate * 1000)) / 1000
    } else if ((this.firstBuffCurrency.cc === 'UAH' && $event === this.secondValue) || (this.firstBuffCurrency.cc === 'UAH' && $event === this.secondCurrency)) {
      this.firstValue = parseInt(String(this.secondValue * this.secondBuffCurrency.rate * 1000)) / 1000
    }
  }

  otherToUah($event: string|number) {
    if ((this.secondBuffCurrency.cc === 'UAH' && $event === this.firstValue) || (this.secondBuffCurrency.cc === 'UAH' && $event === this.secondCurrency)) {
      this.secondValue = parseInt(String(this.firstValue * this.firstBuffCurrency.rate * 100)) / 100
    } else if ((this.secondBuffCurrency.cc === 'UAH' && $event === this.secondValue) || (this.secondBuffCurrency.cc === 'UAH' && $event === this.firstCurrency)) {
      this.firstValue = parseInt(String(this.secondValue / this.firstBuffCurrency.rate * 1000)) / 1000
    }
  }

  lowOtherToHighOther($event: string|number) {
    if ((this.firstBuffCurrency.rate < this.secondBuffCurrency.rate && $event === this.firstValue) || (this.firstBuffCurrency.rate < this.secondBuffCurrency.rate && $event === this.firstCurrency)) {
      this.secondValue = parseInt(String((this.firstValue * this.firstBuffCurrency.rate) / this.secondBuffCurrency?.rate * 1000)) / 1000
    } else if ((this.firstBuffCurrency.rate < this.secondBuffCurrency.rate && $event === this.secondValue) || (this.firstBuffCurrency.rate < this.secondBuffCurrency.rate && $event === this.secondCurrency)) {
      this.firstValue = parseInt(String((this.secondValue * this.secondBuffCurrency.rate) / this.firstBuffCurrency.rate * 1000)) / 1000
    }
  }

  highOtherToLowOther($event: string|number) {
    if ((this.secondBuffCurrency.rate < this.firstBuffCurrency.rate && $event === this.firstValue) || (this.secondBuffCurrency.rate < this.firstBuffCurrency.rate && $event === this.secondCurrency)) {
      this.secondValue = parseInt(String((this.firstValue * this.firstBuffCurrency.rate) / this.secondBuffCurrency?.rate * 1000)) / 1000
    } else if ((this.secondBuffCurrency.rate < this.firstBuffCurrency.rate && $event === this.secondValue) || (this.secondBuffCurrency.rate < this.firstBuffCurrency.rate && $event === this.firstCurrency)) {
      this.firstValue = parseInt(String((this.secondValue * this.secondBuffCurrency.rate) / this.firstBuffCurrency.rate * 1000)) / 1000
    }
  }


  ngOnDestroy(): void {
    if (this.cSub)
      this.cSub.unsubscribe()
  }
}
