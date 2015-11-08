import {loadParties} from './initialize_parties';

export * from './publish';

Meteor.startup(function(){
    loadParties();
});