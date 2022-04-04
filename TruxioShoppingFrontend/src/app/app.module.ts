import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingListComponent } from './ShoppingList/shoppingList.component';
import { AddListDialogComponent } from './ShoppingList/Dialogs/addListDialog.component';
import { EditListDialogComponent } from './ShoppingList/Dialogs/editListDialog.component';
import { DeleteListDialogComponent } from './ShoppingList/Dialogs/deleteListDialog.component';
import { AddItemDialogComponent } from './ShoppingList/Dialogs/addItemDialog.component';
import { EditItemDialogComponent } from './ShoppingList/Dialogs/editItemDialog.component';
import { DeleteItemDialogComponent } from './ShoppingList/Dialogs/deleteItemDialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    AddListDialogComponent,
    EditListDialogComponent,
    DeleteListDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    DeleteItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers:[ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
