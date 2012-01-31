var App = Ember.Application.create();



App.Forwarding = Ember.Object.extend({
    source: "",
    destination: "",
    name: function(){
        return this.get("source").split("@")[0].split(".")[1];
    }.property("source")
});

var fw1 = App.Forwarding.create({source: "ralph.guderlei@mvbiberach.de", destination:"foo.bar@example.com"});
var fw2 = App.Forwarding.create({source: "karin.guderlei@mvbiberach.de", destination:"baz.blubb@example.com"});

App.ForwardingController = Ember.Object.create({
   forwardings: [fw1, fw2]
});

App.ForwardingListEntry = Ember.View.extend({
  classNames: ["row"],
  templateName: 'forwarding-list-entry'
});

var capitalize = function(aString){
  return aString.charAt(0).toUpperCase() + aString.slice(1);
}

App.Mailbox = Ember.Object.extend({
    email: "",
    password: "",
    password_confirmation: "",

    name: function(){
        //if( this.get("email") != "") {
        //    var parts = this.get("email").split("@")[0].split["."];
        //    return capitalize(parts[1]) + ", " + capitalize(parts[0]);
        //}

        return this.get("email").split("@")[0];

    }.property("email")
});

var m1 = App.Mailbox.create({email: "ralph.guderlei@mvbiberach.de"});
var m2 = App.Mailbox.create({email: "karin.guderlei@mvbiberach.de"});

App.MailboxController = Ember.Object.create({
   mailboxes: [m1, m2]
});

App.MailboxListEntry = Ember.View.extend({
  classNames: ["row"],
  templateName: 'mailbox-list-entry'
});





