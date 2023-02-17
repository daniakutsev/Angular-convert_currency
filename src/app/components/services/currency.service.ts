import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {ICurrency} from "./currency.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService implements OnInit {

  constructor(private http: HttpClient) {
  }

  usd: ICurrency
  eur: ICurrency
  allCurrencies:ICurrency[]

  currentDate: Date | string = new Date()
  url: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&'

  getCurrentDate() {
    this.currentDate = formatDate(this.currentDate, 'YYYYMMdd', 'en-US')
  }

  getAllCurrencies() {
    this.getCurrentDate()
    return this.http.get(`${this.url}date=${this.currentDate}`)
  }

  ngOnInit(): void {

  }
}
