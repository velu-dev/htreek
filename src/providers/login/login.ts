import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environments } from "../../environments/environments";
import { Observable } from "rxjs/Observable";
import { URLSearchParams } from "@angular/http";

@Injectable()
export class LoginProvider {
  url: any = "";
  user: any;
  headers: any;
  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
    this.url = Environments.url;
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
  }
  doLogin(data): Observable<any> {
    console.log(data);
    return this.http.post(this.url + "auth", data, {
      headers: this.headers
    });
  }
}
