import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    selector: 'data-view-layout-demo',
    templateUrl: './data-view-layout-demo.html'
})
export class DataViewLayoutDemo {
    layout: string = 'list';

    products!: Product[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
}