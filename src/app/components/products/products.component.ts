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
        this.product = new Product(this.productDataSelected.id_producto, this.productDataSelected.nombre_producto, this.productDataSelected.categoria, this.productDataSelected.medicion, this.productDataSelected.existencia, this.productDataSelected.existencia_min, this.productDataSelected.existencia_max, this.productDataSelected.precio_semanal, this.productDataSelected.precio_diario, this.productDataSelected.status, this.productDataSelected.fecha_creacion, this.productDataSelected.creado_por, this.productDataSelected.fecha_ultima_modificacion, this.productDataSelected.fecha_modificacion_por);                
        this.modalRef = this.modalService.show(templateModalEdit, this.config);
    }

    openModalPrecioDiario

    

    ngOnInit() {
        
    }

}
