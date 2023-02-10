import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Product } from 'src/app/common/product'
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',

  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = []
  currentCategoryId: number = 1
  previousCategoryId: number = 1
  searchMode: boolean = false

  //new properties for pagination
  thePageNumber: number = 1
  thePageSize: number = 10
  theTotalElements: number = 0

  previousKeyword: string = ''

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    })
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    if (this.searchMode) {
      this.handleSearchProducts()
    } else {
      this.handleListProducts()
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!

    //if we have different keyword than previous then set page number to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1
    }

    this.previousKeyword = theKeyword

    console.log(`Keyword: ${theKeyword}, Page Number: ${this.thePageNumber} `)

    //now search for products using that keyword
    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword,
      )
      .subscribe(this.processResult())
  }

  handleListProducts() {
    //check for id parameter
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      //get param id as string. convert it into number using "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!
    } else {
      this.currentCategoryId = 1
    }

    // check if we have a different category than previous
    // Note: Angular will reuse the components if it is currently viewed

    //if we have different category id than previous
    //then set the page number to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1
    }

    this.previousCategoryId = this.currentCategoryId

    console.log(
      `Current Id: ${this.currentCategoryId}, PageNumber: ${this.thePageNumber}`,
    )

    //get the products for given id
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId,
      )
      .subscribe(this.processResult())
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products
      this.thePageNumber = data.page.number + 1
      this.thePageSize = data.page.size
      this.theTotalElements = data.page.totalElements
    }
  }
}
