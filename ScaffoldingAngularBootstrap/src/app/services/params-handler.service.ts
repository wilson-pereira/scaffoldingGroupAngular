import { Injectable } from '@angular/core';
import { User } from './dto/User';

@Injectable({ providedIn: 'root' })
export class ParamsHandlerService {
  
  readonly TOKEN_PARAM_STORAGE : string = 'token';
  readonly PROFILE_PARAM_STORAGE : string = 'profile';  

  constructor() { }

  public RemoveAll() : void {
    this.removeTokenParam();
    this.removeProfileParam();    
  }


  /* ****************************************************************
   * ABOUT TOKEN PARAM
   ***************************************************************** */
  public setToken(token: string) : void { localStorage.setItem(this.TOKEN_PARAM_STORAGE, token); }

  public removeTokenParam() : void { localStorage.removeItem(this.TOKEN_PARAM_STORAGE); }

  public getTokenParam() : string { return localStorage.getItem(this.TOKEN_PARAM_STORAGE);  }

  /* ****************************************************************
   * ABOUT PROFILE PARAM
   ***************************************************************** */
  public setProfileParam(param:User) : void { localStorage.setItem(this.PROFILE_PARAM_STORAGE, JSON.stringify(param)); }

  public removeProfileParam() : void { localStorage.removeItem(this.PROFILE_PARAM_STORAGE); }

  public getProfileParam() : User {

    let param : User = {
      createdAt: null,
      email: '',
      name: '',
      token: ''
    }

    const paramString = localStorage.getItem(this.PROFILE_PARAM_STORAGE);

    if ((paramString != null) && (paramString != '')) param = JSON.parse(paramString) as User;

    return param;
  }
  
}
