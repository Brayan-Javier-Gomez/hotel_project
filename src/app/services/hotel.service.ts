import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { hotelModel } from '../interfaces/hotelModel';

import { map } from 'rxjs/operators';
@Injectable({

  providedIn: 'root'

})

export class HotelService {

  url = 'https://hitman-hotel-project.herokuapp.com/habitaciones';

  constructor(public http: HttpClient) { }

  data_user;

  get_habitaciones(): Promise<any> {

    this.data_user = this.http.get(`${this.url}`).toPromise();

    return this.data_user;

  }

  get_habitaciones_user(id: string) {

    return this.http.get(`${this.url}/${id}`);

  }

  delete_user(id: string) {

    return this.http.delete(`${this.url}/${id}`);

  }

  edit_user(body: hotelModel) {

    const data = {

      usuario: body.habitaciones.usuario,

      cedula: body.habitaciones.cedula,

      celular: body.habitaciones.celular,

      disponible: body.habitaciones.disponible

    };

    const id = body.habitaciones._id;

    return this.http.put(`${this.url}/${id}`, data);

  }

  create_reservation(body) {

    return this.http.post(`${this.url}`, body);

  }

}


