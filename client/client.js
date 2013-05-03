if (Meteor.isClient) {
  Template.navigation.events({
    'click button' : function () {
      openCreateDialog();
    },
    'keyup input' : function (e) {
      console.log($(e.target).val());
    }
  })
}

var openCreateDialog = function () {
  Session.set("showCreateDialog", true);
};

Template.modals.showCreateDialog = function () {
  return Session.get("showCreateDialog");
};


Template.createDialog.events({
  'click .save': function (event, template) {
    var title = template.find(".title").value;
    var description = template.find(".description").value;
    var public = ! template.find(".private").checked;
    var coords = Session.get("createCoords");

//    if (title.length && description.length) {
//      Meteor.call('createParty', {
//        title: title,
//        description: description,
//        x: coords.x,
//        y: coords.y,
//        public: public
//      }, function (error, party) {
//        if (! error) {
//          Session.set("selected", party);
//          if (! public && Meteor.users.find().count() > 1)
//            openInviteDialog();
//        }
//      });
//      Session.set("showCreateDialog", false);
//    } else {
//      Session.set("createError",
//                  "It needs a title and a description, or why bother?");
//    }
  },

  'click .cancel': function () {
    Session.set("showCreateDialog", false);
  }
});

Template.createDialog.error = function () {
  return Session.get("createError");
};