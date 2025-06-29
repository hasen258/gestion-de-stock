import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { UserService } from '../../services/user.service';
import { CategorieService } from '../../services/categorie.servie';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('notification') notificationComponent!: NotificationComponent;
  namecat = '';
  password='';
  email='';
  nameuse='';
  user:any ;
  categorie : any ;
  categories : any[]= [];
  users: any[]=[];
  numbre = 0;
  Produit = '';
  id='';
  qte=0;
  price=0;
  name='';
  data: any[] = [];
  error: string = '';
  random= 0;
  i=0;
  obj:any;
  cat:any;
  use:any;
   


  isopen= false;
  constructor(private router: Router,private userService:UserService,private categoriedata:CategorieService , private authService:AuthService) 
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showWelcomeNotification();
      }
    });
  }

  ngOnInit() {
    this.showWelcomeNotification();
  }

  showWelcomeNotification() {
    this.authService.verif().subscribe({
      next: (isAuth) => {
        if (isAuth) {
          this.userService.getUser().subscribe({
            next: (userArr) => {
              this.user = userArr;
              if (this.user.name ) {
                this.notificationComponent?.showNotification('Welcome', `Hello, ${this.user.name}!`);
              } else {
                this.notificationComponent?.showNotification('Welcome', 'You are logged in!');
              }
            },
            error: () => {
              this.notificationComponent?.showNotification('Welcome', 'You are logged in!');
            }
          });
        } else {
          this.notificationComponent?.showNotification('Not Logged In', 'Please log in to continue.');
        }
      },
      error: () => {
        this.notificationComponent?.showNotification('Not Logged In', 'Please log in to continue.');
      }
    });
  }

  gettoken(){
    console.log(localStorage.getItem('token') );
  }
  open(){
    this.isopen=!this.isopen;
  }
}
