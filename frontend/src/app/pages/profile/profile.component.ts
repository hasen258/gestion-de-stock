import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private userService:UserService, private authService:AuthService,private router: Router){}
  user:any = {};
  numPro=0;
  numCat=0;
  newPassword= {
    password:''
  };
  countcategorie:any;
  newName={
    name:''
  };
  ngOnInit():void {
    console.log('ProfileComponent initialized');
    this.userService.count().subscribe({
        next:(data)=>{
          this.countcategorie=data;
          console.log("tessssssssssssss",this.countcategorie);
        }
        , error: (error) => {
        console.error('Error fetching number of products:', error);
      }
      })
    
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        console.log('User data fetched successfully:', this.user);
      }
      , error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
    this.userService.numPro().subscribe({
      next: (data) => {
        this.numPro = data;
        console.log('Number of products fetched successfully:', this.numPro);
      }
      , error: (error) => {
        console.error('Error fetching number of products:', error);
      }
    });
    this.userService.numCat().subscribe({
      next: (data) => {
        this.numCat = data;
        console.log('Number of products fetched successfully:', this.numCat);
      }
      , error: (error) => {
        console.error('Error fetching number of products:', error);
      }
    });
      
}
changePassword() {
  this.authService.modPass(this.newPassword).subscribe({
    next:(data)=>{
      console.log(data);
      window.location.reload();
      this.router.navigateByUrl('/');
    }
  })
}
changeName() {
   this.authService.modName(this.newName).subscribe({
    next:(data)=>{
      console.log(data);
      window.location.reload();
      this.router.navigateByUrl('/');
    }
   })
}
}
