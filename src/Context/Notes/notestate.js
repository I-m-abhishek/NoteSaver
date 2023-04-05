
import noteContext from './notecontext';
 const noteState =( props)=>{

    const state={
        "name" : "abhi",
        "class" : "b.tech."
    }
    return (

        <noteContext.Provider value={state}>
            {props.children}
        </noteContext.Provider>
    )
 }
 export default noteState;

