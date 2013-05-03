Meteor.startup(function () {
  if (Stories.find().count === 0) {
    var data = [
      {name: "Meteor Principles",
       desc: "Initial data for a story, example data.",
       value: 4
      },
      {name: "Principles",
       desc: "Initial data for a story, example data #2.",
       value: 4
      },
      {name: "Lipsum Principles",
       desc: "Initial data for a story, example data #3.",
       value: 4
      }
    ];
  }
});