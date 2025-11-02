import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee-type';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.html',
  styleUrls: ['./reports.scss'],
  imports: [CommonModule]
})
export class Reports implements OnInit {
  employees: Employee[] = [];
  currentPage = 1;
  pageSize = 10;
  loading = true;
  Math = Math;

  constructor(private employeeService: EmployeeService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        this.employees = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error fetching employees', err);
        this.cdr.detectChanges();
      }
    });
  }

  get pagedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.employees.length) {
      this.currentPage++;
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  viewEmployee(empId: number) {
  this.router.navigate(['employees', 'view', empId]);
}

}
