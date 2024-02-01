/*
*
* This service uses the concept of a facade pattern for pages.
*
*/

import { Injectable } from '@angular/core';

import { User } from './dto/User';
import { UserService } from './backends/user.service';
import { MockService } from './mock.service';



@Injectable({ providedIn: 'root' })
export class FacadeApplicationService {

  constructor(private userService: UserService,
              private mockService: MockService) { }

  /********************************************************************************** */
  /********************************************************************************** */
  /********************************************************************************** */
  // LOGIN METHODS
  /********************************************************************************** */
  /********************************************************************************** */
  /********************************************************************************** */

  public async getLogin(email: string, password: string) : Promise<User> {

    //return await this.userService.login(email, password);
    return await this.mockService.login(email, password);
  }

}
