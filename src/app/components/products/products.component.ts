import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }


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
