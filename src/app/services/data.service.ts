import { Http } from "../../../node_modules/@angular/http";
import { AppError } from "../common/app-error";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

export class DataService{
    private url:string;
    private http:Http;

    constructor(http:Http, url:string) {
        this.http=http;
        this.url=url;
    }

    getAll(){
        return this.http.get(this.url)
        .map(response=>response.json())
        .catch(this.handleError);
    }

    create(resource: any) {
        return this.http.post(this.url,JSON.stringify(resource))
        .map(response=>response.json())
        .catch(this.handleError);
    }

    update(resource:any){
        return this.http.patch(this.url+'/'+resource.id,JSON.stringify({isRead:true}))
        .map(response=>response.json())
        .catch(this.handleError);
    }

    delete(id: any) {
        return this.http.delete(this.url+"/"+id)
        .map(response=>response.json())
        .catch(this.handleError);
    }

    private handleError(error:Response){
        if (error.status===404){
        return Observable.throw(new NotFoundError());
        } 
        else if(error.status===400){
        return Observable.throw(new BadInput(error.json()))
        }
        return Observable.throw(new AppError(error.json()));
    }
}