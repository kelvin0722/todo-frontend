import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'

import * as Api from './api'

import TabHeader from "./components/TabHeader";
import ItemList from "./components/ItemList";
import Modal from './components/Modal'

import { ModalActions, Entities }from './constants'

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [modalOpenState, setModalOpenState ] = useState(false)
  const [activeItem, setActiveItem] = useState({
    title: '',
    description: '',
    completed:false
  })
  const [modalAction, setModalAction] = useState(ModalActions.Update)

  const queryClient = useQueryClient()

  const toggleCompleted = (status) =>
    status ? setViewCompleted(true) : setViewCompleted(false);

  const todoItems = useQuery(Entities.Todos, Api.fetchTodos)
  const editTodoMutation = useMutation(Api.updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(Entities.Todos)
    }
  })

  const addTodoMutation = useMutation(Api.addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(Entities.Todos)
    }
  })

  const removeTodoMutation = useMutation(Api.removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(Entities.Todos)
    }
  } )

  const tabItems = todoItems.data?.filter((item) => item.completed === viewCompleted);

  const toggle = () => setModalOpenState(!modalOpenState)
  const handleSubmit = item => {
    if(modalAction === ModalActions.Update) {
      editTodoMutation.mutate(item)
    }
    if(modalAction === ModalActions.Add) {
      addTodoMutation.mutate(item)
    }

    toggle()
  }
  const  handleDelete = item => removeTodoMutation.mutate(item)

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setModalOpenState(!modalOpenState)
    setActiveItem(item)
    setModalAction(ModalActions.Add)
  }

  const editItem = item =>  {
    setActiveItem(item)
    setModalOpenState(!modalOpenState)
    setModalAction(ModalActions.Update)
  }


  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={createItem}>Add task</button>
            </div>
            <TabHeader
              toggleCompleted={toggleCompleted}
              viewCompleted={viewCompleted}
            />
            <ul className="list-group list-group-flush border-top-0">
            {!todoItems.isLoading && <ItemList 
              items={tabItems} 
              editItem={editItem}
              deleteItem={handleDelete}
              /> }
              
            </ul>
          </div>
        </div>
      </div>
      {modalOpenState ? (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
}

export default App;
