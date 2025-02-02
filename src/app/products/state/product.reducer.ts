import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from "../../state/app.state";
import * as ProductActions from './product.actions';
import { act } from "@ngrx/effects";

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState : ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if(currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);


export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state) : ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action) : ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        }
    }),
    on(ProductActions.clearCurrentProduct, (state) : ProductState => {
        return {
            ...state,
            currentProductId: null
        }
    }),
    on(ProductActions.initializeCurrentProduct, (state) : ProductState => {
        return {
            ...state,
            currentProductId:0
        }
    }),
    on(ProductActions.loadProductsSuccess, (state, action) : ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductActions.loadProductsFail, (state, action) : ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updatedProducts,
            currentProductId : action.product.id,
            error: ''
        }
    }),
    on(ProductActions.updateProductFail, (state, action) => {
        return {
            ...state, error : action.error
        }
    }),

    on(ProductActions.deleteCurrentProductFail, (state, action) => {
        return {
            ...state,
            error: action.error
        }
    }),

    on(ProductActions.deleteCurrentProductSuccess, (state, action) => {
        const listWithoutDeletedProduct = state.products.filter(
            item => action.deletedProductId !== item.id);

        return {
            ...state,
            products : listWithoutDeletedProduct
        }
    }),

    on(ProductActions.addProductFail, (state, action) => {
        return {
            ...state,
            error: action.error
        }
    }),

    on(ProductActions.addProductSuccess, (state, action) => {
        const addedNewElementList = [ ...state.products, action.product]

        return {
            ...state,
            products : addedNewElementList
        }
    })


);