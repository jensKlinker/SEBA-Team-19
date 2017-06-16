import * as mongoose from "mongoose";
import {OfferRepository} from "../offer/offer-repository";
import {DatabaseConnection} from "./database-connection";
import {RequestRepository} from "../request/request-repository";
import {InfluencerRepository} from "../influencer/influencer-repository";

export class Database {
    private static instance: Database;
    private offerRepository: OfferRepository;
    private requestRepository: RequestRepository;
    private inluencerRepository: InfluencerRepository;

    private constructor() {
        let connection: mongoose.Connection = mongoose.createConnection(DatabaseConnection.defaultConnection());
        this.offerRepository = OfferRepository.createNewInstance(connection);
        this.requestRepository = RequestRepository.createNewInstance(connection);
        this.inluencerRepository = InfluencerRepository.createNewInstance(connection);
    }

    public static connect(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public accessOfferRepository() {
        return this.offerRepository;
    }

    public accessRequestRepository():RequestRepository{
        return this.requestRepository;
    }
    public accessInfluencerRepository():InfluencerRepository{
    return this.inluencerRepository;
}
}