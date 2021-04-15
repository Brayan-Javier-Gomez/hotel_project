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
  public cargado;
  public role: any;
 

  public suites: hotelModel;



  constructor(public hotelService: HotelService) {
    this.cargado = false;
    console.log(this.cargado);
    this.get_rol();
    this.obtener();

  }

  ngOnInit(): void {


    this.get_rol();
    this.obtener();

  }

  get_rol() {
    if (!localStorage.getItem('role')) {



    }
    this.role = localStorage.getItem('role');
    console.log(this.role);
  }
  // obtener todos los registros

  async obtener() {


    if (this.role === 'admin') {


      this.suites = await this.hotelService.get_habitaciones()
      console.log(this.suites.elementos);

    }

    if (this.role === 'user') {

      for (let i = 0; i < 12; i++) {
        this.suites = await this.hotelService.get_habitaciones();

        if (this.suites.habitaciones[i].disponible === true) {

          //  this.suites = this.data_user;

          console.log(this.suites);
        }
      }
      return this.suites;
    }

    console.log(this.cargado);
  }

  eliminar(suite) {
    this.hotelService.delete_user(suite._id).subscribe();
    
  }

// obtener_data(){
// this.suites = this.hotelService.get_habitaciones_user().subscribe((data)=>{
//   console.log(data);
  
// });

// }

}
