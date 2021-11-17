import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  sub: Subscription;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    //TODO - Unsubscribe
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.errorMessage$ = this.store.select(getError);

    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductActions.loadProducts());

    //TODO: Unsubscribe
    this.displayCode$ = this.store.select(getShowProductCode);
    } 

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(selectedProduct: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({
      product : selectedProduct
    }))
  }

}
