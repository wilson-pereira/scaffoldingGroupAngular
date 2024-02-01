import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { CommonUtilServiceService } from '@services/common-util-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private loadService: CommonUtilServiceService) {}

    ngOnInit() {
        this.renderer.addClass(document.querySelector('app-root'),'login-page');
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });

        this.loadService.LoaderOFF();
    }

    loginByAuth() {

      this.loadService.LoaderON();

      if (this.loginForm.valid) {

        this.isAuthLoading = true;

        this.appService.loginByAuth(this.loginForm.value);

        this.isAuthLoading = false;

        this.loadService.LoaderOFF();

      } else {
          this.toastr.error('Form is not valid!');
          this.loadService.LoaderOFF();
      }
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
