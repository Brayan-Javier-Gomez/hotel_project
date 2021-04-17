import { Component, OnInit } from '@angular/core';

import { HotelService } from '../../services/hotel.service';

import { hotelModel } from '../../interfaces/hotelModel';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({

  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public cargado = false;

  public role: any;

  public suites: hotelModel;

  public contador;

  constructor(public hotelService: HotelService) {

    this.get_rol();

  }

  ngOnInit(): void {

    this.get_rol();

    this.obtener();

  }



  get_rol() {

    this.role = localStorage.getItem('role');


  }

  // obtener todos los registros

  async obtener() {

    if (this.role === 'admin') {

      this.suites = await this.hotelService.get_habitaciones();
      this.cargado = true;
    }

    if (this.role === 'user') {

      this.suites = await this.hotelService.get_habitaciones();

      this.contador = this.suites.elementos;

      this.cargado = true;

    }

    if (this.suites.habitaciones) {


    }
    console.log(this.cargado);

  }

  eliminar(suite) {

    Swal.fire({

      title: 'are you sure to delete it?',

      text: 'after deleted you cant recovery data.',

      icon: 'question',

      showCancelButton: true,

      showConfirmButton: true,

      confirmButtonColor: 'green',

      allowOutsideClick: false

    }).then(res => {

      this.hotelService.delete_user(suite._id).subscribe();

      location.reload();

    })

  }

  // obtener_data(){

  // this.suites = this.hotelService.get_habitaciones_user().subscribe((data)=>{

  //   console.log(data);

  // });

  // }

  nueva_Reserva() {

    const contador = this.suites.elementos;

    const body = {

      usuario: 'disponible',

      codigo: contador + 1

    }

    this.hotelService.create_reservation(body).subscribe((data) => {

      location.reload();

    });

  }

}
