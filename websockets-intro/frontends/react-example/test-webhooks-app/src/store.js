import { createStore } from 'redux'
const initialState = {
    messages: []
}

const reducer = (state, action) => {
  console.log('reducer called');
  if (action.type = 'INCOMINGMESSAGE'){
      state.messages = action.payload
  }
  return state;
};



const store = createStore(reducer, initialState)


export default store