import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  labels:any;
  data:any;
  config:any;
  myChart:any;

  constructor() { }


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['C', 'Java', 'Python', 'Java Script', 'Php '];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [2, 3, 2, 6,1], label: 'Question'},
    {data: [3,6, 5, 11,3], label: 'Answer'}
  ];



  ngOnInit(): void {
    this.labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ];
this.data = {
  labels: this.labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
     
 
  }]
};

this.config = {
  type: 'bar',
  data: this.data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

this.myChart = new Chart(
  (<HTMLCanvasElement>document.getElementById('myChart')),
  this.config
);

  }

}
