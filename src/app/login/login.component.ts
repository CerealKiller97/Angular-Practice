import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private subsription: Subscription;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  public authenticate() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();
      this.subsription = this.authService.login(data).subscribe(
        ({ access_token }) => {
          localStorage.setItem("access_token", access_token);
          this.router.navigate(["/dashboard"]);
        },
        (error: HttpErrorResponse) => console.log(error.message)
      );
    }
  }
}
