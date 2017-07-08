import {Observable} from "rxjs/Observable";
import InsSelfData from "../data-objects/ins-self-data";
import {Config} from "../config/config";
import JsonExtractor from "./json-extractor";
import ServiceErrorHandler from "./service_error_handler";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {CookieHandler} from "./cookie-handler";


const INSTAGRAMM_BACKEND_BASE_URL = Config.backend_address + ":" + Config.backend_port + Config.backend_base_url + "instagram/";

@Injectable()
export class InstagrammDataService{
    private http:Http;


    constructor(http: Http) {
        this.http = http;
    }

    public getSelfData():Observable<InsSelfData>{
        let accessToken = CookieHandler.getCookie("token");
        let url = INSTAGRAMM_BACKEND_BASE_URL + "self/"+accessToken;
        let selfData: Observable<InsSelfData> = this.http.get(url)
            .map(JsonExtractor.extractData)
            .catch(ServiceErrorHandler.handleError);
        return selfData;
    }
}