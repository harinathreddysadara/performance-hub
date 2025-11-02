
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee-type';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './view-employee.html',
  styleUrls: ['./view-employee.scss'],
  imports: [CommonModule]
})
export class ViewEmployee implements OnInit {
  selectedEmployee!: Employee | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployees().subscribe(employees => {
      this.selectedEmployee = employees.find(emp => emp.id === id);
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  goToReports() {
    this.router.navigate(['reports']);
  }
}
