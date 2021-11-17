import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction('[Product] Set Current Product', props<{ currentProductId : number }>());

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

export const loadProducts = createAction('[Product] Load all products');

export const loadProductsSuccess = createAction('[Product] Load all products - Success', props<{products: Product[]}>());

export const loadProductsFail = createAction('[Product] Load all products - Fail', props<{error: string}>());

export const updateProduct = createAction('[Product] Update product', props<{product: Product}>());

export const updateProductSuccess = createAction('[Product] Update product - Success', props<{product: Product}>());

export const updateProductFail = createAction('[Product] Update product - Fail', props<{error: string}>());