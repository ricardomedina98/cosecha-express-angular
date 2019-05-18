import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef, setTheme } from 'ngx-bootstrap';
 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) {
    setTheme('bs3');
   }
  
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit() {
  }

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London'
    }
  ];

  startEdit(data: string){
    console.log(data);
  };

}
