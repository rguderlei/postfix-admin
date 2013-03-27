$(document).ready(function() {
           // bind 'myForm' and provide a simple callback function
           $('#change_password_form').ajaxForm(function() {
               alert("Thank you for your comment!");
           });
});

var App = Ember.Application.create();

App.store = DS.Store.create({
  revision: 4,
  adapter: DS.RESTAdapter.create({ bulkCommit: false })
});

App.Forwarding = DS.Model.extend({
    source: DS.attr('string') ,
    primaryKey: 'source',
    destination: DS.attr('string') ,
    name: function(){
        return this.get("source").split("@")[0].split(".")[1];
    }.property("source"),

    formatted_destination: function(){
        return this.get("destination").replace(",", ", ");
    }.property("destination")
});

App.forwardingsController = Ember.ArrayProxy.create({
  content: App.store.findAll(App.Forwarding)
});

App.ForwardingListEntry = Ember.View.extend({
  classNames: ["row"],
  forwardingsBinding: 'App.forwardingsController'
});

var capitalize = function(aString){
  return aString.charAt(0).toUpperCase() + aString.slice(1);
}

App.User = DS.Model.extend({
    email: DS.attr('string'),
    primaryKey: 'email',
    old_password: DS.attr('string'),
    password: DS.attr('string'),
    password_confirmation: DS.attr('string'),

    name: function(){
        //if( this.get("email") != "") {
        //    var parts = this.get("email").split("@")[0].split["."];
        //    return capitalize(parts[1]) + ", " + capitalize(parts[0]);
        //}

        return this.get("email").split("@")[0];

   }.property("email")
});

App.mailboxesController = Ember.ArrayProxy.create({
  content: App.store.findAll(App.User)
});

App.MailboxListEntry = Ember.View.extend({
  classNames: ["row"],
  mailboxesBinding: 'App.mailboxesController'
});





