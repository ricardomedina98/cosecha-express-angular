import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product';



@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    modalRef: BsModalRef;
    isLoading:boolean = true;
    public products: Product[] = [];
    public product: Product;
    public productDataSelected;

    searchValue = '';

    config = {        
        ignoreBackdropClick: true,
        class: 'modal-lg'
    };
    
    constructor(
        private modalService: BsModalService,
        private productService: ProductService
    ) {

        this.productService.getAllProducts()
        .subscribe( request => {                    
            this.products = request;            
            this.isLoading = false;
        },
        error => {
            console.log(error);                
        });

        this.productService.getProducts()
        .subscribe(data => {
            this.products = data;
        }, error => {
            console.log(error);
        });

    }

    

    openModalEdit(templateModalEdit: TemplateRef<any>, data: string) {   
        this.productDataSelected = JSON.parse(JSON.stringify(data));
        console.log(this.productDataSelected);
                        
        this.modalRef = this.modalService.show(templateModalEdit, this.config);
    }

    openModalEquivalencia(templateModalEquivalencia: TemplateRef<any>, data: string){
        console.log(data);
        this.modalRef = this.modalService.show(templateModalEquivalencia, this.config);
    }
    
    

    ngOnInit() {
        
    }

}
