var React = require('react');
var InputLine = require('./InputLine');
var TodoList = require('./TodoList');

// dummy DB
// id is only there for unique keys - dismisses warning
let id = 0;
const dummyData = [
  { id: id++, task: "Make app not static", completed: false },
  { id: id++, task: "Finish curriculum", completed: true },
  { id: id++, task: "Teach snot-nosed kids to code", completed: false }
];

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  };
  }

  render() {
    return (
      <div>
        <InputLine
          addTodo={(task) => this.addTodo(task)}
        />
        <TodoList
          todos={dummyData}
          toggleTodo={(index) => this.toggleTodo(index)}
          removeTodo={(index) => this.removeTodo(index)}
        />
      </div>
    );
  }
}

module.exports = TodoApp;
