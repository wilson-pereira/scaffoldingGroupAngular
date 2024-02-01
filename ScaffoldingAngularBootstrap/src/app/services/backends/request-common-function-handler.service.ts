import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsHandlerService } from '@services/params-handler.service';
import { ErrorMessage } from './dto/ErrorMessage';

@Injectable({
  providedIn: 'root'
})
export class RequestCommonFunctionHandlerService {

  private readonly ERROR_MESSAGE_5XX = "The server cannot handler the request (status: 5xx)";
  private readonly ERROR_MESSAGE_GENERAL = "Something is wrong in the server.";

  constructor(private paramsHandlerService: ParamsHandlerService) { }

  public throwExceptionErro4XX(reason: HttpErrorResponse, error_message?: string) : void {

    if (reason == null) return;

    if ((reason.status >= 400) && (reason.status < 500)) {

      this.getConsoleLog(reason);

      if (reason.status == 400) {

        var errorMessage = reason.error as ErrorMessage;
        throw new Error(errorMessage.message);
      }

      if (reason.status == 401) { this.paramsHandlerService.RemoveAll(); }

      throw new Error(((error_message == null || error_message == '') ? reason.message : error_message));
    }
  }

  public throwExceptionErro5XX(reason: HttpErrorResponse) : void {

    if (reason == null) return;

    if ((reason.status >= 500) && (reason.status < 600)) {

      this.getConsoleLog(reason);

      throw new Error(this.ERROR_MESSAGE_5XX);
    }
  }

  public throwGeneralException(reason: HttpErrorResponse) : void {

    if (reason != null) this.getConsoleLog(reason);
    throw new Error(this.ERROR_MESSAGE_GENERAL);

  }

  public throwGeneralExceptionResponse(reason: HttpResponse<any>) : void {

    console.log(reason.status);
    console.log(reason.statusText);

    throw new Error(this.ERROR_MESSAGE_GENERAL);

  }


  public handleExceptionGroup(reason: HttpErrorResponse) : void {
    this.throwExceptionErro4XX(reason);
    this.throwExceptionErro5XX(reason);
    this.throwGeneralException(reason);
  }

  private getConsoleLog(reason: HttpErrorResponse) : void {
    console.log(reason.status);
    console.log(reason.statusText);
    console.log(reason.url);
    console.log(reason.message);
  }

}
