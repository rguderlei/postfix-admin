var App = Ember.Application.create();

App.Forwarding = Ember.Object.extend({
    email: "",
    destination: "",
    name: function(){
        return this.get("email").split("@")[0];
    }.property("email")
});

var fw1 = App.Forwarding.create({email: "ralph@guderlei.de", destination:"foo.bar@example.com"});
var fw2 = App.Forwarding.create({email: "ralph@guderlei.de", destination:"foo.bar@example.com"});

App.ForwardingController = Ember.Object.create({
   forwardings: [fw1, fw2]
});

App.ForwardingDetail = Ember.View.extend({
  classNames: ["row"],
  templateName: 'forwarding-detail'
});

//ForwardingView.append();





