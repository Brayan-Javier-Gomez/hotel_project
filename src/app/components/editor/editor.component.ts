import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { hotelModel } from '../../interfaces/hotelModel';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  data = new hotelModel();

  constructor(public hotel_service: HotelService,
    private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    console.log(id);
    this.hotel_service.get_habitaciones_user(id).subscribe((data: hotelModel) => {

      Swal.fire({
        icon: 'info',
        title: 'Espere por favor',
        allowOutsideClick: false
      });
      Swal.showLoading();

      this.data = data;
      this.data.habitaciones._id = id;
      Swal.close();
      console.log(data.habitaciones._id);
    });
  }


  editar(form: NgForm): any {

    if (form.invalid) {
      console.log('formulario invalido');
      return;
    }
    this.data.habitaciones.disponible = false;
    this.hotel_service.edit_user(this.data).subscribe((data) => {
      console.log(data);
    });

    console.log(form);

  }
}
