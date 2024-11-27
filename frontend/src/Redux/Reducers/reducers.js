
const initialState = {
    currentUser: null,
    isActive: false,
    loggedInUser: '',
    selectedConversation :null,
    messages: [],
    selectedRoute: ''
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'setSelectedConversation':
            return {...state, selectedConversation: action.payload}
        case 'setMessages':
            return {...state, messages: action.payload}
        case 'autherizeUser':
            return {...state, currentUser: action.payload, isActive: true}
        case 'unAautherizeUser':
            return {...state, currentUser: null, isActive: false}
        case 'setSelected':
            return {...state, selectedRoute: action.payload}
        default: 
            return state;
    }
}