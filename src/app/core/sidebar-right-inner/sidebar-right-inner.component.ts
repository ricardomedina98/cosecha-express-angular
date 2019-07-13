import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sidebar-right-inner',
    templateUrl: './sidebar-right-inner.component.html',
    styleUrls: ['./sidebar-right-inner.component.css']
})

export class SidebarRightInnerComponent implements OnInit, OnDestroy {

    public categorias: Categoria[];

    categoriaEditarForm: FormGroup;
    categoriaAgregarForm: FormGroup;

    isVisibleAgregarCategoria = false;
    isConfirmLoadingAgregarCategoria = false;

    isVisibleEditarCategoria = false;
    isConfirmLoadingEditarCategoria = false;

    public categoriaDataSelected: Categoria;

    constructor(
        public categoriaService: CategoriaService,
        private modalService: NzModalService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {

        this.categoriaEditarForm = this.formBuilder.group({
            editarCategoria: ['']
        });

        this.categoriaAgregarForm = this.formBuilder.group({
            agregarCategoria: ['']
        });

        this.categoriaService.getCategoria()
            .subscribe(data => {
                this.categorias = data;
            }, err => {
                console.log(err);
            });
    }

    ngOnDestroy() {

    }

    showModalAgregarCategoria(): void {
        this.isVisibleAgregarCategoria = true;
    }

    handleCancelAgregarCategoria(): void {
        this.isVisibleAgregarCategoria = false;
    }

    onSubmitAgregarCategoria(){

        this. isConfirmLoadingAgregarCategoria = true;

        let categoria = new Categoria(
            null,
            this.categoriaAgregarForm.get('agregarCategoria').value
        ); 
                
        this.categoriaService.addCategoria(categoria)
        .subscribe(result => {
            console.log(result);  
            
            
            this.categorias.push(new Categoria(
                result.Categoria.id_categoria,
                result.Categoria.nombre_categoria
            ));

            this.categorias = [...this.categorias];

            this. isConfirmLoadingAgregarCategoria = false;
            this.handleCancelAgregarCategoria();
            this.toastr.success('Categoria Agregada!');  

        }, err => {
            console.log(err);
            this. isConfirmLoadingAgregarCategoria = false;
            this.toastr.error('Hubo un error al agregar la categoria');       
        })
    }

    showModalEditarCategoria(categoria: Categoria): void {
        this.categoriaDataSelected = JSON.parse(JSON.stringify(categoria));
        this.isVisibleEditarCategoria = true;
        this.categoriaEditarForm.controls['editarCategoria'].setValue(String(this.categoriaDataSelected.nombre_categoria));
    }

    handleCancelEditarCategoria(): void {
        this.isVisibleEditarCategoria = false;
    }

    onSubmitEditarCategoria(){

        this. isConfirmLoadingEditarCategoria = true;

        let categoria = new Categoria(
            this.categoriaDataSelected.id_categoria,
            this.categoriaEditarForm.get('editarCategoria').value
        );        
               
        this.categoriaService.updateCategoria(categoria)
        .subscribe(result => {
         
            this.categoriaService.getCategoria()
            .subscribe(data => {
                this.categorias = data;
            }, err => {
                console.log(err);
            });

            this. isConfirmLoadingEditarCategoria = false;
            this.isVisibleEditarCategoria =  false;
            this.toastr.success('Categoria actualizado!');     

        }, error => {
            
            this. isConfirmLoadingEditarCategoria = false;
            this.toastr.error('Hubo un error al actualizar la categoria');
        })
    }

    showDeleteConfirmCategoria(categoria: Categoria): void {
        this.categoriaDataSelected = JSON.parse(JSON.stringify(categoria));
        this.modalService.confirm({
            nzTitle: '¿Esta seguro que desea eliminar la categoria?',
            nzContent: '<b style="color: red;">Se eliminara la categoria ' + this.categoriaDataSelected.nombre_categoria + '</b>',
            nzOkText: 'SI',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.categoriaService.deleteCategoria(this.categoriaDataSelected.id_categoria)
                .subscribe(result => {
                  this.toastr.success('Categoria eliminada correctamente!'); 
                  this.categorias = this.categorias.filter(obj => obj.id_categoria !== this.categoriaDataSelected.id_categoria);
                  this.categorias = [...this.categorias];
                }, error => {
                  this.toastr.error('Hubo un error al eliminar la categoria');    
                });
            },
            nzCancelText: 'No',
            nzOnCancel: () => {
                
            }
        });
    }
}