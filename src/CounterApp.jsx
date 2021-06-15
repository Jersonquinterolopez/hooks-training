import React, { useReducer } from 'react';

// algo que es muy comun cuando se trabaja con reducers, es definir los types en constantes de esta manera:

// una buena practica es definir los types en mayuscula y en vez de usar camel case usamos _

// lo que si es importante es que el contenido de estos types sea distinto, para que el switch pueda discriminar que su valor es diferent y llame a la accion respectiva.

// la practica de escribir los types de esta manera es para evitar errores de sintaxis

// al tener varios reducers podemos reutilizar los types, para llamar todas las acciones facilmente.
const types = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
};

// esta funcion para nada va a interactuar con estados externos, asi que la podremos definirla fuera del componente o en un archivo separado.

// podemos nombrarla como counterReducer, pero en este caso como es el unico reducer la dejaremos asi.

// el reducer recibira dos parameters (state, action) y va a retornar un estado, pero para ser mas explicitos lo que va a recibir es un prevState y va a retor nar un NewState
const reducer = (state, action) => {
  // para evitar hardcoder tantas veces el if statement, podemos hacer uso de el switch statement, ya que podriamos tener bastantes action types el switch nos ahorraria lineas de codigo y seria mucho mas legible.
  //   if (action.type === 'increment') {
  //     return state + 1;
  //   }

  //   if (action.type === 'decrement') {
  //     return state - 1;
  //   }

  //   if (action.type === 'reset') {
  //     return 0;
  //   }

  switch (action.type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return 0;

    default:
      return state;
  }

  // es muy importante al final del reducer returnar el estado previo, por si alguno de los actions no se llega a encontrar el reducer regresara el estado previo, de lo contrario si no lo hacemos retornara undefined
  //   return state;
};

const CounterApp = () => {
  // const [counter, setCounter] = useState(initialState)
  // useReducer al igual que useState nos entrega un estado y el dispatch que se encargara de actualizar la informacion

  // tambien podriamos utilizar counterDispatch, es util cuando tenemos varios reducers, pero para este que es el unico lo dejaremos solo como dispatch.

  // como primer argumento a u seReducer le pasamos una funcion pura que llamamos reducer.
  const [counter, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>Clicks: {counter}</h1>
      {/* el dispatch se va llamar al presionar el boton, dispatch va a recibir un action, y esta action va a ser basicamente un objeto, el objeto contendra un type que definira el tipo de accion que va a realizar dentro del reducer */}

      {/* recuerda que este objeto que estamos pasando como argumento es un action, el mismo action que sera pasado como argumento de la funcion reducer */}
      <button onClick={() => dispatch({ type: types.INCREMENT })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: types.DECREMENT })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: types.RESET })}>Reset</button>
    </div>
  );
};

export default CounterApp;
