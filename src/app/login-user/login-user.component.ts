import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InfoDialogComponent } from '../utilities/info-dialog/info-dialog.component';
import { LoginUserService } from './login-user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  hide = true;
  hide1 = true;
  hide2 = true;
  pwdForm!: FormGroup;
  isShowNewPwd: boolean = true;
  currentPwd: any;
  isCheckPwd: boolean = true;
  constructor(private formBuilder: FormBuilder, private luService: LoginUserService, 
    private dialog: MatDialog, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.pwd();
    this.getPwd();
  }

  pwd() {
    this.pwdForm = this.formBuilder.group(
      {
        name: [''],
        password: [''],
        newPwd: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
        reEnterPwd: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
      }
    );
  }
  getPwdForm() {
    return this.pwdForm.controls
  }

  getPwd() {
    const org_id = localStorage.getItem('org_id');
    const branch_id = localStorage.getItem('branch_id');
    const user_id = localStorage.getItem('user_id');
    this.luService.getPassword(org_id, branch_id, user_id).subscribe(data=>{
      console.log(data);
      this.currentPwd = data.results.pwd;
    })
  }

  submit() {
    if(this.pwdForm.controls.newPwd.errors || this.pwdForm.controls.reEnterPwd.errors) {
      console.log(this.pwdForm.controls)
      this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Please Password should be atleast 8 characters long and should contain one number,one character, one lowercase letters, uppercase letters and one special character!!!'
      })
      return;
    }else if(this.pwdForm.controls.newPwd.value !== this.pwdForm.controls.reEnterPwd.value){
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Please Enter correct password!!!'
      })
      return;
    }
    let params={
      "org_id": localStorage.getItem('org_id'),
      "branch_id": localStorage.getItem('branch_id'),
      "user_id": localStorage.getItem('user_id'),
      "pwd": this.pwdForm.controls.newPwd.value
    }
    this.luService.changePassword(params).subscribe(data=>{
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Password Changed Successfully!!!'
      })
      this.pwdForm.reset();
      this.isShowNewPwd = true;
      this.isCheckPwd = true;
      this.authService.logout();
      this.router.navigate(['/login']);
    })
  }

  check() {
    if(this.currentPwd == this.pwdForm.controls.password.value) {
      this.isShowNewPwd = false;
      this.isCheckPwd = false;
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Correct!!!'
      })
    }else {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: 'Wrong Password please Enter Correct Password'
      })
    }
    this.getPwdForm()
  }

}
