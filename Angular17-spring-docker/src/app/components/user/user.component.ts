import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../services/alerts/alert.service';
import { Alert } from '../../interfaces/alert';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SpanishPaginatorService } from '../shared/mat-table/services/spanish-paginator.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useClass: SpanishPaginatorService }
  ]
})
export class UserComponent {

  public alertServiceObs$!: Observable<Alert>;
  private userService: UserService = inject(UserService);
  private userSubscription: Subscription = new Subscription();

  displayedColumns: string[] = ['id', 'name', 'Acciones'];
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Inyectamos el servicio de usuarios
  constructor(public readonly alertService: AlertService) {
    //Obtenemos service para las alertas
    this.alertServiceObs$ = this.alertService.initObsAlert();
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    //Obtenemos los usuarios
    this.loadTableUsers();

  }

  ngAfterViewInit() {
    //reactiva paginator y sort al cambiar de ruta de navegacion y regresar a la principal
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    //se desuscribe para evitar desborde de memoria
    this.userSubscription.unsubscribe();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Funcion para eliminar usuario
  deleteUser(id: number = 0) {
    // preguntar si se desea eliminar el usuario
    if (confirm("¿Estas seguro de eliminar este usuario?")) {
      this.userSubscription = this.userService.deleteUser(id).subscribe({
        next: (response) => {
          console.log("Usuario Eliminado con exito => " + JSON.stringify(response));
          this.alertService.success("Usuario Eliminado con exito => " + JSON.stringify(response));
        },
        error: (error) => {
          console.error("Creo que algo salio mal, Error => " + JSON.stringify(error));
          this.alertService.error("Creo que algo salio mal, Error => " + JSON.stringify(error));
        }
      });

    }
  }

  loadTableUsers(): void {
    this.userSubscription = this.userService.getUsers().subscribe({
      next: (response) => {

        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error("Creo que algo salio mal, Error => " + JSON.stringify(error));
        this.alertService.error("Creo que algo salio mal, Error => " + JSON.stringify(error));
      }
    });
  }

}
