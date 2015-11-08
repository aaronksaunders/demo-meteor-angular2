/// <reference path="../typings/angular2-meteor.d.ts" />
/// <reference path="../typings/testDemo.d.ts" />

import {Component, View, NgModel, NgFor} from 'angular2/angular2';

import {MeteorComponent} from 'angular2-meteor';

import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Parties} from 'collections/parties';

@Component({
    selector: 'parties'
})
@View({
    templateUrl: 'client/party-list.html',
    directives: [NgFor, NgModel,ROUTER_DIRECTIVES]
})
export class PartiesList extends MeteorComponent {
    parties: Mongo.Cursor<Party>;
    location: ReactiveVar<String>;

    constructor() {
        super();
        this.subscribe('parties','Palo Alto');
        this.location = new ReactiveVar('Palo Alto');

        console.log("initialized class");
        var that = this;

        this.autorun(() => {
            that.parties = Parties.find({});
            console.log("initialized parties");
        }, true);
    }
}
