import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title:any;
  constructor(private http:HttpClient){

  }

  ngOnInit(){
this.http.get('https://krcnephrology.herokuapp.com/index.php').subscribe(data=>{
  this.title = data;
})
  }
}
