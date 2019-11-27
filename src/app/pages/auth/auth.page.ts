import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    private isLoading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit() {}

    onLogin(email: string, password: string) {
        this.isLoading = true;

        this.loadingCtrl.create({ keyboardClose: true, message: 'Ingresando...'})
            .then(loadingEl => {
                this.authService.login(email, password);
                loadingEl.present();
                setTimeout(() => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    this.router.navigateByUrl('/home/tabs/dashboard');
                }, 1500);
            });
    }

    onSubmit() {
        // this.authService
    }

}