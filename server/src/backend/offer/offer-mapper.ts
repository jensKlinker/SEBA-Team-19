import {DBOffer} from "./db-offer";
import {Offer} from "../../../../client/src/frontend/offer-list-view/offer";

export class OfferMapper {

    public static mapAll(dbOffers: DBOffer[]): Offer[] {
        let offers = [];
        for (let dbOffer of dbOffers) {
            offers.push(this.map(dbOffer))
        }
        return offers;
    }

    public static map(dbOffer: DBOffer): Offer {
        return new Offer("2", dbOffer.title);
    }
}