import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { CategorieService } from '../../services/categorie.servie';
import { FormControl } from '@angular/forms';
import { UpdateModalComponent } from './update-modal/update-modal.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationComponent } from '../../components/notification/notification.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UpdateModalComponent, CreateModelComponent, MatTabsModule, NotificationComponent, ConfirmDialogComponent],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @ViewChild('notification') notificationComponent!: NotificationComponent;
  currentSection: 'categories' | 'produits' = 'categories';
  categories: any[] = [];
  products: any[] = [];
  error: string = '';
  searchControl = new FormControl('');
  searchControl2 = new FormControl('');
  name="";
  // Modal state
  isModalOpen = false;
  modalType: 'product' | 'category' = 'product';
  selectedItem: any = null;

  isCreateModalOpen = false;
  createModalType: 'product' | 'category' = 'product';

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();

    this.searchControl.valueChanges.subscribe(value => {
      if (value) {
        this.produitService.getProduitByCategorie(value).subscribe({
          next: (response) => {
            this.products = response;
          },
          error: (err) => {
            this.error = err.message;
          }
        });
      } else {
        this.loadProducts();
      }
    });

    this.searchControl2.valueChanges.subscribe(value => {
      if (value) {
        this.produitService.getProduitBynames(value).subscribe({
          next: (response) => {
            this.products = response;
          },
          error: (err) => {
            this.error = err.message;
          }
        });
      } else {
        this.loadProducts();
      }
    });
  }

  showSection(section: 'categories' | 'produits') {
    this.currentSection = section;
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  loadProducts() {
    this.produitService.getProduits().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  deletecat(id: number) {
    this.produitService.getIdProduitByCat(id).subscribe({
          next: (idProArray) => {
            for (let idPro of idProArray) {
             this.produitService.deleteProduit(idPro).subscribe({
              next:()=>{
                console.log("done");
              }
             })
            }
          }
        });
    this.categorieService.deleteCategorie(id).subscribe({
      next: () => {
        this.name= this.categories.find(cat => cat.idCat === id)?.name || '';
        this.categories = this.categories.filter(cat => cat.idCat !== id);
        
        this.notificationComponent.showNotification('Category Deleted', `The category "${this.name}" has been deleted successfully.`);
      },
      error: (err) => {
        this.error = err.message;
        this.notificationComponent.showNotification('Delete Failed', 'Failed to delete the category.');
      }
    });
  }

  deletepro(id: number) {
    this.produitService.deleteProduit(id).subscribe({
      next: () => {
        this.name = this.products.find(prod => prod.idPro === id)?.name || '';
        this.products = this.products.filter(prod => prod.idPro !== id);
        this.notificationComponent.showNotification('Product Deleted', `The product "${this.name}" has been deleted successfully.`);
      },
      error: (err) => {
        this.error = err.message;
        this.notificationComponent.showNotification('Delete Failed', 'Failed to delete the product.');
      }
    });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.searchControl2.setValue('');
    this.loadProducts();
  }
  openUpdateModal(type: 'product' | 'category', item: any) {
    this.modalType = type;
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = null;
  }

  onUpdateSuccess() {
    if (this.modalType === 'product') {
      this.loadProducts();
    } else {
      this.loadCategories();
    }
  }

  openCreateModal(type: 'product' | 'category') {
    this.createModalType = type;
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  onCreateSuccess() {
    if (this.createModalType === 'product') {
      this.loadProducts();
    } else {
      this.loadCategories();
    }
  }

  confirmDelete(type: 'product' | 'category', id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to delete this ${type}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (type === 'product') {
          this.deletepro(id);
        } else {
          this.deletecat(id);
        }
      }
    });
  }
}
