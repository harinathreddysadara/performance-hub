import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./settings.scss']
})
export class Settings implements OnInit {
  settingsForm!: FormGroup;
  settingsId?: number;
  loading = false;
  submitError = '';
  submitSuccess = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      reviewScore: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      reviewerName: ['', Validators.required],
      feedback: [''],
      theme: ['light']
    });

    this.employeeService.getSettings().subscribe({
      next: data => {
        if (Array.isArray(data) && data.length > 0) {
      const firstSetting = data[0];
      this.settingsId = firstSetting.id;
      this.settingsForm.patchValue(firstSetting);
      this.cdr.detectChanges();
    }
      }
    });
  }

onSubmit(): void {
  this.submitError = '';
  this.submitSuccess = false;
  if (this.settingsForm.valid) {
    this.loading = true;
    const settings = this.settingsForm.value;

    const update$ = this.settingsId
      ? this.employeeService.updateSettings(this.settingsId, settings) 
      : this.employeeService.createSettings(settings);                

    update$.subscribe({
      next: response => {
        this.loading = false;
        this.submitSuccess = true;
        window.alert('Settings saved successfully!');
        this.employeeService.getSettings().subscribe({
          next: list => {
            if (Array.isArray(list) && list.length > 0) {
              const firstSetting = list[0];
              this.settingsId = firstSetting.id;
              this.settingsForm.patchValue(firstSetting);
              this.cdr.detectChanges();
            }
          }
        });
      },
      error: err => {
        this.loading = false;
        this.submitError = 'Error updating settings';
        window.alert('Failed to save settings. Please try again.');
        this.cdr.detectChanges();
      }
    });
  } else {
    this.settingsForm.markAllAsTouched();
    this.submitError = 'Please fill in all required fields correctly.';
    window.alert('Form is invalid. Please check your entries.');
    this.cdr.detectChanges();
  }
}



  onCancel(): void {
    this.settingsForm.reset({
      reviewScore: 8,
      reviewerName: '',
      feedback: '',
      theme: 'light'
    });
    this.settingsId = undefined;
    this.submitError = '';
    this.submitSuccess = false;
    this.cdr.detectChanges();
  }
}
