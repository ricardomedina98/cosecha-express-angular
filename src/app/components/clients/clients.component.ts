import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as __ from 'lodash';
import { saveAs } from 'file-saver';

import { NzModalService, NzPopconfirmModule, NzInputModule   } from 'ng-zorro-antd';

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

    public clientBackup: Cliente[] = [];
    public clients: Cliente[] = [];
    public client: Cliente;

    public productsBackup: Product[] = [];
    public products: Product[] = [];
    public product: Product;

    public productsClientsListBackup: Product[] = [];
    public productsClientsList: Product[] = [];
    public productsSelected: Product[] = [];

    public clientDataSelected: Cliente;
    public productDataSelected: Product;
    public productClientList: Product;

    equivalenciaForm: FormGroup;
    clientAgregarForm: FormGroup;
    clientForm: FormGroup;
    precioForm: FormGroup;
    observacionesForm: FormGroup;

    searchValueListaProductos = '';
    searchValueListaProductosCliente = '';
    searchValueListaCliente = '';

    aplicar = false;
    aplicarClienteProducto = false;
    
    radioValue = 'a';
    radioValuePrecio = 'a';

    
    tipo = '';
    tipoEquiv = '';

    submittedCliente = false;
    submittedAgregarCliente = false;
    submittedPrecio = false;
    submittedEquivalencias = false;

    isVisibleObservaciones = false;
    isConfirmLoadingObservaciones = false;
    
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

    isConfirmLoadingExcel = false;

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

    isAllDisplayDataCheckedMarkProduct = false;
    listOfDisplayDataMarkProduct: Product[] = [];
    isIndeterminateMarkProduct = false;
    mapOfCheckedIdMarkProduct: { [id_producto: number]: boolean } = {};

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
                this.clientBackup = request;
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

    ngOnInit() {
        this.clientForm = this.formBuilder.group({
            nombre_cliente: [''],
            apellido1_cliente: [''],
            apellido2_cliente: [''],
            nombre_empresa_cliente: ['', Validators.required],
            correo_cliente: ['', [Validators.required, Validators.email]],
            telefono_cliente: ['', Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]
        });

        this.equivalenciaForm = this.formBuilder.group({
            tipoEquiv: ['', Validators.required],
            opciones: [''],
            manual: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            porcentaje: ['', Validators.required]       
        });

        this.clientAgregarForm = this.formBuilder.group({            
            nombre_cliente: [''],
            apellido1_cliente: [''],
            apellido2_cliente: [''],
            nombre_empresa_cliente: ['', Validators.required],
            correo_cliente: ['', [Validators.required, Validators.email]],
            telefono_cliente: ['', Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]
        });

        this.precioForm = this.formBuilder.group({            
            tipo: ['', Validators.required],
            manual: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            porcentaje: [''],
            opcionesPrecio: [''],
            precio_general: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]],
            precio_actualizado: ['', [Validators.required, Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/)]]
        });

        this.observacionesForm = this.formBuilder.group({            
            observacion: ['']
        });
    }

    showModalCliente(data: string): void {
        this.clientDataSelected = JSON.parse(JSON.stringify(data));  
    
        this.clientForm.controls['nombre_cliente'].setValue(this.clientDataSelected.nombre_cliente);
        this.clientForm.controls['apellido1_cliente'].setValue(this.clientDataSelected.apellido1_cliente);
        this.clientForm.controls['apellido2_cliente'].setValue(this.clientDataSelected.apellido2_cliente);
        this.clientForm.controls['nombre_empresa_cliente'].setValue(this.clientDataSelected.nombre_empresa_cliente);       
        this.clientForm.controls['correo_cliente'].setValue(this.clientDataSelected.correo_cliente);
        this.clientForm.controls['telefono_cliente'].setValue(this.clientDataSelected.telefono_cliente);        
        this.isVisibleCliente = true;     
    }

    handleCancelCliente(): void {
        this.isVisibleCliente = false;
    }

    showModalAgregarCliente(): void {
      this.isVisibleAgregarCliente = true;
       
      this.clientAgregarForm.get('nombre_cliente').setValue(null);
      this.clientAgregarForm.get('apellido1_cliente').setValue(null);
      this.clientAgregarForm.get('apellido2_cliente').setValue(null);
      this.clientAgregarForm.get('nombre_empresa_cliente').setValue(null);
      this.clientAgregarForm.get('correo_cliente').setValue(null);
      this.clientAgregarForm.get('telefono_cliente').setValue(null);
    }

    handleCancelAgregarCliente(): void {
      this.isVisibleAgregarCliente = false;
      this.submittedAgregarCliente =  false;

      this.clientAgregarForm.get('nombre_cliente').setValue(null);
      this.clientAgregarForm.get('apellido1_cliente').setValue(null);
      this.clientAgregarForm.get('apellido2_cliente').setValue(null);
      this.clientAgregarForm.get('nombre_empresa_cliente').setValue(null);
      this.clientAgregarForm.get('correo_cliente').setValue(null);
      this.clientAgregarForm.get('telefono_cliente').setValue(null);
    }

    showModalListaCliente(data: string): void {  

        this.radioValue = 'a';      
        this.equivalenciaForm.get('tipoEquiv').setValue(null); 
        this.equivalenciaForm.get('porcentaje').setValue(null);
        this.equivalenciaForm.get('manual').setValue(null);

        this.clientDataSelected = JSON.parse(JSON.stringify(data));
        try {
            this.clienteService.getClientProducts(this.clientDataSelected.id_cliente)
            .subscribe(result => {
                this.productsClientsList = result;
                this.productsClientsListBackup = result;
                console.log(this.productsClientsList);
                this.isLoadingClientProducts = false;
            }, error => {
                this.isLoadingClientProducts = false;
                console.log(error);
            });
            this.isVisibleListaCliente = true;
        } catch (error) {
        console.log(error)
            
        }     
    }
  
    handleCancelListaCliente(): void {
        this.isVisibleListaCliente = false;
        this.productsClientsList = [];
        this.mapOfCheckedIdMarkProduct = [];
        this.submittedEquivalencias = false;
    }

    showModalListaProducto(): void {
        this.isVisibleListaProducto = true; 
        this.mapOfCheckedId = [];
        this.productService.getAllProducts()
            .subscribe(request => {
                this.products = __.difference(request, (__.intersectionBy(request, this.productsClientsList, 'id_producto')));
                this.isLoadingProducts = false;
                this.productsBackup =  __.difference(request, (__.intersectionBy(request, this.productsClientsList, 'id_producto')));
            },
            error => {                
                this.isLoadingProducts = false;
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
        this.submittedPrecio = false;
        this.aplicarClienteProducto = false;
    }

    onSubmitListaCliente(){
        this.isVisibleListaCliente = false;
    }

    onSubmitPrecioProducto(){

        this.submittedPrecio = true;

        console.log(this.precioForm);

        if(this.precioForm.get('precio_actualizado').invalid) {
            return;
        }

        this.productClientList.precio_semanal = this.precioForm.get('precio_actualizado').value;        
        this.clienteService.updatePrecioEspecial(this.clientDataSelected.id_cliente, this.productClientList.id_producto, this.productClientList.precio_semanal)
        .subscribe(response => {
            console.log("TCL: ClientsComponent -> onSubmitPrecioProducto -> response", response) 
            this.toastr.success('Precio actualizado!'); 

        }, error => {
            console.log("TCL: ClientsComponent -> onSubmitPrecioProducto -> error", error)
            this.toastr.error('Hubo un error al actualizar los productos');  
        });

        this.productsClientsList.forEach(item => {
            if(item.id_producto === this.productClientList.id_producto){
                item.precio_semanal =  this.productClientList.precio_semanal;                
            }
        });

        this.productsClientsList = [...this.productsClientsList];
        this.handleCancelPrecioProducto();
        console.table(this.productsClientsList)
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
            console.log(error);
            this.toastr.error('Hubo un error al agregar los productos');    
        });
        
        console.log(this.products);
    }

    get fc() { return this.clientAgregarForm.controls; }
    get fec() { return this.clientForm.controls; }
    get fe() { return this.precioForm.controls; }
    get fequi() { return this.equivalenciaForm.controls; }

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

        if(this.precioForm.get('tipo').invalid && this.precioForm.get('precio_general').invalid) {
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
            this.precioForm.controls['precio_actualizado'].setValue(Number(precio_general).toFixed(2));
        } catch (error) {
            console.log(error);
        }
        
    }

    changebutton(){        
        switch (this.equivalenciaForm.get('opciones').value) {
            case 'a':
                this.equivalenciaForm.controls['manual'].enable();
                this.equivalenciaForm.controls['porcentaje'].disable();
                this.equivalenciaForm.controls['porcentaje'].clearValidators();
                break;
            case 'b':
                this.equivalenciaForm.controls['porcentaje'].enable();
                this.equivalenciaForm.controls['manual'].disable();
                this.equivalenciaForm.controls['manual'].clearValidators();               
                break;
            
            default:
                break;
        }
    }

    showConfirm(): void {

        this.submittedEquivalencias =  true;

        if(this.equivalenciaForm.get('opciones').value == 'a') {
            this.equivalenciaForm.get('manual').setValidators(Validators.required);
        }
        else if(this.equivalenciaForm.get('opciones').value == 'b'){
            this.equivalenciaForm.get('porcentaje').setValidators(Validators.required);
        }

        if(this.equivalenciaForm.invalid) {
            return;
        }

        this.modalService.warning({
          nzTitle: '<i>Deseas aplicar el descuento</i>',
          nzContent: '<b>Se le aplicara el descuento de ' + this.clientDataSelected.nombre_empresa_cliente + '</b>',      
          nzOkText: 'Si',
            nzOnOk: () => {
                this.aplicar =  true;
        
                if(this.equivalenciaForm.get('tipoEquiv').invalid) {
                    return;
                }  

                let opcionValor;

                if(this.equivalenciaForm.get('opciones').value == 'a') {
                    opcionValor = this.equivalenciaForm.get('manual').value;
                }
                else if(this.equivalenciaForm.get('opciones').value == 'b'){
                    opcionValor = this.equivalenciaForm.get('porcentaje').value;
                }

                this.clienteService.aplicarDescuentoLista(this.clientDataSelected.id_cliente, opcionValor, this.equivalenciaForm.get('tipoEquiv').value)
                .subscribe(response => {
                    console.log(response);

                    this.clienteService.getClientProducts(this.clientDataSelected.id_cliente)
                    .subscribe(result => {
                        this.productsClientsList = result;
                        console.log(this.productsClientsList);
                    }, error => {
                        console.log(error);
                    });
                }, error => {
                    console.log(error);
                });
            },
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    }

    showConfirmRestaurarLista(): void {
        this.modalService.warning({
          nzTitle: '<i>Deseas restaurar la lista de precios</i>',
          nzContent: '<b>Se restaurara la lista de precios de ' + this.clientDataSelected.nombre_empresa_cliente + '</b>',      
          nzOkText: 'Si',
            nzOnOk: () => {                
                this.clienteService.restaurarListaPrecios(this.clientDataSelected.id_cliente)
                .subscribe(response => {
                    console.log(response);

                    this.clienteService.getClientProducts(this.clientDataSelected.id_cliente)
                    .subscribe(result => {
                        this.productsClientsList = result;
                        console.log(this.productsClientsList);
                    }, error => {
                        console.log(error);
                    });

                }, error => {
                    console.log(error);
                });  

            },
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    }

    showConfirmRestaurarPrecio(data: string): void {
        console.table();
        this.modalService.warning({
          nzTitle: '<i>Deseas restaurar el precio</i>',
          nzContent: '<b>Se restaurara el precio del producto: ' + data['nombre_producto'] + '</b>',      
          nzOkText: 'Si',
            nzOnOk: () => {
                console.log('OK')
               
                this.clienteService.restaurarPrecio(this.clientDataSelected.id_cliente, data['id_producto'])
                .subscribe(response => {
                    console.log(response);

                    this.clienteService.getClientProducts(this.clientDataSelected.id_cliente)
                    .subscribe(result => {
                        this.productsClientsList = result;
                        console.log(this.productsClientsList);
                    }, error => {
                        console.log(error);
                    });

                }, error => {
                    console.log(error);
                }); 
            },
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    }

    showConfirmRestaurarPrecioGeneral(){
        this.precioForm.controls['precio_actualizado'].setValue(this.productDataSelected.precio_semanal);
    }

    onSubmitAgregarCliente(){
        this.submittedAgregarCliente =  true;

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
            this.isVisibleAgregarCliente = false;
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
        this.submittedAgregarCliente = false;
    }

    showModalObservaciones(): void {
      this.isVisibleObservaciones = true;

      this.observacionesForm.get('observacion').setValue(null);
    }
  
    handleCancelObservaciones(): void {
        this.isVisibleObservaciones = false;
        this.observacionesForm.get('observacion').setValue(null);
    }

    showConfirmEnviarCorreo(): void {
        this.modalService.warning({
          nzTitle: '<i>Se enviar el correo</i>',
          nzContent: `Se enviara la lista de precios de <b>${this.clientDataSelected.nombre_empresa_cliente}</b>
            al siguiente correo: <b>${this.clientDataSelected.correo_cliente}</b>        
            `,      
          nzOkText: 'Si',
            nzOnOk: () => {
                this.isConfirmLoadingListaCliente = true; 
                this.isVisibleObservaciones = false;
                this.clienteService.enviarCorreo(this.clientDataSelected.id_cliente, this.observacionesForm.get('observacion').value, this.mapOfCheckedIdMarkProduct)
                .subscribe(response => {
                    
                    this.isConfirmLoadingListaCliente = false; 
                    this.toastr.success('Lista de precios enviada!'); 

                }, error => {
                    console.log(error);
                    this.isConfirmLoadingListaCliente = false; 
                    this.toastr.error('Hubo un error al enviar la lista de precios'); 
                });  
            },
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel')
        });
    }

    showDeleteConfirm(data: string): void {
        this.clientDataSelected = JSON.parse(JSON.stringify(data));
        this.modalService.confirm({
            nzTitle: '¿Esta seguro que desea eliminar el cliente?',
            nzContent: '<b style="color: red;">Se eliminara el cliente: ' + this.clientDataSelected.nombre_empresa_cliente + '</b>',
            nzOkText: 'Si',
            nzOkType: 'danger',
            nzOnOk: () => {                                
                this.clienteService.deleteClient(this.clientDataSelected.id_cliente)
                .subscribe(result => {                    
                    this.toastr.success('Cliente eliminado correctamente!');

                    this.clients = this.clients.filter(obj => obj.id_cliente !== this.clientDataSelected.id_cliente);                   
                    this.clients = [...this.clients];
                }, error => {
                    this.toastr.error('Hubo un error al eliminar el cliente');    
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
            ', del cliente: ' + this.clientDataSelected.nombre_empresa_cliente + '</b>',
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

    onSubmitCliente(){
        this.submittedCliente =  true;

        if(this.clientForm.invalid) {
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
                
            this.isConfirmLoadingCliente = false;
            this.isVisibleCliente = false;
            this.toastr.success('Cliente actualizado!');  

            this.clienteService.getClientes()
            .subscribe(request => {
                this.clients = request;
                this.isLoading = false;
            },
            error => {
                console.log(error);
            }
        );

        }, err => {
            console.log(err);
            this.isConfirmLoadingCliente = false;

            if (err.error.msg.fields) {
                if(err.error.msg.fields.un_nombre_empresa_cliente)
                    this.toastr.error('El nombre de la empresa ingresado ya existe.');
                if(err.error.msg.fields.un_correo_cliente)
                    this.toastr.error('El correo ingresado ya existe.');             
            } else {
                this.toastr.error('Hubo un error al agregar el cliente');  
            }      
                   
        })
        this.submittedCliente = false;  
    }

    exportarExcel(){
        this.isConfirmLoadingExcel = true;     
        this.clienteService.exportExcel(this.clientDataSelected.id_cliente)
        .subscribe((data) => {
            saveAs(data, `Lista de Productos de ${this.clientDataSelected.nombre_empresa_cliente}.xlsx`)        
            this.isConfirmLoadingExcel = false;     
        }, err => {
            console.log(err);
        });
        
    }

    resetListaProductos(): void{
        this.products = this.productsBackup;
        this.searchValueListaProductos = '';
    }

    searchListaProductos(): void {        
        this.products = this.transformSearch(this.products, this.searchValueListaProductos, 'nombre_producto');
    }

    resetListaProductosCliente(): void{
        this.productsClientsList = this.productsClientsListBackup;
        this.searchValueListaProductosCliente = '';
    }

    searchListaProductosCliente(): void {           
        this.productsClientsList = this.transformSearch(this.productsClientsList, this.searchValueListaProductosCliente, 'nombre_producto');
    }
   
    resetListaCliente(): void{
        this.clients = this.clientBackup;
        this.searchValueListaCliente = '';
    }

    searchListaCliente(): void { 
        this.clients = this.transformSearch(this.clients, this.searchValueListaCliente, 'nombre_cliente');
    }

    transformSearch(itemList: any, searchKeyword: string, nombre_columna: string)  {
        if (!itemList)
          return [];
        if (!searchKeyword)
          return itemList;
        let filteredList = [];
        if (itemList.length > 0) {
          searchKeyword = searchKeyword.toLowerCase();
          itemList.forEach(item => {                
                let columna = item[nombre_columna];
                for(let i=0;i<columna.length;i++)
                {                
                    if (columna) {
                        if (columna.toString().toLowerCase().indexOf(searchKeyword) > -1) {
                            filteredList.push(item);
                            break;
                        }
                    }
                }
          });
        }
        return filteredList;
    }
    
    currentPageDataChangeMarkProduct($event: Product[]): void {
        this.listOfDisplayDataMarkProduct = $event;        
        this.refreshStatusMarkProduct();
    }

    refreshStatusMarkProduct(): void {
        this.isAllDisplayDataCheckedMarkProduct = this.listOfDisplayDataMarkProduct.every(item => this.mapOfCheckedIdMarkProduct[item.id_producto]);        
        this.isIndeterminateMarkProduct = this.listOfDisplayDataMarkProduct.some(item => this.mapOfCheckedIdMarkProduct[item.id_producto]) && !this.isAllDisplayDataCheckedMarkProduct;
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