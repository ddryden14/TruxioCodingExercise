//#region Imports

//#region Angular imports

import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

//#endregion

//#region Service Imports

import { ShoppingListService } from '../Services/ShoppingListService';
import { ShoppingItemService } from '../Services/ShoppingItemService';

//#endregion

//#region Interface Imports

import { ShoppingList } from '../Interfaces/ShoppingList';
import { ShoppingItem } from '../Interfaces/ShoppingItem';

//#endregion

//#region Dialog Imports

import { AddListDialogComponent } from './Dialogs/addListDialog.component';
import { EditListDialogComponent } from './Dialogs/editListDialog.component';
import { DeleteListDialogComponent } from './Dialogs/deleteListDialog.component';
import { AddItemDialogComponent } from './Dialogs/addItemDialog.component';
import { EditItemDialogComponent } from './Dialogs/editItemDialog.component';
import { DeleteItemDialogComponent } from './Dialogs/deleteItemDialog.component';

//#endregion

//#endregion

@Component({
  selector: 'app-shoppingList',
  templateUrl: './shoppingList.component.html',
  styleUrls: ['./shoppingList.component.css']
})
export class ShoppingListComponent implements OnInit {

//#region Variables

  displayedColumns: string[] = ['item', 'quantity', 'link', 'actions'];
  selectedList: number = 0;

  lists: ShoppingList[] = []

  items: ShoppingItem[] = []

  emptyListData: ShoppingList = { id: 0, name: "" };
  emptyItemData: ShoppingItem = { id: 0, shoppingListId: 0, name: "" , quantity: 0, link: ""};

//#endregion

//#region Functions

  constructor(
    private shoppingListService: ShoppingListService, 
    private shoppingItemService: ShoppingItemService, 
    public dialog: MatDialog) { }

//#region Click Handlers

  ngOnInit(): void {
    this.shoppingListService.getLists().subscribe(lists => this.lists = lists as ShoppingList[])
  }

  onSelectedListChange(): void {
    this.shoppingItemService.getItems(this.selectedList).subscribe(items => this.items = items as ShoppingItem[])
  }

  onAddListClick(): void {
    this.openAddListDialog();
  }

  onEditListClick(): void {
    this.openEditListDialog();
  }

  onDeleteListClick(): void {
    this.openDeleteListDialog();
  }

  onAddItemClick(): void {
    this.openAddItemDialog();
  }

  onEditItemClick(item: ShoppingItem): void {
    this.openEditItemDialog(item);
  }

  onDeleteItemClick(id:number, name: string): void {
    this.openDeleteItemDialog(id, name)
  }

//#endregion

//#region Dialog Functions

  openAddListDialog(): void {
    const dialogRef = this.dialog.open(AddListDialogComponent, {
      width: '250px',
      data: { id: 0, name: "" },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        this.shoppingListService.addList({ id: 0, name: result} as ShoppingList).subscribe({
          next: data => {
            this.shoppingListService.getLists().subscribe(lists => {
              this.lists = lists as ShoppingList[]
              this.selectedList = data.id
           })
          }
        })
      }
    });
  }

  openEditListDialog(): void {
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      width: '250px',
      data: this.lists.filter(x => x.id == this.selectedList)[0].name,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != this.lists.filter(x => x.id == this.selectedList)[0].name)
      {
        this.shoppingListService.updateList({id: this.selectedList, name: result} as ShoppingList).subscribe({
          next: data => {
            this.shoppingListService.getLists().subscribe(lists => this.lists = lists as ShoppingList[])
          }
        })
      }
    });
  }

  openDeleteListDialog(): void {
    const dialogRef = this.dialog.open(DeleteListDialogComponent, {
      width: '250px',
      data: this.lists.filter(x => x.id == this.selectedList)[0].name,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.shoppingListService.deleteList(this.selectedList).subscribe({
          next: data => {
            this.shoppingListService.getLists().subscribe(lists => this.lists = lists as ShoppingList[])
            this.selectedList = 0
            this.items = []
          }
        })
      }
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '250px',
      data: { id: 0, shoppingListId: 0, name: "" , quantity: 0, link: ""},
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        let newItemData: ShoppingItem = { id: 0, shoppingListId: this.selectedList, name: result.name, quantity: result.quantity, link: result.link}

        this.shoppingItemService.addItem(this.selectedList, newItemData).subscribe({
          next: data => {
            this.shoppingItemService.getItems(this.selectedList).subscribe(items => this.items = items as ShoppingItem[])
          }
        })
      }
    });
  }

  openEditItemDialog(item: ShoppingItem): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '250px',
      data: { name: item.name, quantity: item.quantity, link: item.link},
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && (result.name != item.name || result.quantity != item.quantity || result.link != item.link))
      {
        this.shoppingItemService.updateItem(this.selectedList, {id: item.id, shoppingListId: this.selectedList, name: result.name, quantity: result.quantity, link: result.link}).subscribe({
          next: data => {
            this.shoppingItemService.getItems(this.selectedList).subscribe(items => this.items = items as ShoppingItem[])
          }
        })
      }
    });
  }

  openDeleteItemDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteItemDialogComponent, {
      width: '250px',
      data: name,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.shoppingItemService.deleteItem(this.selectedList, id).subscribe({
          next: data => {
            this.shoppingItemService.getItems(this.selectedList).subscribe(items => this.items = items as ShoppingItem[])
          }
        })
      }
    });
  }

  //#endregion

//#endregion
}