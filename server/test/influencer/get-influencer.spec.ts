var request = require("request");
import {getSampleInfluencers} from "../samples/sample-data";

describe("Test Influencer backend: ", function () {
    const baseUrl = "http://localhost:3010/api/";
    const influencerUrl = "influencers";
    const sampleInfluencers = getSampleInfluencers();


    describe("GET " + baseUrl + influencerUrl, function () {
        it("returns 200", function (done) {
            request.get(baseUrl + influencerUrl, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns all influencers", function (done) {
            request.get(baseUrl + influencerUrl, function (error, response, body) {
                let influencers = JSON.parse(body).data;
                influencers.sort((i1, i2) => (+i1.uuid) - (+i2.uuid));
                let expectedInfluencers = sampleInfluencers;
                expect(influencers).toEqual(expectedInfluencers);
                done();
            });
        });
    });

    describe("GET " + baseUrl + influencerUrl + "/:id", function () {
        const influencerId = 1;
        it("returns 200 ", function (done) {
            request.get(baseUrl + influencerUrl + "/" + influencerId, function (error, response, body) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });
        it("returns influencer for existing id " + influencerId, function (done) {
            request.get(baseUrl + influencerUrl + "/" + influencerId, function (error, response, body) {
                let influencer = JSON.parse(body).data;
                let expectedInfluencer = sampleInfluencers.find((influencer) => +influencer.uuid == influencerId);
                expect(influencer).toEqual(expectedInfluencer);
                done();
            });
        });

        const notExistingInfluencerId = 123456789;
        it("returns 400 for not existing influencer id", function (done) {
            request.get(baseUrl + influencerUrl + "/" + notExistingInfluencerId, function (error, response, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
        it("returns error message for not existing influencer id", function (done) {
            request.get(baseUrl + influencerUrl + "/" + notExistingInfluencerId, function (error, response, body) {
                let errorMessage = JSON.parse(body).error;
                expect(errorMessage).toBe("Cannot find Influencer for id '" + notExistingInfluencerId + "'");
                done();
            });
        });
        it("returns empty data for not existing influencer id", function (done) {
            request.get(baseUrl + influencerUrl + "/" + notExistingInfluencerId, function (error, response, body) {
                let data = JSON.parse(body).data;
                expect(data).toBeNull();
                done();
            });
        });
    });
});