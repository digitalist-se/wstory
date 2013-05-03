
Stories = new Meteor.Collection("stories");

var storiesHandle = Meteor.subscribe('stories');

Template.navigation.events({
  'click button' : function () {
    Session.set("createError", null);
    openCreateDialog();
  },
  'keyup input#search' : function (e) {
    console.log($(e.target).val());
  }
});

Template.navigation.loggedIn = function() {
  return Meteor.userId();
};

Template.main.events({
  'click tr' : function(event) {
    Session.set('selected', this._id);
    Session.set("createError", null);
    openCreateDialog();
  }
});

var openCreateDialog = function () {
  Session.set("showCreateDialog", true);
};

Template.modals.showCreateDialog = function () {
  return Session.get("showCreateDialog");
};

var openViewDialog = function () {
  Session.set("showViewDialog", true);
};

Template.modals.showViewDialog = function () {
  return Session.get("showViewDialog");
};

Template.main.stories = function () {
  return Stories.find({}, {sort: {value: 1}});
};

Template.createDialog.story = function () {
  return Stories.findOne(Session.get("selected"));
};


Template.createDialog.events({
  'click .save': function (event, template) {
    var title = template.find(".title").value;
    var description = template.find(".description").value;
    var create_another = template.find("#create-another").value;
    if (title.length && description.length) {
      Meteor.call('createStory', {
        name: title,
        desc: description
      }, function (error, story) {
        if (!error) {
          Session.set("selected", null);
        }
      });
      Session.set("showCreateDialog", false);
      if (create_another) {
        Session.set("createError", null);
        Session.set("showCreateDialog", true);
      }
    } else {
      Session.set("createError",
                  "En story behöver en titel och en beskrivning, varför annars bry sig?");
    }
  },

  'click .cancel': function () {
    Session.set("selected", null);
    Session.set("showCreateDialog", false);
  }
});

Template.createDialog.error = function () {
  return Session.get("createError");
};

Template.createDialog.owner = function () {
  var owner = Meteor.users.findOne(this.owner);
  if (!owner) {
    return '';
  }
  return displayName(owner);
};

Template.viewDialog.stories = function () {
  return Stories.find(Session.get("selected"));
};

Template.viewDialog.events({
  'click .save': function (event, template) {
    Session.set("showViewDialog", false);
  },

  'click .cancel': function () {
    Session.set("showViewDialog", false);
  }
});