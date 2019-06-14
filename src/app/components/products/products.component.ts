import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { MedicionService } from '../../services/medicion.service';
import { ProductService } from '../../services/product.service';
import { CategoriaService } from '../../services/categoria.service';
import { EquivalenciaService } from '../../services/equivalencia.service';
import { NzModalService, NzToolTipModule } from 'ng-zorro-antd';


import { Product } from '../../models/product';
import { Medicion } from '../../models/medicion';
import { Categoria } from '../../models/categoria';
import { Equivalencia } from '../../models/equivalencia';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    isLoading: boolean = true;
   
    public products: Product[] = [];
    public productsBackup: Product[] = [];
    public product: Product;
    public productDataSelected: Product;
    public mediciones: Medicion[];
    public categorias: Categoria[];
    productForm: FormGroup;
    equivalenciaForm: FormGroup;
    productAgregarForm: FormGroup;

    submittedEquivalencia = false;
    submittedGeneral = false;
    submittedAgregarProducto = false;
    
    aplicar = false;

    radioValue = 'a';
    disabled = true;
    disabled2 = false;
    
    tipo = '';

    searchValue = '';

    isVisibleEquiv = false;
    isConfirmLoadingEquiv = false;

    isVisibleGeneral = false;
    isConfirmLoadingGeneral = false;

    isVisibleAgregarProductos = false;
    isConfirmLoadingAgregarProductos = false;
    
    listOfProducts: string[] = [];


    constructor(
        private modalService: NzModalService,
        private productService: ProductService,
        private medicionService: MedicionService,
        private categoriaService: CategoriaService,
        private equivalenciaService: EquivalenciaService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {

        this.productService.getAllProducts()
        .subscribe(request => {
            this.productsBackup = request;
            this.products = request;
            console.log(request);
            this.isLoading = false;
        },
        error => {
            console.log(error);
        });

        this.productService.getProducts()
        .subscribe(data => {
            this.productsBackup = data;
            this.products = data;
        }, error => {
            console.log(error);
        });

        this.medicionService.getMediciones()
        .subscribe(data => {
            this.mediciones = data;
        }, error => {
            console.log(error);
        });

        this.categoriaService.getCategoria()
        .subscribe(data => {
            this.categorias = data;
        }, error => {
            console.log(error);
        })

    }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            nombre_producto: ['', Validators.required],
            existencia: ['', Validators.required],
            existencia_min: ['', Validators.required],
            existencia_max: ['', Validators.required],
            id_medicion: ['', Validators.required],
            id_categoria: ['']
        });

        this.equivalenciaForm = this.formBuilder.group({
            equivalencia1: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            equivalencia2: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            opciones: [''],
            porcentaje: [''],
            manual: [''],
            tipo: ['', Validators.required],
            tipoEquiv1: ['', Validators.required],
            tipoEquiv2: ['', Validators.required],
            precio_general: ['', Validators.required]
        });

        this.productAgregarForm = this.formBuilder.group({
            nombre_producto: ['', Validators.required],
            existencia: ['', Validators.required],
            existencia_min: ['', Validators.required],
            existencia_max: ['', Validators.required],
            id_medicion: ['', Validators.required],
            id_categoria: ['']
        });
    }

    numericOnly(event): void {    
        let num1 = this.equivalenciaForm.get('equivalencia1').value;
        let num2 = this.equivalenciaForm.get('equivalencia2').value;

        console.log(num1);
        console.log(num2);
    }

    showModalEquiv(data: string): void {
        this.productDataSelected = JSON.parse(JSON.stringify(data));
        this.equivalenciaForm.controls['equivalencia1'].setValue(this.productDataSelected.equivalencia1);
        this.equivalenciaForm.controls['equivalencia2'].setValue(this.productDataSelected.equivalencia2);        
        this.equivalenciaForm.controls['tipoEquiv1'].setValue(String(this.productDataSelected.equivalencia1Med));        
        this.equivalenciaForm.controls['tipoEquiv2'].setValue(String(this.productDataSelected.equivalencia2Med));      
        this.equivalenciaForm.controls['precio_general'].setValue(this.productDataSelected.precio_semanal);
        this.equivalenciaForm.get('porcentaje').setValue(null);
        this.radioValue = 'a';
        this.isVisibleEquiv = true;
    }

    handleCancelEquiv(): void {
        this.aplicar = false;
        this.submittedEquivalencia = false;
        this.isVisibleEquiv = false;
        this.radioValue = 'a';      
        this.equivalenciaForm.get('tipo').setValue(null);  
    }

    showModalGeneral(data: string): void {
        this.productDataSelected = JSON.parse(JSON.stringify(data));        
        this.productForm.controls['nombre_producto'].setValue(this.productDataSelected.nombre_producto);
        this.productForm.controls['existencia'].setValue(this.productDataSelected.existencia);
        this.productForm.controls['existencia_min'].setValue(this.productDataSelected.existencia_min);
        this.productForm.controls['existencia_max'].setValue(this.productDataSelected.existencia_max);       
        this.productForm.controls['id_medicion'].setValue(String(this.productDataSelected.id_medicion));
        this.productForm.controls['id_categoria'].setValue(String(this.productDataSelected.id_categoria)); 
         
        this.isVisibleGeneral = true;
    }

    handleCancelGeneral(): void {
        this.isVisibleGeneral = false;

        this.productForm.controls['nombre_producto'].setValue(null);
        this.productForm.controls['existencia'].setValue(null);
        this.productForm.controls['existencia_min'].setValue(null);
        this.productForm.controls['existencia_max'].setValue(null);   
        this.productForm.get('id_medicion').setValue(null);
        this.productForm.get('id_categoria').setValue(null);     
    }

    showModalAgregarProducto(): void {
        this.isVisibleAgregarProductos = true;

        this.productAgregarForm.get('nombre_producto').setValue(null); 
        this.productAgregarForm.get('existencia').setValue(null);  
        this.productAgregarForm.get('existencia_max').setValue(null);  
        this.productAgregarForm.get('existencia_min').setValue(null);  
        this.productAgregarForm.get('medicion').setValue(null);  
        this.productAgregarForm.get('id_categoria').setValue(null); 
    }

    handleCancelAgregarProducto(): void {
        this.isVisibleAgregarProductos = false;  
    }

    get f() { return this.productForm.controls; }
    get fe() { return this.equivalenciaForm.controls; }
    get fa() { return this.productAgregarForm.controls; }

    reset(): void{
        this.products = this.productsBackup;
    }

    search(): void {        
        this.products = this.transform(this.products, this.searchValue);
    }

    transform(itemList: Product[], searchKeyword: string): Product[] {
        if (!itemList)
          return [];
        if (!searchKeyword)
          return itemList;
        let filteredList = [];
        if (itemList.length > 0) {
          searchKeyword = searchKeyword.toLowerCase();
          itemList.forEach(item => {
            //Object.values(item) => gives the list of all the property values of the 'item' object
            let propValueList = Object.values(item);
            for(let i=0;i<propValueList.length;i++)
            {
              if (propValueList[i]) {
                if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1)
                {
                  filteredList.push(item);
                  break;
                }
              }
            }
          });
        }
        return filteredList;
    }

    onSubmitProduct() {        
        this.submittedGeneral = true;

        if (this.productForm.invalid) {
            return;
        }
        this.isConfirmLoadingGeneral = true;

        let product = new Product(
            this.productDataSelected.id_producto,
            this.productForm.get('nombre_producto').value,
            this.productForm.get('id_medicion').value,
            this.productForm.get('id_categoria').value,
            this.productForm.get('existencia').value,
            this.productForm.get('existencia_min').value,
            this.productForm.get('existencia_max').value
        );        
               
        this.productService.updateProduct(product)
        .subscribe(result => {
            console.log(result);
            this.isConfirmLoadingGeneral = false;
            this.isVisibleGeneral =  false;
            this.toastr.success('Producto actualizado!');     

        }, error => {
            this.isConfirmLoadingGeneral = false;
            this.toastr.error('Hubo un error al actualizar el producto');
        })
    }

    onSubmitEquivalencia() {        
        this.submittedEquivalencia = true;

        if (this.equivalenciaForm.get('equivalencia1').invalid && this.equivalenciaForm.get('equivalencia2').invalid && 
        this.equivalenciaForm.get('tipoEquiv1').invalid && this.equivalenciaForm.get('tipoEquiv2').invalid && 
        this.equivalenciaForm.get('precio_general').invalid) {            
            return;
        }

        this.isConfirmLoadingEquiv = true;

        let porcentaje;        
        if(this.equivalenciaForm.get('opciones').value === 'a'){
            porcentaje = this.equivalenciaForm.get('manual').value;
        } else if(this.equivalenciaForm.get('opciones').value === 'b') {
            porcentaje = this.equivalenciaForm.get('porcentaje').value;
        }        

        let equivalencia = new Equivalencia(
            this.equivalenciaForm.get('precio_general').value,
            this.equivalenciaForm.get('equivalencia1').value,
            this.equivalenciaForm.get('tipoEquiv1').value,
            this.equivalenciaForm.get('equivalencia2').value,
            this.equivalenciaForm.get('tipoEquiv2').value,            
            this.productDataSelected.id_producto,
            porcentaje
        );     
        
        this.equivalenciaService.updateEquivalencia(equivalencia)
        .subscribe(result => {
            console.log(result);
            
            this.isVisibleEquiv = false;
            this.isConfirmLoadingEquiv= false;
            this.toastr.success('Precio actualizado!');
            
            
        }, error => {
            this.isConfirmLoadingEquiv= false;
            this.toastr.error('Hubo un error al actualizar la equivalencia');       
        })
    }


    onSubmitAgregarProducto(){
        this.submittedAgregarProducto =  true;

        if(this.productAgregarForm.invalid) {
            return;
        }

        this.isConfirmLoadingAgregarProductos = true;

        let product = new Product(
            null,
            this.productAgregarForm.get('nombre_producto').value,
            this.productAgregarForm.get('id_medicion').value,
            this.productAgregarForm.get('id_categoria').value,
            this.productAgregarForm.get('existencia').value,
            this.productAgregarForm.get('existencia_min').value,
            this.productAgregarForm.get('existencia_max').value
        ); 
                
        this.productService.addProduct(product)
        .subscribe(result => {
            console.log(result);                       
            this.isConfirmLoadingAgregarProductos = false;
            this.isVisibleAgregarProductos = false;
            this.toastr.success('Producto Agregado!');  

        }, err => {
            this.isConfirmLoadingAgregarProductos = false;

            if (err.error.msg.error.fields) {
                if(err.error.msg.error.fields.nombre_producto)
                    this.toastr.error('El producto ingresado ya existe.');             
            } else {
                this.toastr.error('Hubo un error al agregar el producto');  
            } 
        })
        this.submittedAgregarProducto = false;
    }

    showDeleteConfirm(data: string): void {
        this.productDataSelected = JSON.parse(JSON.stringify(data));
        this.modalService.confirm({
          nzTitle: '¿Esta seguro que desea eliminar el producto?',
          nzContent: '<b style="color: red;">Se eliminara el producto: '+ this.productDataSelected.nombre_producto +'</b>',
          nzOkText: 'SI',
          nzOkType: 'danger',
          nzOnOk: () => {
              this.productService.deleteProduct(this.productDataSelected.id_producto)
              .subscribe(result => {
                this.toastr.success('Producto eliminado correctamente!'); 
              }, error => {
                this.toastr.error('Hubo un error al eliminar el producto');    
              });
          },
          nzCancelText: 'No',
          nzOnCancel: () => {
              
          }
        });
    }

    changebutton(){        
        switch (this.equivalenciaForm.get('opciones').value) {
            case 'a':
                this.equivalenciaForm.controls['manual'].enable();
                //this.equivalenciaForm.controls['manual'].setValidators([Validators.required]);
                this.equivalenciaForm.controls['porcentaje'].disable();
                this.equivalenciaForm.controls['porcentaje'].clearValidators();
                break;
            case 'b':
                this.equivalenciaForm.controls['porcentaje'].enable();
                //this.equivalenciaForm.controls['porcentaje'].setValidators([Validators.required]);
                this.equivalenciaForm.controls['manual'].disable();
                this.equivalenciaForm.controls['manual'].clearValidators();               
                break;
            
            default:
                break;
        }
    }

    AplicarSuma(){

        this.aplicar =  true;

        if(this.equivalenciaForm.get('equivalencia1').invalid && this.equivalenciaForm.get('equivalencia2').invalid && this.equivalenciaForm.get('tipo').invalid) {
            return;
        }
        
        try {
            let resultado = this.equivalenciaForm.get('equivalencia1').value / this.equivalenciaForm.get('equivalencia2').value;
            let opcion = this.equivalenciaForm.get('opciones').value;
            let tipo = this.equivalenciaForm.get('tipo').value;
            let opcionVal;
            let precio_general;
            
            if(opcion === 'a') {
                opcionVal = this.equivalenciaForm.get('manual').value;
            } else if(opcion === 'b'){
                opcionVal = this.equivalenciaForm.get('porcentaje').value;
            }
            
            if(tipo === '+'){
                precio_general = resultado * (opcionVal/100);                              
                precio_general = resultado + precio_general;
            } else if(tipo === '-'){
                precio_general = resultado - (opcionVal * (resultado/100));
            }
            
            this.equivalenciaForm.controls['precio_general'].setValue(formatNumber(precio_general, 'en'));
        } catch (error) {
            console.log(error);
        }
        
    }

    RestaurarPrecioGeneral(){
        this.equivalenciaForm.controls['precio_general'].setValue(this.productDataSelected.precio_semanal);
    }

}