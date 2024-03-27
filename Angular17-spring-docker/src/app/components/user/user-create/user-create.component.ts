import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import { Alert } from '../../../interfaces/alert';
import { AlertService } from '../../../services/alerts/alert.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {

  public alertServiceObs$!: Observable<Alert>;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  //Inyectamos el servicio de usuarios
  constructor(private readonly userService: UserService, private router: Router, public readonly alertService: AlertService) {
    //Obtenemos service para las alertas
    this.alertServiceObs$ = this.alertService.initObsAlert();
  }

  handleSubmit() {
    console.log(this.userForm.valid);
    let body: User = this.userForm.value as User;

    if (this.userForm.valid) {
      //se llama al servicio para crear un usuario y se valida exito o error
      this.userService.createUser(body).subscribe({
        next: (response) => {
          console.log("Usuario creado con exito => " + JSON.stringify(response));

          this.alertService.success("Usuario creado con exito => " + JSON.stringify(response));

          //redireccionar a la lista de usuarios usando ruterlink
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error("Creo que algo salio mal, Error => " + error);
          this.alertService.error("Creo que algo salio mal, Error => " + error);
        }
      });
    }
  }
}
