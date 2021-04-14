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

  data_user: hotelModel[];

  get_habitaciones(): Promise<any> {

    return this.http.get(`${this.url}`).toPromise();

  }

  get_habitaciones_user() {

    return this.http.get(`${this.url}`);

  }



  // crear_habitacion(suite: hotelModel){

  //   return this.http.post(`${this.url}` , suite);

  // }

}


