import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parametre',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './parametre.component.html',
  styleUrl: './parametre.component.css'
})


export class ParametreComponent {

  constructor(private userService:UserService, private authService:AuthService,private router: Router){}
  user:any = {name:'',
    pathimage:'',};
  numPro=0;
  numCat=0;
  newPassword= {
    password:''
  };
  newName={
    name:''
  };
  ngOnInit():void {
    console.log('ProfileComponent initialized');
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
importimg(event: any): void {
  const file = event.target.files[0];
  console.log('Selected file:', file);
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      
    reader.readAsDataURL(file);
    console.log('Image file selected:', file.name);
  }}
  this.user.pathimage = `/assets/${file.name}`;
      this.userService.loadpath(this.user.pathimage).subscribe({
        next: () => {
          console.log('Image uploaded successfully:', this.user.pathimage);
        }
      , error: (error) => {
          console.error('Error uploading image:', error);
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
