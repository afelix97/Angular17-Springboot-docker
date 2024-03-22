import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users$ = new BehaviorSubject<User[]>([]);

  //Endpoint del Backend
  private backendURL: string = "http://localhost:8080/api/v1/users";


  constructor(private httpClient: HttpClient) {
    this.loadUsers();
  }

  usuarios: User[] = [
    { id: 1, name: 'Roberto Sanchez' },
    { id: 2, name: 'Carlos Juarez' },
    { id: 3, name: 'Juan Perez' },
    { id: 4, name: 'Pedro Zazueta' },
    { id: 5, name: 'Luis Felix' },
    { id: 6, name: 'Carlos Urias' },
    { id: 7, name: 'Juan Gonzalez' },
    { id: 8, name: 'Pedro Santos' },
    { id: 9, name: 'Luis Obeso' },
    { id: 10, name: 'Roberto Valle' }
  ];

  private loadUsers() {
    this.httpClient.get<User[]>(`${this.backendURL}`).subscribe(users => {
      this.users$.next(users);
    });
  }

  getUsers(): Observable<User[]> {

    return this.users$.asObservable();
  }

  getUser(id: number): User {
    return this.usuarios[id];
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.backendURL}`, user).pipe(
      tap(savedUser => {
        // Agregar el nuevo usuario a la lista actual de usuarios
        const currentUsers = this.users$.value;
        const updatedUsers = [...currentUsers, savedUser];
        this.users$.next(updatedUsers);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.backendURL}/${id}`).pipe(
      tap(() => {
        // Eliminar el usuario de la lista actual de usuarios
        this.loadUsers();
      })
    );
  }

}
