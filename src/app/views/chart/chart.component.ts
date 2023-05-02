import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';


import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
})
export class ChartComponent {
  private newLabel? = 'New label';

  constructor(private http: HttpClient) {
    Chart.register(Annotation)
  }
  

  public ChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public ChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 1.5
      }
    },
    scales: {
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'black',
        },
        ticks: {
          color: 'black'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            borderColor: 'black',
            borderWidth: 6,
            label: {
              display: true,
              position: 'center',
              color: 'black',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public ChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.ChartData.datasets.length; i++) {
      for (let j = 0; j < this.ChartData.datasets[i].data.length; j++) {
        this.ChartData.datasets[i].data[j] = ChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.ChartData.datasets.forEach((x, i) => {
      const num = ChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.ChartData?.labels?.push(`Label ${ this.ChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.ChartData.datasets[2].borderColor = 'black';
    this.ChartData.datasets[2].backgroundColor = `black`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.ChartData.datasets[2].label;
    this.ChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    const url = 'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true';
    this.http.get(url).subscribe((data: any) => {
      this.ChartData = {
        labels: data.values.map((value: any) => value.x),
        datasets: [
          {
            label: 'Market price',
            data: data.values.map((value: any) => value.y),
            fill: true,
            borderColor: 'blue',
            tension: 0.1
          }
        ]
      };
    });
  }
  
}