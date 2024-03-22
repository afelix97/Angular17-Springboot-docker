import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  //Inyectamos el servicio de usuarios
  constructor(private readonly userService: UserService) { }

  handleSubmit() {
    console.log(this.userForm.valid);
    let body: User = this.userForm.value as User;

    if (this.userForm.valid) {
      //se llama al servicio para crear un usuario y se valida exito o error
      this.userService.createUser(body).subscribe({
        next: (response) => {
          console.log("Usuario creado con exito => " + JSON.stringify(response));
          this.userForm.reset();
        },
        error: (error) => {
          console.error("Creo que algo salio mal, Error => " + error);
        }
      });
    }
  }
}
