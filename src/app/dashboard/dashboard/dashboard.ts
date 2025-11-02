import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../../shared/employee.service';
import { DashboardData, Employee } from '../../shared/employee-type';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  dashboard: DashboardData | null = null;
  employees: Employee[] = [];
  trendChartData: any[] = [];
  loading = true;
  colorScheme = 'cool';

  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    forkJoin({
      dashboardData: this.employeeService.getDashboard(),
      employeeList: this.employeeService.getEmployees(),
    }).subscribe({
      next: ({ dashboardData, employeeList }) => {
        this.dashboard = dashboardData;
        this.employees = employeeList;
        this.trendChartData = [
          {
            name: 'Team Performance',
            series: dashboardData.trend.map(item => ({
              name: item.month,
              value: item.score,
            })),
          },
        ];
      },
      error: (error) => {
        console.error('Error loading data', error);
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
