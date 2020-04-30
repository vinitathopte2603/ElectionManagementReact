
const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'VIEW':
            return state = action.data;
        default:
            return state;
    }
}
export default postReducer