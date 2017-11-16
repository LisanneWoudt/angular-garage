import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from './car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  cars: Car[];
  filter: string;
  filtered: boolean;
  add_car: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() :
    void {
    this.getCars();
    }

  getCars(): void {
    this.http.get<Car[]>('/garage/cars').subscribe(data => {
            this.cars = data;
            this.filtered = false;
            this.add_car = true;
          })
        }

  addCar(){
     this.router.navigate(['/add']);
     this.add_car = false;
  }

  showDetails(id: string){
     this.router.navigate(['/detail/'+id]);
     this.add_car = false;
  }

  applyFilter(filter: string): void {
    this.add_car = false;
    const url = `/garage/filter/${filter}`;
    this.http.get<Car[]>(url).subscribe(data => {
            this.cars = data;
          })
    this.filter = '';
    this.filtered = true;
        }
  }
