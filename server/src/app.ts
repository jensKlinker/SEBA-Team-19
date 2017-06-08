import {OfferRepository} from './backend/offer-repository'
import {OfferRouter} from './backend/OfferRouter'
import {Config} from '../../config/config';
import * as express from "express"
import * as bodyParser from "body-parser";

export class App{
    private application: express.Application;
    private offerRepository: OfferRepository;
    private baseUrl: string;

    public static bootstrap(): express.Application {
        let app = new App();
        app.configure();
        app.registerRoutes();
        return app.application;
    }


    constructor() {
        this.application = express();
        this.offerRepository = new OfferRepository();
        this.baseUrl = Config.backend_base_url;
    }

    private configure() {
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({
            extended:true
        }));
        this.application.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        this.application.use(function(req,res, next){
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');

            next();
        })
    }

    private registerRoutes() {
        let router: express.Router = express.Router();

        //TODO: maybe remove this one or redirect
        router.route('/')
            .get(function (req, res) {
                res.end("Success!");
            });

        let offerRouter: OfferRouter = new OfferRouter();
        offerRouter.configureRoutes(this.baseUrl, this.application);

        this.application.use(router);
    }
}