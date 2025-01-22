import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  students:any[] = [];
  student: any = { id: null, name: '', city: '' };
  isEditMode = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  addStudent(): void {
    this.studentService.addStudent(this.student).subscribe(() => {
      this.getStudents();
      this.student = { id: null, name: '', city: '' };
    });
  }

  editStudent(student: any): void {
    this.student = { ...student };
    this.isEditMode = true;
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.student).subscribe(() => {
      this.getStudents();
      this.isEditMode = false;
      this.student = { id: null, name: '', city: '' };
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.getStudents();
    });
  }
}
