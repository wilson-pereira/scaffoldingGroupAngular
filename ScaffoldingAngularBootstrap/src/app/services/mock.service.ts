import { Injectable } from '@angular/core';
import { User } from './dto/User';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  public async login(email: string, password: string) : Promise<User> {
    
    
    let user : User = {

      name: 'User Test',
      email: email,      
      createdAt: null,
      token: 'xptoken'
    } ;

    console.log(user);
    return user;

  }

}
