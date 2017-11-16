import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from '../cars/car';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  newCar: Car;
  carId: number;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {}

  addCar(car: Car){
     this.newCar = {brand: car.brand, numberPlate:car.numberPlate, status:null, owner:null};
     console.log('register car');
     console.log(this.newCar);
     this.http.post<Car>('/garage/new_car', this.newCar, {
       headers: new HttpHeaders().set('Content-Type', 'application/json'),
     }).subscribe(data => {
            console.log(data);
             this.router.navigate(['']);
           })
  }

}
