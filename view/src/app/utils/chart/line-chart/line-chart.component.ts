import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  labels:any;
  data:any;
  config:any;
  myChart:any;
  constructor() { }

  

  ngOnInit(): void {

    this.labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];
  
      this.data = {
      labels: this.labels ,
      datasets: [{
        label: 'Active User',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
     };
  
      this.config = {
      type: 'line',
      data: this.data,
      options: {}
    };

    this.myChart = new Chart(
      (<HTMLCanvasElement>document.getElementById('myChart')),
      this.config
    );

    
  }
 
}
