import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

import { NzModalService } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sidebar-right-inner',
    templateUrl: './sidebar-right-inner.component.html',
    styleUrls: ['./sidebar-right-inner.component.css']
})
export class SidebarRightInnerComponent implements OnInit, OnDestroy {

    public categorias: Categoria[];

    isVisibleAgregarCategoria = false;
    isConfirmLoadingAgregarCategoria = false;

    public categoriaDataSelected: Categoria;

    constructor(
        public categoriaService: CategoriaService,
        private modalService: NzModalService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {

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

    showDeleteConfirmCategoria(categoria: Categoria): void {
        this.categoriaDataSelected = JSON.parse(JSON.stringify(categoria));
        this.modalService.confirm({
            nzTitle: '¿Esta seguro que desea eliminar la categoria?',
            nzContent: '<b style="color: red;">Se eliminara la categoria ' + this.categoriaDataSelected.nombre_categoria + '</b>',
            nzOkText: 'SI',
            nzOkType: 'danger',
            nzOnOk: () => {
                console.log('OK');
            },
            nzCancelText: 'No',
            nzOnCancel: () => {
            }
        });
    }
}