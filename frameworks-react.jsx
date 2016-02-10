// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");
//Frameworks = new Mongo.Collection("frameworks");

if (Meteor.isClient) {
  // This code is executed on the client only
 
	Accounts.ui.config({
    	passwordSignupFields: "USERNAME_ONLY"
  });

	Meteor.subscribe("tasks");
  //Meteor.subscribe("frameworks");

	Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    	ReactDOM.render(<App />, document.getElementById("render-target"));
  	});
}


	if (Meteor.isServer) {
	  Meteor.publish("tasks", function () {
	    return Tasks.find();
	  });
	}

	Meteor.methods({
  	addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      frameworks: []
    });

    
  },
 
  removeTask(taskId) {

  	if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },
////////Frameworks
  addFramework(taskId, name) {
    // Make sure the user is logged in before inserting a task
    
 

    console.log("addFramework");
    console.log(name);
    console.log(taskId);

    Tasks.update( {_id: taskId}, { $push: { frameworks: name }} );

 
  },

 /////
  setChecked(taskId, setChecked) {

    Tasks.update(taskId, { $set: { checked: setChecked} });
    const task = Tasks.findOne(taskId);
    console.log("checked task ------>");
    console.log(task);


  },
 
  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});