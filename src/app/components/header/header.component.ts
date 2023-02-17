import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {ICurrency} from "../services/currency.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() allCurrencies: ICurrency[]

  usdRate: number
  eurRate: number
  cSub: Subscription

  constructor(public currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    console.log(this.allCurrencies)
  }


}
