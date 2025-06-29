import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../../services/produit.service';
import { CategorieService } from '../../../services/categorie.servie';
import { ThemeService } from '../../../services/theme.service';
import { NotificationComponent } from '../../../components/notification/notification.component';

@Component({
  selector: 'app-create-model',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent {
  @ViewChild('notification') notificationComponent!: NotificationComponent;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() createSuccess = new EventEmitter<void>();

  name: string = '';
  qte: number = 1;
  price: number = 1;
  categorie: any = '';
  categories: any[] = [];
  error: string = '';

  @Input() set type(value: 'product' | 'category') {
    this._type = value;
    if (this.type === 'product') {
      this.loadCategories();
    }
  }
  get type(): 'product' | 'category' {
    return this._type;
  }
  private _type: 'product' | 'category' = 'category';

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    public themeService: ThemeService
  ) {}

  loadCategories() {
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log('Categories loaded:', this.categories);
      },
      error: (err: Error) => {
      }
    });
  }

  onSubmit() {
    if (this.type === 'category') {
      if (!this.name) {
        this.error = 'name is required for category';
        return;
      }
      const categoryData = {
        name: this.name
      };
      this.categorieService.addCategorie(categoryData).subscribe({
        next: (res) => {
          console.log('Category created:');
          this.notificationComponent.showNotification('Category Created', `Category "${this.name}" has been successfully created!`);
          this.createSuccess.emit();
          this.onClose();
        },
        error: (err: Error) => {
          this.notificationComponent.showNotification('Creation Failed', 'categorie name non valide');
        }
      });
    } else {
      if (!this.name || !this.qte || !this.price || !this.categorie) {
        this.error = "All fields are required for product";
        return;
      }
      const productData = {
        name: this.name,
        qte: this.qte,
        price: this.price,
        categorie: {
          idCat: this.categorie.idCat,
          name: this.categorie.name
        }
        

      };
      this.produitService.addProduit(productData).subscribe({
        next: (res) => {
          this.notificationComponent.showNotification('Product Created', `Product "${this.name}" has been successfully created!`);
          this.createSuccess.emit();
          this.onClose();
        },
        error: (err: Error) => {
          this.notificationComponent.showNotification('Creation Failed', 'produit name non valide');
        }
      });
    }
  }

  onClose() {
    this.name = '';
    this.qte = 1;
    this.price = 1;
    this.categorie = '';
    this.error = '';
    this.close.emit();
  }
} 