import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpOptionHeader } from './dto/HttpOptionHeader';
import { ParamsHandlerService } from '@services/params-handler.service';

@Injectable({ providedIn: 'root' })
export class HeaderFactoryService {

  constructor(private paramsHandlerService: ParamsHandlerService) { }

  public getHeaderDefault(): HttpHeaders { return this.createHeadersBase(); }

  public getHeaderWithToken(): HttpHeaders { return this.createHeadersWithToken(); }

  public getOptionsDefault() {
    return {
      headers: this.getHeaderDefault(),
      observe: 'response' as const,
      responseType: 'json' as const
    };
  }

  public getOptionsWithToken() {
    return {
      headers: this.createHeadersWithToken(),
      observe: 'response' as const,
      responseType: 'json' as const
    };
  }

  private createHeadersBase() : HttpHeaders {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return headers;
  }

  private createHeadersWithToken() {

    let userToken = this.paramsHandlerService.getTokenParam();

    this.validToken(userToken);

    let headers = this.createHeadersBase();
    headers = headers.set('Authorization', 'Bearer ' + userToken);

    return headers;
  }

  private validToken(userToken: string) : void {

    if ((userToken == null) || (userToken == '')) {

      this.paramsHandlerService.RemoveAll();
    }
  }

  /*
  private createHeaders(options: HttpOptionHeader[] | void): HttpHeaders {

    let headers = this.createHeadersBase();

    if (options != null) {
      options.forEach(option => headers = headers.set(option.key, option.value));
    }

    return headers;
  }
  */
}
