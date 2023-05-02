import { inject } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

export function authGuard() {
    const user = inject(UserService).getUser()
    if (user) return true
    else {
        inject(Router).navigateByUrl('/')
        return false
    }
}