//#region Imports

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingList } from '../Interfaces/ShoppingList';

//#endregion

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
//#region Variables

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };

//#endregion

//#region Functions

    constructor(private http: HttpClient) { }

    getLists(): Observable<ShoppingList[]> {
        return this.http.get<ShoppingList[]>("https://localhost:7047/api/lists")
    }

    addList(newList: ShoppingList): Observable<ShoppingList> {
        return this.http.post<ShoppingList>("https://localhost:7047/api/lists", newList, this.httpOptions)
    }

    updateList(updatedList: ShoppingList): Observable<ShoppingList> {
        return this.http.put<ShoppingList>("https://localhost:7047/api/lists/" + updatedList.id, updatedList, this.httpOptions)
    }

    deleteList(listToDeleteId: number): Observable<ShoppingList> {
        return this.http.delete<ShoppingList>("https://localhost:7047/api/lists/" + listToDeleteId, this.httpOptions)
    }

//#endregion

}