import { Injectable } from '@angular/core';
import { ConfigurationSettingsService } from './configuration-settings.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Login } from './dto/Login';
import { HeaderFactoryService } from './header-factory.service';
import { RequestCommonFunctionHandlerService } from './request-common-function-handler.service';
import { User } from '@services/dto/User';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private configService: ConfigurationSettingsService,
              private httpClient: HttpClient,
              private headerFactory: HeaderFactoryService,
              private commonFunctionHandlerService: RequestCommonFunctionHandlerService) { }

  private readonly ERROR_MESSAGE_4XX = "The user does not have permission.";


  public async login(email: string, password: string) : Promise<User> {

    let user : User;
    var httpLogin = this.createPostObservable(email, password);

    await lastValueFrom(httpLogin)
          .then(response => {

            if (response.ok) {

              user = response.body as User;

            } else { this.commonFunctionHandlerService.throwGeneralExceptionResponse(response); }

          })
          .catch((reason: HttpErrorResponse) => {

            this.commonFunctionHandlerService.throwExceptionErro4XX(reason, this.ERROR_MESSAGE_4XX);
            this.commonFunctionHandlerService.throwExceptionErro5XX(reason);
            this.commonFunctionHandlerService.throwGeneralException(reason);
          })

    return user;

  }

  private createPostObservable(email: string, password: string) : Observable<HttpResponse<Object>>  {

    return this.httpClient.post(this.configService.getUrlLogin(),
                                this.mapLoginRequest(email, password),
                                this.headerFactory.getOptionsDefault());
  }

  private mapLoginRequest(email: string, password: string) : Login {

    return {
      email: email,
      password: password
    };
  }

}

