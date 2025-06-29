import { Component, Input, OnInit, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [NgxEchartsModule,CommonModule],
  template: `
    <div class="bg-slate-50 dark:bg-gray-800 rounded-xl p-1 m-2 shadow-lg mb-5">
      <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">Products by Category</h3>
      <div *ngIf="isBrowser" echarts [options]="chartOption" class="h-60 w-full"></div>
      <div *ngIf="!isBrowser" class="h-80 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
        Chart loading...
      </div>
    </div>
  `,
  styles: []
})
export class CategoryChartComponent implements OnInit, OnChanges {
  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  
  chartOption: EChartsOption = {};
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.updateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['chartData'] || changes['chartLabels']) && this.isBrowser) {
      console.log('Category chart received new data:', {
        chartData: this.chartData,
        chartLabels: this.chartLabels
      });
      this.updateChart();
    }
  }

  private updateChart() {
    if (!this.chartData || this.chartData.length === 0 || !this.chartLabels || this.chartLabels.length === 0) {
      return;
    }

    this.chartOption = {
      title: {
        text: 'Products by Category',
        left: 'center',
        textStyle: {
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.chartLabels,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Number of Products',
          type: 'bar',
          barWidth: '60%',
          data: this.chartData,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#6366f1' },
                { offset: 1, color: '#0ea5e9' }
              ]
            }
          }
        }
      ]
    };
  }
} 