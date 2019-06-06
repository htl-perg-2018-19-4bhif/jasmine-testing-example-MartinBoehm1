import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    return priceInclusiveVat/(100+vatPercentage)*100;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    let incl=0;
    let excl=0;
    let thisExcl=0;
    let vat=0;
    let lines:InvoiceLineComplete[];
    for(var i=0;i<invoiceLines.length;i++){
      thisExcl=this.CalculatePriceExclusiveVat(incl, (100+invoiceLines[i].vatCategory));
      lines.push({product: invoiceLines[i].product, vatCategory: invoiceLines[i].vatCategory, priceInclusiveVat: invoiceLines[i].priceInclusiveVat, priceExclusiveVat:thisExcl});
      incl+=invoiceLines[i].priceInclusiveVat;
      excl+=thisExcl;
    }
    vat=incl+excl;
    let newInv:Invoice={invoiceLines: lines, totalPriceInclusiveVat: incl, totalPriceExclusiveVat: excl, totalVat: vat};
    
    return newInv;
  }
}