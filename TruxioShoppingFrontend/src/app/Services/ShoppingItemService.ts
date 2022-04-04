//#region Imports

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingItem } from '../Interfaces/ShoppingItem';

//#endregion

@Injectable({ providedIn: 'root' })
export class ShoppingItemService {
//#region Variables

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };

//#endregion

//#region Functions

    constructor(private http: HttpClient) { }

    getItems(listId: number): Observable<ShoppingItem[]> {
        return this.http.get<ShoppingItem[]>("https://localhost:7047/api/lists/" + listId + "/items")
    }
    
    addItem(listId: number, newItem: ShoppingItem): Observable<ShoppingItem> {
        return this.http.post<ShoppingItem>("https://localhost:7047/api/lists/" + listId + "/items", newItem, this.httpOptions)
    }

    updateItem(listId: number, updatedItem: ShoppingItem): Observable<ShoppingItem> {
        return this.http.put<ShoppingItem>("https://localhost:7047/api/lists/" + listId + "/items/" + updatedItem.id, updatedItem, this.httpOptions)
    }

    deleteItem(listId: number, idToDelete: number): Observable<ShoppingItem> {
        return this.http.delete<ShoppingItem>("https://localhost:7047/api/lists/" + listId + "/items/" + idToDelete, this.httpOptions)
    }

//#endregion
}