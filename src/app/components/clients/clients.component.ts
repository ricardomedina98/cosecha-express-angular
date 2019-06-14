import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as __ from 'lodash'

import { NzModalService, NzPopconfirmModule  } from 'ng-zorro-antd';

import { Cliente } from '../../models/clientes';
import { ClientService } from '../../services/client.service';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {

    isLoading: boolean = true;
    isLoadingClientProducts: boolean = true;
    isLoadingProducts: boolean = true;

    public clients: Cliente[] = [];
    public client: Cliente;

    public products: Product[] = [];
    public product: Product;

    public productsClientsList: Product[] = [];
    public productsSelected: Product[] = [];

    public clientDataSelected: Cliente;
    public productDataSelected: Product;


    public productClientList: Product;


    equivalenciaForm: FormGroup;
    clientAgregarForm: FormGroup;
    clientForm: FormGroup;
    precioForm: FormGroup;

    searchValue = '';
    aplicar = false;
    aplicarClienteProducto = false;
    
    radioValue = 'a';
    radioValuePrecio = 'a';
    disabled = true;
    disabled2 = false;
    
    tipo = '';

    submittedCliente = false;
    submittedAgregarCliente = false;
    
    isVisibleCliente = false;
    isConfirmLoadingCliente = false;
    
    isVisibleAgregarCliente = false;
    isConfirmLoadingAgregarCliente = false;

    isVisibleListaCliente = false;
    isConfirmLoadingListaCliente = false;

    isVisibleListaProducto = false;
    isConfirmLoadingListaProducto = false;

    isVisiblePrecioProducto = false;
    isConfirmLoadingPrecioProducto = false;

    sortName: string | null = null;
    sortValue: string | null = null;
    listOfClients: string[] = [];


    listOfSelection = [
        {
          text: 'Seleccionar todo',
            onSelect: () => {
                this.checkAll(true);
            }
        }
    ];    

    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    listOfDisplayData: Product[] = [];
    listOfAllData: Product[] = [];
    mapOfCheckedId: { [id_producto: number]: boolean } = {};

    constructor(
        private clienteService: ClientService,
        private formBuilder: FormBuilder,
        private modalService: NzModalService,
        private toastr: ToastrService,
        private productService: ProductService,
    ) {

        this.clienteService.getClientes()
            .subscribe(request => {
                this.clients = request;
                console.log(request);
                this.isLoading = false;
            },
            error => {
                console.log(error);
            }
        );

        this.productService.getProducts()
            .subscribe(data => {
                console.log(data);
                this.products = data;
            }, error => {
                console.log(error);
            }
        );
    }

    get fc() { return this.clientAgregarForm.controls; }
    get fec() { return this.clientForm.controls; }
    get fe() { return this.precioForm.controls; }

    ngOnInit() {
        this.clientForm = this.formBuilder.group({
            nombre_cliente: ['', Validators.required],
            apellido1_cliente: ['', Validators.required],
            apellido2_cliente: ['', Validators.required],
            nombre_empresa_cliente: ['', Validators.required],
            correo_cliente: ['', [Validators.required, Validators.email]],
            telefono_cliente: ['', Validators.required]
        });

        this.equivalenciaForm = this.formBuilder.group({
            equivalencia1: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            equivalencia2: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            opciones: [''],
            porcentaje: [''],
            manual: [''],
            tipo: ['', Validators.required],
        });

        this.clientAgregarForm = this.formBuilder.group({            
            nombre_cliente: ['', Validators.required],
            apellido1_cliente: ['', Validators.required],
            apellido2_cliente: ['', Validators.required],
            nombre_empresa_cliente: ['', Validators.required],
            correo_cliente: ['', [Validators.required, Validators.email]],
            telefono_cliente: ['', Validators.required]
        });

        this.precioForm = this.formBuilder.group({            
            tipo: ['', Validators.required],
            manual: [''],
            porcentaje: [''],
            opcionesPrecio: [''],
            precio_general: [''],
            precio_actualizado: ['', Validators.required]
        });
    }


/*
    search($eventCliente: Cliente[]): void {
        //this.listOfDisplayData = $eventCliente; 
        //this.listOfDisplayData.filter(element => element === 'Hugo Guerrero');
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }

    sort(sortName: string, value: string): void {
        this.sortName = sortName;
        this.sortValue = value;
        this.search();
    }

    filterAddressChange(value: string[]): void {
        this.listOfClients = value;
        this.search();
    }
*/
    showModalCliente(data: string): void {
      this.clientDataSelected = JSON.parse(JSON.stringify(data));  
   
      this.clientForm.controls['nombre_cliente'].setValue(this.clientDataSelected.nombre_cliente);
      this.clientForm.controls['apellido1_cliente'].setValue(this.clientDataSelected.apellido1_cliente);
      this.clientForm.controls['apellido2_cliente'].setValue(this.clientDataSelected.apellido2_cliente);
      this.clientForm.controls['nombre_empresa_cliente'].setValue(this.clientDataSelected.nombre_empresa_cliente);       
      this.clientForm.controls['correo_cliente'].setValue(String(this.clientDataSelected.correo_cliente));
      this.clientForm.controls['telefono_cliente'].setValue(String(this.clientDataSelected.telefono_cliente));        
      this.isVisibleCliente = true;     
    }

    handleCancelCliente(): void {
        this.isVisibleCliente = false;
    }

    showModalAgregarCliente(): void {
      this.isVisibleAgregarCliente = true;
    }

    handleCancelAgregarCliente(): void {
      this.isVisibleAgregarCliente = false;
    }

    showModalListaCliente(data: string): void {        
        this.clientDataSelected = JSON.parse(JSON.stringify(data));
        try {
            this.clienteService.getClientProducts(this.clientDataSelected.id_cliente)
            .subscribe(result => {
                this.productsClientsList = result;
                console.log(this.productsClientsList);
                this.isLoadingClientProducts = false;
            }, error => {
                this.isLoadingClientProducts = false;
                console.log(error);
            });
            this.isVisibleListaCliente = true;
        } catch (error) {
            
        }
        
    }
  
    handleCancelListaCliente(): void {
        this.isVisibleListaCliente = false;
        this.productsClientsList = [];
    }

    showModalListaProducto(): void {
   
        this.isVisibleListaProducto = true; 
        this.mapOfCheckedId = [];
        this.productService.getAllProducts()
            .subscribe(request => {
                this.products = __.difference(request, (__.intersectionBy(request, this.productsClientsList, 'id_producto')));
                this.isLoadingProducts = false;
            },
            error => {
                console.log(error);
            }
        );   
    }
  
    handleCancelListaProducto(): void {
        this.isVisibleListaProducto = false;
    }

    showModalPrecioProducto(data: string): void {
        this.productClientList = JSON.parse(JSON.stringify(data));
        this.precioForm.controls['precio_general'].setValue(this.productClientList.precio_semanal);

        this.precioForm.get('tipo').setValue(null);  
        this.precioForm.get('manual').setValue(null);  
        this.precioForm.get('porcentaje').setValue(null);  
        this.precioForm.get('precio_actualizado').setValue(null); 
        this.radioValuePrecio = 'a';

        this.isVisiblePrecioProducto = true;
    }
  
    handleCancelPrecioProducto(): void {
        this.isVisiblePrecioProducto = false;
    }

    onSubmitPrecioProducto(){
        this.productClientList.precio_semanal = this.precioForm.get('precio_actualizado').value;
        console.log("TCL: ClientsComponent -> onSubmitPrecioProducto -> this.productClientList", this.productClientList)
        this.productsClientsList.forEach(item => {
            if(item.id_producto === this.productClientList.id_producto){
                item.precio_semanal =  this.productClientList.precio_semanal;                
            }
        });
        this.productsClientsList = [...this.productsClientsList];
        this.isVisiblePrecioProducto = false;
        console.log("TCL: ClientsComponent -> onSubmitPrecioProducto -> this.productsClientsList", this.productsClientsList)
    }

    onSubmitListaProducto(){
        let newItems: Product[] = [];        
        
        this.products.forEach((item, index) => {  
            console.log(Number(Object.keys(this.mapOfCheckedId)[index])); 
            if(Number(Object.keys(this.mapOfCheckedId)[index]) === Number(item.id_producto) || this.mapOfCheckedId[item.id_producto] == true) {     
                console.log(item.id_producto, this.mapOfCheckedId[item.id_producto]);           
                newItems.push(item);
            }
        });        
        this.productsClientsList = __.concat(this.productsClientsList, newItems)       
        this.productsClientsList = [...this.productsClientsList];

        this.clienteService.addProductsClient(newItems, this.clientDataSelected.id_cliente)
        .subscribe(result => {
            this.isVisibleListaProducto = false;            
        }, error => {
            this.toastr.error('Hubo un error al agregar los productos');    
        });
        
        console.log(this.products);
    }

    onSubmitListaCliente(){
        
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
            let opcion = this.equivalenciaForm.get('opcionesPrecio').value;
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
        } catch (error) {
            console.log(error);
        }
        
    }

    changebuttonPrecioCliente(){        
        switch (this.precioForm.get('opcionesPrecio').value) {
            case 'a':
                this.precioForm.controls['manual'].enable();
                this.precioForm.controls['porcentaje'].disable();
                this.precioForm.controls['porcentaje'].clearValidators();
                break;
            case 'b':
                this.precioForm.controls['porcentaje'].enable();
                this.precioForm.controls['manual'].disable();
                this.precioForm.controls['manual'].clearValidators();               
                break;
            
            default:
                break;
        }
    }

    AplicarSumaClienteProducto(){

        this.aplicarClienteProducto =  true;

        if(this.precioForm.get('tipo').invalid) {
            return;
        }
        
        try {
            let resultado = Number(this.precioForm.get('precio_general').value);
            let opcion = this.precioForm.get('opcionesPrecio').value;
            let tipo = this.precioForm.get('tipo').value;
            let opcionVal;
            let precio_general;
            
            if(opcion === 'a') {
                opcionVal = Number(this.precioForm.get('manual').value);
            } else if(opcion === 'b'){
                opcionVal = Number(this.precioForm.get('porcentaje').value);
            }
            
            if(tipo === '+'){
                precio_general = resultado * (opcionVal/100);                              
                precio_general = resultado + precio_general;
            } else if(tipo === '-'){
                precio_general = resultado - (opcionVal * (resultado/100));
            }
            this.precioForm.controls['precio_actualizado'].setValue(formatNumber(precio_general, 'en'));
        } catch (error) {
            console.log(error);
        }
        
    }

    showConfirm(): void {
        this.modalService.success({
          nzTitle: '<i>Deseas aplicar el descuento</i>',
          nzContent: '<b>Al siguiente cliente</b>',      
          nzOkText: 'Si',
          nzOkType: 'confirm',
          nzOnOk: () => {
              console.log('OK')
              this.AplicarSuma()
            },

          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    }

    onSubmitAgregarCliente(){
        this.submittedAgregarCliente =  true;

        console.log(this.clientAgregarForm);

        if(this.clientAgregarForm.invalid) {
            return;
        }

        this.isConfirmLoadingAgregarCliente = true;

        let client = new Cliente(
            null,
            this.clientAgregarForm.get('nombre_cliente').value,
            this.clientAgregarForm.get('apellido1_cliente').value,
            this.clientAgregarForm.get('apellido2_cliente').value,
            this.clientAgregarForm.get('nombre_empresa_cliente').value,
            this.clientAgregarForm.get('telefono_cliente').value,
            this.clientAgregarForm.get('correo_cliente').value
        );        
                
        this.clienteService.addCliente(client)
        .subscribe(result => {            
            
            this.clients.push(new Cliente(
                result.id_cliente, 
                result.nombre_cliente, 
                result.apellido1_cliente,
                result.apellido2_cliente,
                result.nombre_empresa_cliente,
                result.telefono_cliente,
                result.correo_cliente
            ));       
            
            this.clients = [...this.clients];
                
            this.isConfirmLoadingAgregarCliente = false;
            this.toastr.success('Cliente Agregado!');            
            
        }, err => {
            this.isConfirmLoadingAgregarCliente = false;

            if (err.error.msg.fields) {
                if(err.error.msg.fields.un_nombre_empresa_cliente)
                this.toastr.error('El nombre de la empresa ingresado ya existe.');
                if(err.error.msg.fields.un_correo_cliente)
                    this.toastr.error('El correo ingresado ya existe.'); 
                if(err.error.msg.fields.un_telefono_cliente)
                    this.toastr.error('El telefono ingresado ya existe.');             
            } else {
                this.toastr.error('Hubo un error al agregar el cliente');  
            }                     
        })
    }

    onSubmitCliente() {        
        this.submittedCliente = true;

        if (this.clientForm.invalid) {
            return;
        }
        this.isConfirmLoadingCliente = true;

        let client = new Cliente(
            this.clientDataSelected.id_cliente,
            this.clientForm.get('nombre_cliente').value,
            this.clientForm.get('apellido1_cliente').value,
            this.clientForm.get('apellido2_cliente').value,
            this.clientForm.get('nombre_empresa_cliente').value,
            this.clientForm.get('telefono_cliente').value,
            this.clientForm.get('correo_cliente').value
        );   
      
        this.clienteService.updateCliente(client)
        .subscribe(result => {
            console.log(result);
            this.isConfirmLoadingCliente = false;
            this.toastr.success('Cliente actualizado!');                    
          
        }, err => {
            this.isConfirmLoadingCliente = false;

            if (err.error.msg.fields) {
                if(err.error.msg.fields.un_nombre_empresa_cliente)
                this.toastr.error('El nombre de la empresa ingresado ya existe.');
                if(err.error.msg.fields.un_correo_cliente)
                    this.toastr.error('El correo ingresado ya existe.'); 
                if(err.error.msg.fields.un_telefono_cliente)
                    this.toastr.error('El telefono ingresado ya existe.');             
            } else {
                this.toastr.error('Hubo un error al agregar el cliente');  
            }                     
        })
    }

    showDeleteConfirm(data: string): void {
        this.clientDataSelected = JSON.parse(JSON.stringify(data));
        this.modalService.confirm({
          nzTitle: '¿Esta seguro que desea eliminar el cliente?',
          nzContent: '<b style="color: red;">Se eliminara el cliente: '+ this.clientDataSelected.nombre_cliente +'</b>',
          nzOkText: 'SI',
          nzOkType: 'danger',
          nzOnOk: () => {
              this.clienteService.deleteClient(this.clientDataSelected.id_cliente)
              .subscribe(result => {
                this.toastr.success('Cliente eliminado correctamente!'); 
              }, error => {
                this.toastr.error('Hubo un error al eliminar el Cliente');    
              });
          },
          nzCancelText: 'No',
          nzOnCancel: () => {
              
          }
        });
    }

    showDeleteConfirmProductClient(data: string): void {
        this.productDataSelected = JSON.parse(JSON.stringify(data));
        this.modalService.confirm({
            nzTitle: '¿Esta seguro que desea eliminar el producto?',
            nzContent: '<b style="color: red;">Se eliminara el producto: ' + this.productDataSelected.nombre_producto +
            ', del cliente: ' + this.clientDataSelected.nombre_cliente + '</b>',
            nzOkText: 'Si',
            nzOkType: 'danger',
            nzOnOk: () => {                                
                this.clienteService.deleteProductClient(this.clientDataSelected.id_cliente, this.productDataSelected.id_producto)
                .subscribe(result => {                    
                    this.toastr.success('Producto eliminado correctamente!');
                    this.productsClientsList = this.productsClientsList.filter(obj => obj.id_producto !== this.productDataSelected.id_producto);                   
                    this.productsClientsList = [...this.productsClientsList];
                }, error => {
                    this.toastr.error('Hubo un error al eliminar el producto');    
                });
            },
            nzCancelText: 'No',
            nzOnCancel: () => {
            }
        });
    }

    currentPageDataChange($event: Product[]): void {
        this.listOfDisplayData = $event;        
        this.refreshStatus();
    }

    refreshStatus(): void {
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id_producto]);        
        this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id_producto]) && !this.isAllDisplayDataChecked;
    }
    
    checkAll(value: boolean): void {
        this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id_producto] = value));
        this.refreshStatus();
    }

}