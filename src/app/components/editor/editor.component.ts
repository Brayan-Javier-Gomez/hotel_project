import { Component, OnInit } from '@angular/core';

import { HotelService } from '../../services/hotel.service';

import { hotelModel } from '../../interfaces/hotelModel';

import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',

  templateUrl: './editor.component.html',

  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  suites: hotelModel;

  nuevo;

  data = new hotelModel();

  constructor(public hotelService: HotelService,

              private router: ActivatedRoute,

              private navigate: Router) {

    this.nuevo = false;

  }

  ngOnInit(): void {

    if (this.router.snapshot.paramMap.get('id') === 'new') {

      this.nuevo = true;

    } else {

      const id = this.router.snapshot.paramMap.get('id');

      this.hotelService.get_habitaciones_user(id).subscribe((data: hotelModel) => {

        Swal.fire({

          icon: 'info',

          title: 'Espere por favor',

          allowOutsideClick: false

        });

        Swal.showLoading();

        this.data = data;

        this.data.habitaciones._id = id;

        Swal.close();

      });

    }


  }

  // async obtener() {

  //   await this.hotelService.get_habitaciones().then((data) => {

  //     this.suites = data;

  //   });

  // }

  editar(form: NgForm): any {

    if (form.invalid) {

      console.log('formulario invalido');

      return;

    }

    this.data.habitaciones.disponible = false;

    this.hotelService.edit_user(this.data).subscribe((data) => {

      Swal.fire({

        title: 'Success',

        text: `The reservation Nº ${this.data.habitaciones.codigo} as been updated`,

        icon: 'success'

      });

      setTimeout(() => {

        this.navigate.navigate(['/dashboard']);

      }, 1000);

    });

  }

}
