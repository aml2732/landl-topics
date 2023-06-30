import { createStore } from 'redux'
const initialState = {
    messages: []
}

const reducer = (state, action) => {
  if (action.type == 'INCOMINGMESSAGE'){
      let incomingPayload = action.payload;
      if(typeof incomingPayload == 'string'){
          incomingPayload = JSON.parse(action.payload)
      }
      state.messages = state.messages.concat(incomingPayload)
  }
  return {...state};
};



const store = createStore(reducer, initialState)


export default store