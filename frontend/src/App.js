import {useEffect, useState} from 'react';
import axios from 'axios';
import Preloader from './components/Preloader';
import {get, post, put} from './functions';
function App() {
  //state used for to add items
  const [todo, setTodo]= useState({title:'',content:''});
  //state used for to get all items
  const [todos, setTodos]= useState(null);
  //state used for to update items
  const [currentId, setCurrentId]= useState(0);

  useEffect(() =>{
    let currentTodo = currentId !== 0 ? todos.find(todo => todo._id === currentId):{title:'',content:''}
    setTodo(currentTodo);
  },[currentId])
  //to get all items
useEffect(() =>{
  const fetchData = async() =>{
    const result = await get();
    setTodos(result);
    <Preloader/>
  }
  fetchData()
},[currentId])
const clear = () =>{
  setCurrentId(0);
  setTodo({title:'',content:''});
}
useEffect(() =>{
const clearField = (e) =>{
  if(e.keyCode === 27){
    clear();
  }
}
window.addEventListener('keydown', clearField)
return () =>window.removeEventListener('keydown', clearField)

},[]);
//to delete item by its _id
const deleteItem = async (id)=>{
  try{
  const result = await axios.delete(`http://localhost:5500/${id}`);
  const newList = todos.filter(todo=> todo._id !== id);
  setTodos(newList);
  console.log(result.data);}
  catch(error){
    console.error(error)
}
}
//to add items
const onSubmitHandler = async (e) => {
  e.preventDefault();
  if(currentId === 0){
  const result = await post(todo);
  setTodos(old => [...old, result]);
  console.log(result);}
  else{
    await put(currentId, todo);
  }
  clear() ;
  //setTodo({title:'',content:''});
}
  return (
    <div className="container">
    <div className="row">
    <h1 className="center-align teal-text">TODO APP</h1>
    <form className="col s12" onSubmit={e => onSubmitHandler(e)}>
    <div className="row">
      <div className="input-field col s6">
        <i className="material-icons prefix teal-text">title</i>
        <input id="title" type="text" className="validate"
        value={todo.title} onChange={e=>setTodo({...todo, title: e.target.value})} />
        <label htmlFor="title">Title</label>
      </div>
      <div className="input-field col s6">
        <i className="material-icons prefix teal-text">description</i>
        <input id="description" type="text" className="validate"
        value={todo.content} onChange={e=>setTodo({...todo, content: e.target.value})} />
        <label htmlFor="description">Content</label>
      </div>
    </div>
    <div className="row right-align">
    <button className="waves-effect waves-light btn">Submit</button>
    </div>
    </form>
  
    {
      !todos? <Preloader/>: todos.length>0?
      <div className="row">
      {todos.map(item=>(
        <ul className="collection with-header">
        <li key={item.id}
        //onClick={()=>setCurrentId(todo._id)}
        class="collection-item"><div><h5>{item.title}</h5><p>{item.content}</p><a href="#" class="secondary-content" onClick={()=>{deleteItem(item._id)}}><i class="material-icons">delete</i></a>
        <a href="#" class="secondary-content" onClick={()=>{setCurrentId(item._id)}}><i class="material-icons">edit</i></a></div></li>
      </ul>
        ))}
</div> : <div>NOTING TO DO</div>
    }

  

</div>

</div>
  );
}

export default App;
