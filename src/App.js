
import React, { Component } from 'react'
import TodoList from './components/TodoList'
import './App.css';
import { IoAddCircle } from "react-icons/io5";

class App extends Component {
  constructor(props){
    super(props);
    this.state={items:[],currentItem:{text:'',key:'',completed:false,isEditingEnabled:false}}

  }

  componentDidMount(){
      const input=document.getElementById('cursorfocus')
    input.focus()

  }

  handleChange=(e)=>{
    console.log(e.target.value.length)
    this.setState({currentItem:{text:e.target.value,key:Date.now(),completed:false,isEditingEnabled:false}})
  }

  f
  addTODo=(e)=>{
    e.preventDefault();
    if(this.state.currentItem.text.trim().length){
      const updatedList=[...this.state.items,this.state.currentItem]
          this.setState({items:updatedList,currentItem:{text:'',key:'',completed:false,isEditingEnabled:false}})
          localStorage.setItem("ToDoList",JSON.stringify(updatedList))      
  }
  else alert('Input cannot be empty!')  
  }

 
  editTodo=(key)=>{
    const newList=this.state.items?.map((item)=>{
      if(item.key===key){
        item.isEditingEnabled=true;
      }
      else {
        item.isEditingEnabled=false;
      }
      return item
     })
     this.setState({items:newList})
  
  }

  
  updateTodo=(key,newText)=>{
    const newList=this.state.items?.map(item=>{
      if(item.key===key)
      {
        if(newText.trim().length){
          item.isEditingEnabled=false;
          item.text=newText 
        }
        else {
          alert('Edited ToDo cannot be Empty!')
        }
      }
  
       return item;

    })
    this.setState({items:newList})
    localStorage.setItem("ToDoList",JSON.stringify(newList))
  }
  

 deleteTodo=(key)=>{
  const undeleted=this.state.items.filter(item=>{
    return item.key!==key
  })
  const newundeletedList=undeleted?.map(item=>{
    item.isEditingEnabled=false;
   return item
  })
  this.setState({items:newundeletedList})
  localStorage.setItem("ToDoList",JSON.stringify(newundeletedList))
 }


completedTodo=(key)=>{
  const uncompletedTodo=this.state.items?.map(item=>{
    item.isEditingEnabled=false
    if(item.key===key){
      item.completed=!item.completed;
    }
    return item
  })
  this.setState({items:uncompletedTodo})
  localStorage.setItem("ToDoList",JSON.stringify(uncompletedTodo))
}


  render() {
    return (
      <div className="App">
        <div className='todo-container'>
        <h1>Todo List</h1>
          <form className='todo-items' onSubmit={this.addTODo}>
          <input type="text"  value={this.state.currentItem.text} onChange={this.handleChange} id='cursorfocus' placeholder='Enter ToDo'></input>
          {/* <div className='add-button'>
          
          </div> */}
          <IoAddCircle  fontSize={32} style={{cursor: "pointer"}} onClick={this.addTODo}/>
          </form>
          <TodoList items={this.state.items}  deleteTodo={this.deleteTodo} completedTodo={this.completedTodo} editTodo={this.editTodo} updateTodo={this.updateTodo}/>
    
      </div>



        
      </div>
    )
  }
}

export default App

