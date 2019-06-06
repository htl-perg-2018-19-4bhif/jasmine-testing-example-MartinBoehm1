import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice, InvoiceLineComplete } from './invoice-calculator.service';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoiceLines: InvoiceLineComplete[] = [{ product: 'Pizza', priceInclusiveVat: 6, vatCategory: VatCategory.Food, priceExclusiveVat:5},
  { product: 'Drink', priceInclusiveVat: 3, vatCategory: VatCategory.Drinks, priceExclusiveVat: 2.73}];
  invoiceLinesIncomplete: InvoiceLine[] = [{ product: 'Pizza', priceInclusiveVat: 6, vatCategory: VatCategory.Food},
  { product: 'Drink', priceInclusiveVat: 3, vatCategory: VatCategory.Drinks}];
  service = new InvoiceCalculatorService(undefined);
  service2=new VatCategoriesService();
  invoice: Invoice//=this.service.CalculateInvoice(this.invoiceLines);

  vatCategoryString;
  priceInclusiveVat = 0;
  product;
  constructor(private invoiceCalculator: InvoiceCalculatorService) { }

  addInvoice() {
    this.service = new InvoiceCalculatorService(undefined);
    if(this.vatCategoryString==="Drinks"){
      let priceExclusiveVat=this.service.CalculatePriceExclusiveVat(this.priceInclusiveVat,this.service2.getVat(VatCategory.Drinks));
      this.invoiceLines.push({product:this.product,priceInclusiveVat:this.priceInclusiveVat,vatCategory:VatCategory.Drinks, priceExclusiveVat: priceExclusiveVat})
    }
    if(this.vatCategoryString==="Food"){
      let priceExclusiveVat=this.service.CalculatePriceExclusiveVat(this.priceInclusiveVat,this.service2.getVat(VatCategory.Food));
      this.invoiceLines.push({product:this.product,priceInclusiveVat:this.priceInclusiveVat,vatCategory:VatCategory.Food, priceExclusiveVat:priceExclusiveVat})
    }
    //this.invoice=this.service.CalculateInvoice(this.invoiceLines);
  }
}
