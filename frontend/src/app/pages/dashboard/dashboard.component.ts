import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategorieService } from '../../services/categorie.servie';
import { ProduitService } from '../../services/produit.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CategoryChartComponent } from '../../components/charts/category-chart.component';
import { ProductChartComponent } from '../../components/charts/product-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, CategoryChartComponent, ProductChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  numPro = 0;
  numCat = 0;
  categories: any[] = [];
  countcategorie: any[] = [];
  user: any ={name:'',
    pathimage:'',
  };
  products: any[] = [];
  errorMessage: string = '';
  
  categoryChartData: number[] = [];
  categoryChartLabels: string[] = [];
  productChartData: number[] = [];
  productChartLabels: string[] = [];

  constructor(
    private userService: UserService, 
    private categorieService: CategorieService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user=data;},
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.errorMessage = 'Failed to load user data';
      }
    });
    
    this.userService.numPro().subscribe({
      next: (data) => {
        this.numPro = data;
      },
      error: (error) => {
        console.error('Error fetching product count:', error);
        this.errorMessage = 'Failed to load product count';
      }
    });
    
    this.userService.numCat().subscribe({
      next: (data) => {
        this.numCat = data;
      },
      error: (error) => {
        console.error('Error fetching category count:', error);
        this.errorMessage = 'Failed to load category count';
      }
    });
    
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.errorMessage = 'Failed to load categories';
      }
    });
    
    this.userService.count().subscribe({
      next: (data) => {
        this.countcategorie = data;
        console.log("test",data);
        this.updateCategoryChartData();
      },
      error: (error) => {
        console.error('Error fetching category count data:', error);
        this.errorMessage = 'Failed to load category statistics';
      }
    });
    
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.products = data;
        this.updateProductChartData();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products data';
      }
    });
  }

  private updateCategoryChartData() {
    console.log('Category data received:', this.countcategorie);
    if ( this.countcategorie.length > 0) {
      console.log('First category item:', this.countcategorie[0]);
      
      this.categoryChartLabels = this.countcategorie.map(item => {
        return item.name ;
      });
      
      this.categoryChartData = this.countcategorie.map(item => {
        return item.number || item.count || item.quantity || item.qte || 0;
      });
      
      console.log('Category chart labels:', this.categoryChartLabels);
      console.log('Category chart data:', this.categoryChartData);
    }
  }

  private updateProductChartData() {
    console.log('Product data received:', this.products);
    if (this.products && this.products.length > 0) {
      console.log('First product item:', this.products[0]);
      
      const limitedProducts = this.products.slice(0, 10);
      
      this.productChartLabels = limitedProducts.map(item => {
        return item.name || item.productName || item.produitName || item.prodName || 'Unknown';
      });
      
      this.productChartData = limitedProducts.map(item => {
        return item.qte || item.quantity || item.stock || item.count || 0;
      });
      
      console.log('Product chart labels:', this.productChartLabels);
      console.log('Product chart data:', this.productChartData);
    }
  }
} 