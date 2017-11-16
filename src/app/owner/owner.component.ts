import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Car } from '../cars/car';
import { Owner } from './owner';


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerComponent implements OnInit {

  car: Car;
  owner: Owner;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCar();
  }

  getCar(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    const url = `/garage/car/${id}`;
    this.http.get<Car>(url).subscribe(data => {
            this.car = data;
    })
  }



}
