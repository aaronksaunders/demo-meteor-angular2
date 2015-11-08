/// <reference path="../typings/angular2-meteor.d.ts" />
/// <reference path="../typings/testDemo.d.ts" />

import {Component, View,NgFor,NgIf, NgModel} from 'angular2/angular2';
import {FORM_DIRECTIVES, Control, FormBuilder, ControlGroup, Validators} from 'angular2/angular2';

import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from 'collections/parties';

@Component({
    selector: 'new-party'
})
/**
 *
 */
@View({
    templateUrl: 'client/new-party.html',
    directives: [NgFor, NgModel, NgIf,FORM_DIRECTIVES]
})


/**
 *
 */
export class PartiesAdd extends MeteorComponent {
    partyForm:ControlGroup;
    party:Party;

    /**
     * constructor for the module, injecting the router so I can move around
     * in the application using javascript
     *
     * Need the routeParams to determine if i am working with a new object
     * or an existing one that needs to be updated
     *
     * @param routeParams
     * @param router
     */
    constructor(private routeParams:RouteParams, public router:Router) {
        super();

        var that = this;

        that.router = router;

        // set up the form
        var fb = new FormBuilder();

        that.partyForm = fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            location: ['', Validators.required]
        });

        var partyId = routeParams.get('partyId');
        if (partyId) {
            that.subscribe('party', partyId, () => {
                that.party = Parties.findOne(partyId);

                that.partyForm = fb.group({
                    name: [that.party.name, Validators.required],
                    description: [that.party.description, Validators.required],
                    location: [that.party.location, Validators.required]
                });

            }, true);
        }

    }

    /**
     * add a new event to the system
     *
     * @param event
     */
    add(event) {
        var that = this;

        event.preventDefault();

        var newParty:Party = that.partyForm.value;

        if (that.partyForm.valid) {

            if (that.party) {
                // update object
                Parties.update(that.party._id, {
                    $set: {name: newParty.name, description: newParty.description, location: newParty.location}
                });
            } else {
                Parties.insert({
                    name: newParty.name,
                    description: newParty.description,
                    location: newParty.location
                });
            }

            that.router.navigateByUrl('/');
        }
    }
}
