// Stories
Stories = new Meteor.Collection("stories");

// Publish complete set of stories to all clients.
Meteor.publish('stories', function () {
  return Stories.find();
});