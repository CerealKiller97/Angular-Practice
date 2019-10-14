import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem("access_token");

    if (token === null) {
      return false;
    }

    const jwtService: JwtHelperService = new JwtHelperService();

    return !jwtService.isTokenExpired(token);
  }

  public login(login: Login): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}/auth/login`,
      login
    );
  }
}
