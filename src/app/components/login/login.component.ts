import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public role;
  constructor() { }

  ngOnInit(): void {
  }


login(rol:string){

this.role = rol;
console.log(this.role);
localStorage.setItem('role' , this.role);
}
}
