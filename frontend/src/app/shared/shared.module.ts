import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@app/components/nav/nav.component';
import { CartComponent } from '@app/components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
    
  ],
  exports: [
    NavComponent,
    CartComponent
  ]
})
export class SharedModule { }
