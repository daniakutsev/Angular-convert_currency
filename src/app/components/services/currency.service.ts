import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  currentDate: Date | string = new Date()
  url: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&'

  getCurrentDate() {
    this.currentDate = formatDate(this.currentDate, 'YYYYMMdd', 'en-US')
  }

  getAllCurrencies() {
    this.getCurrentDate()
    return this.http.get(`${this.url}date=${this.currentDate}`)
  }


}
