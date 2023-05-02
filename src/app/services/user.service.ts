import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError, map, of } from 'rxjs';
import { storageService } from './async-storage.service.user';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';

const ENTITY = 'users';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  private _loggedInUser$ = new BehaviorSubject<User[]>([]);
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor() {
    // const user = JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null');
    // if (!user || user.length === 0) {
    //     localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(this._createUsers()));
    // }
  }
  public get loggedInUser(): User {
    const user = localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
    console.log(user, 'p');

    return user ? JSON.parse(user) : null;
  }

  signup(userName: string): Observable<User | any> {
    const newUser: User = { name: userName, coins: 100, moves: [] };
    const user = localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newUser));
    return of(user as any);
  }

  getUserMoves(contact?: Contact) {
    const user = this.getUser();
    if (user) {
      if (contact) {
        return user.moves.filter(move => move.to.name === contact.name);
      } else {
        return user.moves.slice(-3).reverse();
      }
    } else {
      return [];
    }
  }
  public loadUsers(): Observable<User[]> {
    return from(storageService.query(ENTITY))
      .pipe(
        tap(users => {
          this._users$.next(users);
        }),
        retry(1),
        catchError(this._handleError)
      ) as Observable<User[]>;
  }

  // public getUser(): User {
  //     const user = localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
  //     console.log(user, 'p');
  //     return user ? JSON.parse(user) : null;
  // }
  getUser(): User | undefined {
    const user = storageService.load(STORAGE_KEY_LOGGEDIN_USER);
    if (user) {
      user.moves = Array.isArray(user.moves) ? user.moves : [];
      return user as User;
    } else {
      return undefined;
    }
  }

  addMove(contact: string, amount: number): Observable<User | boolean> {
    return new Observable(observer => {
      const user = this.getUser();
      if (user && user.coins !== undefined && user.coins >= amount) {
        const newMove = { to: contact, amount, at: Date.now() };
        const updatedUser: User | any = {
          ...user,
          coins: user.coins - amount,
          moves: [...user.moves, newMove]
        };
        storageService.store(STORAGE_KEY_LOGGEDIN_USER, updatedUser);
        observer.next(updatedUser);
      } else {
        observer.next(false);
      }
      observer.complete();
    })
  }

  private _createUsers() {
    const users = [
      {
        name: "Puki",
        coins: 100,
        moves: [],
        isAdmin: false
      },
      {
        name: "Muki",
        coins: 200,
        moves: [],
        isAdmin: false
      },
      {
        name: "Shuki",
        coins: 150,
        moves: [],
        isAdmin: false
      }
    ];
    return users;
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('error in user service:', err);
    return throwError(() => err);
  }

  private _getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
