const initalState = {
    darkTheme : localStorage.getItem('darkTheme') === 'true',
}
const themeReducer = (state = initalState, action)=>{
    switch(action.type){
        case 'TOGGLE_THEME':
            const newDarkTheme = !state.darkTheme;// chỉ khi nào chuyển sang light mode mới chạy
            localStorage.setItem('darkTheme', JSON.parse(newDarkTheme));
            return{
                ...state,
                darkTheme: newDarkTheme,
            }
        default:
            return state;
    }
}
export default themeReducer;