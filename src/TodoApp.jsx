import React, { useReducer, useState } from 'react';

const types = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

const initialTodos = [
  { id: 1, title: 'Todo #1 ' },
  { id: 2, title: 'Todo #2' },
];

// aca llamamos al payload como action.payload, donde estara el id que necesitaremos para eliminar un toDo de nuestro estado
const reducer = (state, action) => {
  switch (action.type) {
    case types.DELETE:
      return state.filter((todo) => todo.id !== action.payload);
    case types.ADD:
      // esta es la manera correcta de agregar un nuevo valor a un array, ya que asi estamos devolviendo un nuevo array con el estado anterior y un nuevo objeto dentro de el, sin modificar el estado directamente ya que esta es una fucinon pura.
      return [...state, action.payload];
    case types.UPDATE: {
      // guardamos la tarea que se va a editar en todoEdit
      const todoEdit = action.payload;
      // con map iteramos correctamente ya que nos devolvera un nuevo arreglo, y le decimos que si todo.id es igual a todoEdit.id entonces que nos retorne todoEdit, de lo contrario seguira siendo la misma tarea
      return state.map((todo) => (todo.id === todoEdit.id ? todoEdit : todo));
    }
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { id: Date.now(), title: text };
    dispatch({
      type: types.ADD,
      payload: newTodo,
    });
  };

  return (
    <div>
      <h2>TodoApp</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button
              onClick={() =>
                dispatch({
                  // podemos utilizar el atributo payload cualquier dato que sea necesario para la actualizacion, en este caso el id.
                  type: types.DELETE,
                  payload: todo.id,
                })
              }
            >
              Delete
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: types.UPDATE,
                  // para actualizar enviamos en el payload un objeto con el todo y en el key title enviamos el estado text que haya en ese momento.
                  payload: { ...todo, title: text },
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TodoApp;
