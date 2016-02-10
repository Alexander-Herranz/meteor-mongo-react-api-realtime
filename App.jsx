// App component - represents the whole app
App = React.createClass({


  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    
    let query = {};
 
    if (this.state.hideCompleted) {
      // If hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }
 
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };

  },


  renderTasks() {
    // Get tasks from this.data.tasks
    return this.data.tasks.map((task) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
 
      return <Task
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton} />;
      
    });
  },


  handleSubmit(event) {

    event.preventDefault();
 
    // Find the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call("addTask", text);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  toggleHideCompleted() {
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    });
  },
 
  render() {
    return (
      <div>
      <div className="container-fluid">
        <nav>
            <div className="nav-wrapper">  
            <div className="row">
              <div className="col l12 m12 s12 x12">    
               <AccountsUIWrapper />
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li><a target="_blank" href="https://www.coverwallet.com/">Coverwallet</a></li>        
                  </ul>
                 </div>
                </div>  
            </div>
        </nav>
        </div>
        <div className="container">
    <div>
        <div className="row">
              <div className="col l12 m12 s12 x12">
                  <h1>Programming Languages List ({this.data.incompleteCount})</h1>
              </div> 
         </div>  


         

          <div className="card z-depth-3">
            <div className="card-content white-text">
<div className="row margin-bottom50">

              <div className="col l3 m3 s12 x12">
                  
                  <label className="hide-completed" htmlFor="mainput">Hide Checked Programming Languages</label>                    
              </div>  
              <div className="col l3 m3 s12 x12">  

                   <div className="switch">
                      <label>
                         Visible
                        <input type="checkbox" 
                              id="mainput"  
                              readOnly={true}
                              checked={this.state.hideCompleted}
                              onClick={this.toggleHideCompleted} 
                          />
                        <span className="lever"></span>
                        Hidden
                      </label>
                    </div> 
                          
               </div>  
</div>  
</div>  

          </div> 

         

          { this.data.currentUser ?
            
          <form className="new-task" onSubmit={this.handleSubmit}>
             <div className="col l12 m12 s12 x12 input-field">    

              <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" ref="textInput" />
          <label htmlFor="icon_prefix">{"Insert a new programming language and press Enter"}</label>
        </div>

            {/*
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new programming language" 
                />
              */}
              </div>
          </form>  : ''
          }


        </div>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
      </div>

    );
  }
});