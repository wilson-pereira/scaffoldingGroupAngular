import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import { User } from '@services/dto/User';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user: User = {
      name: '',
      createdAt: new Date(),
      email: '',
      token: ''
    };

    constructor(private appService: AppService) {}

    ngOnInit(): void {

      this.appService
          .getProfile()
          .then(result =>  {

            this.user = result;

            if (result.token == '') {
              this.logout();
            }
          })
          .catch(error => {
            this.logout();
          });
    }

    logout() {
        this.appService.logout();
    }


}
