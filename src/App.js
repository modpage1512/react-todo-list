import { v4 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import Todolist from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import React, { Component } from "react";

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    }

    const updateItems = [...this.state.items, newItem];

    this.setState({
      items: updateItems,
      id: uuid(),
      item: '',
      editItem: false
    })
  }

  clearList = () => {
    this.setState({
      items: []
    })
  }
  handleDelete = (id) => {

    const filteredItems = this.state.items.filter(item => item.id !== id);

    this.setState({
      items: filteredItems
    });

  }
  handleEdit = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);

    this.setState({
      item: selectedItem.title,
      items: filteredItems,
      id: id,
      editItem: true
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-5">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput item={this.state.item} handleChange={this.handleChange} handleSubmit={this.handleSubmit} edit={this.state.editItem} />
            <Todolist items={this.state.items} clearList={this.clearList} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
          </div>
        </div>
      </div>
    );
  };

}

export default App;
