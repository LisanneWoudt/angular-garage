import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Car } from '../cars/car';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarDetailsComponent implements OnInit {
  @Input() car: Car;
  newStatus: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

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

  nextStatus(status:string): void{
      const id = +this.route.snapshot.paramMap.get('id');
      const url = `/garage/update/${id}`;
      if (status == null || status == 'waiting'){
        this.newStatus = 'processing';
        console.log(this.newStatus);
      }
      else if (status == 'processing'){
        this.newStatus = 'done';
        console.log(this.newStatus);
      }
      else{
        console.log('status done already');
      }

      this.http.put<Car>(url, this.newStatus, {
        headers: new HttpHeaders().set('Content-Type', 'text/plain'),
      }).subscribe(data => {
             console.log(data);
              this.router.navigate(['']);
            })
  }

}
