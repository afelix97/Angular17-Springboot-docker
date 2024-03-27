import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alerts/alert.service';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  //Observable de usuarios
  public usersData$!: Observable<User[]>;

  public alertServiceObs$!: Observable<Alert>;

  //Inyectamos el servicio de usuarios
  constructor(private readonly userService: UserService, public readonly alertService: AlertService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //Obtenemos los usuarios
    this.usersData$ = this.userService.getUsers();

    //Obtenemos service para las alertas
    this.alertServiceObs$ = this.alertService.initObsAlert();
  }

  //Funcion para eliminar usuario
  deleteUser(id: number = 0) {
    // preguntar si se desea eliminar el usuario
    if (confirm("¿Estas seguro de eliminar este usuario?")) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          console.log("Usuario Eliminado con exito => " + JSON.stringify(response));
          this.alertService.success("Usuario Eliminado con exito => " + JSON.stringify(response));
        },
        error: (error) => {
          console.error("Creo que algo salio mal, Error => " + error);
          this.alertService.error("Creo que algo salio mal, Error => " + error);
        }
      });
    }
  }
}
