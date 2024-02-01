import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { User} from '@services/dto/User';
import { ParamsHandlerService } from '@services/params-handler.service';
import { FacadeApplicationService } from './facade-application.service';
import { CommonUtilServiceService } from '@services/common-util-service.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private user: User = null;

    constructor(private router: Router,
                private toastr: ToastrService,
                private paramsHandlerService: ParamsHandlerService,
                private financialControlService: FacadeApplicationService,
                private loadService: CommonUtilServiceService) {}

    loginByAuth({email, password}) {

      this.paramsHandlerService.RemoveAll()

      this.loadService.LoaderON();

      this.financialControlService
          .getLogin(email, password)
          .then(result => {

            this.user = result;
            this.paramsHandlerService.setToken(result.token);
            this.paramsHandlerService.setProfileParam(result);

            this.loadService.LoaderOFF();

            this.router.navigate(['/']);
            this.toastr.success('Login success');

          })
          .catch(erro => {
            this.loadService.LoaderOFF();
            this.toastr.error(erro);
          });
    }

    async getProfile() : Promise<User> {
        try {

          var profile = this.paramsHandlerService.getProfileParam();

          if (profile.token == null || profile.token == '') {
            throw new Error("Without profile.");
          }

          return profile;

        } catch (error) {
            this.logout();
        }
    }


    logout() {

        this.paramsHandlerService.RemoveAll()
        this.user = null;
        this.router.navigate(['/login']);
    }
}
