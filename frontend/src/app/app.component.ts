import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HomeComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
