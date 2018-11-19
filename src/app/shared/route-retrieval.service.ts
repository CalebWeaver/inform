import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class RouteRetrievalService {

  constructor(public http: HttpClient) {}

  public getRoute(uuid: string): Observable<any> {
    return this.http.get('https://inform-routing.herokuapp.com/api/papers?uuid=%27' + uuid + '%27');
  }
}
