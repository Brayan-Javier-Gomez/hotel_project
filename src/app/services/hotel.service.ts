import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hotelModel } from '../interfaces/hotelModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  url = 'http://localhost:3001/habitaciones'

  constructor(public http: HttpClient) { }

  data_user;

  get_habitaciones(): Promise<any> {

    return this.http.get(`${this.url}`).toPromise();

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

    console.log(id);
    return this.http.put(`${this.url}/${id}`, data);
  }

}


