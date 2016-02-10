// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },
 
  deleteThisTask() {
    Meteor.call("removeTask", this.props.task._id);
  },

  handleFramework(event){
    event.preventDefault();
 
    // Find the text field via the React ref
    var name = ReactDOM.findDOMNode(this.refs.textFramework).value.trim();
 
    Meteor.call("addFramework", this.props.task._id, name);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textFramework).value = "";
  },

  renderFrameworks() {
    // Get frameworks from this.props.frameworks
    return this.props.task.frameworks.map((framework, index) => {
    
      return <div key={index} className="chip">{framework} <i className="material-icons">close</i></div>;
      
    });
  },



  render() {

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? "checked" : "";

    return (
      <li className={taskClassName}>
{/*
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
*/}

     <div className="row">
              
      <div className="col l1 m1 s1 x1">  

        <a className="btn-floating btn waves-effect waves-light red" onClick={this.deleteThisTask}><
        i className="material-icons">remove</i></a>
      </div>


      <div className="col l9 m9 s9 x9">                           
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>

        <span>  
          <div className="switch">
            <label>
               Visible
              <input type="checkbox" 
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked} 
                />
              <span className="lever"></span>
              Hidden
            </label>
          </div>


</span>

   </div>







</div>
   
     <div className="row">
              <div className="col l12 m12 s12 x12">  

          <form onSubmit={this.handleFramework} >   
              <i className="material-icons margin-right10">thumb_up</i>                       
              <input
                type="text"
                ref="textFramework"
                placeholder="Type to add new framework" 
                />
              <div>
                {this.renderFrameworks()}
              </div>                  
          </form>

          </div>
</div>



      </li>
    );
  }
});