Meteor.startup(function () {
  if (Stories.find().count === 0) {
    var data = [
      {name: "Meteor Principles",
       desc: "Initial data for a story, example data.",
       value: 2
      },
      {name: "Principles",
       desc: "Initial data for a story, example data #2.",
       value: 4
      },
      {name: "Lipsum Principles",
       desc: "Initial data for a story, example data #3.",
       value: 1
      }
    ];
    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var stories_id = Stories.insert({
        name: data[i].name,
        desc: data[i].desc,
        value: data[i].value
      });
    }
  }
});