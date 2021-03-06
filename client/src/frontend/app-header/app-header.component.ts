import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {InstagrammDataService} from "../services/instagramm-data.service";

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css'],
    providers: [AuthenticationService, InstagrammDataService]
})

export class AppHeaderComponent implements OnInit {
    private authenticationService: AuthenticationService;
    private instagrammDataService: InstagrammDataService;
    private influencerPicture:string;


    constructor(authenticationService: AuthenticationService, instagrammDataService: InstagrammDataService) {
        this.authenticationService = authenticationService;
        this.instagrammDataService = instagrammDataService;
        this.influencerPicture = null;
    }

    ngOnInit(): void {
        if (this.authenticationService.isLoggedIn()) {
            this.instagrammDataService.getSelfData()
                .subscribe(
                    selfData => {
                        this.influencerPicture = selfData.profilePictureUrl;
                    },
                    error => {
                        throw new Error(error);
                    }
                );

        } else {
            $('#dropdownLink').hide();
            $('#heartplus').hide();
        }
    }
}