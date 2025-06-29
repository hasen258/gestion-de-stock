import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../../../services/produit.service';
import { CategorieService } from '../../../services/categorie.servie';
import { NotificationComponent } from '../../../components/notification/notification.component';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent {
  @ViewChild('notification') notificationComponent!: NotificationComponent;
  @Input() isOpen = false;
  @Input() type: 'product' | 'category' = 'product';
  @Input() item: any;
  @Output() close = new EventEmitter<void>();
  @Output() updateSuccess = new EventEmitter<void>();
  categories: any[] = [];
  updatedItem: any = {name:"test"};
  error: string = '';
  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    
    if (this.type === 'product') {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(this.categories);
      },
      error: (err: Error) => {
        this.error = err.message;
      }
    });}
  onSubmit() {
    if (this.type === 'product') {
      delete this.item.categorie['user'];
      delete this.item['user'];
      this.produitService.updateProduit(this.item,this.item.idPro).subscribe({
        next: () => {
          this.notificationComponent.showNotification('Product Updated', `Product "${this.item.name}" has been successfully updated!`);
          this.updateSuccess.emit();
          this.closeModal();
          console.log("update : ",this.item);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.notificationComponent.showNotification('Update Failed', `produit non valide`);
          console.log(this.item);
        }
      });
    } else {
      this.item.name
      this.categorieService.updateCategorie(this.item.idCat,this.item).subscribe({
        
        next: () => {
          this.notificationComponent.showNotification('Category Updated', `Category "${this.item.name}" has been successfully updated!`);
          this.updateSuccess.emit();
          this.closeModal();
          console.log(this.item);
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.notificationComponent.showNotification('Update Failed', `Failed to update category`);
        }
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
} 