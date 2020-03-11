import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../consts/question';
import { AddskilltechService } from './addskilltech.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addskilltech',
  templateUrl: './addskilltech.component.html',
  styleUrls: ['./addskilltech.component.scss']
})
export class AddskilltechComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private AddskilltechService: AddskilltechService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      skill: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const skill = this.formGroup.get('skill');
    // console.log('skill to be added is', skill.value);
    this.AddskilltechService.addskill(skill.value).then(data => {
      //console.log('skill added', data);
      this._snackBar.open('Skill Added', 'OK', {
            duration: 2000
          });
    });
  }
}
