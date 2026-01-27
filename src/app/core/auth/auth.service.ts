import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { catchError, Observable, of, switchMap, throwError, map } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private _localStorageService = inject(LocalStorageService);
    private _navigationService = inject(NavigationService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }


    /**
 * User Permission
 */

    hasPermission(permission: string | string[]) {
        const userData = this._localStorageService.getItem('profile').user;
        // Assuming user data is stored under 'user' key
        if (userData && userData.permissions) {
            const userPermissions = userData.permissions.map(permission => permission.name.toUpperCase());
            // console.log(userPermissions);
            if (!permission) {
                return true; // No specific permission required, so permission is granted.
            }
            if (Array.isArray(permission)) {
                // If permission is an array, check if any of the permissions exist in userPermissions
                return permission.some(p => userPermissions.includes(p.toUpperCase()));
            } else {
                // If permission is a single string, check if it exists in userPermissions
                return userPermissions.includes(permission.toUpperCase());
            }
        }
        return false; // No user data or permissions found, so permission is denied.
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { username?: string; email?: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.api.baseUrl}/api/auth/login`, credentials).pipe(
            switchMap((response: any) => {
                const token = response?.accessToken ?? response?.token;

                if (!token) {
                    return throwError('Authentication token missing in response.');
                }

                // Store the access token in the local storage
                this.accessToken = token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service if present
                if (response?.user) {
                    this._userService.user = response.user;
                }

                // Fetch and publish navigation before resolving
                return this._navigationService.get().pipe(map(() => response));
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Trust existing access token for session restore
        if (!this.accessToken || AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        this._authenticated = true;
        return this._navigationService.get().pipe(map(() => true));
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
