import React from 'react'

export default function Alert(props) {
  const Capitalize=(word)=>{
      if(word==='danger') word='error';
         const newword= word.toLowerCase();
         return newword.charAt(0).toUpperCase() + newword.slice(1);
        
    }
  return (
    <div style={{height: '50px'}}>
     { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{Capitalize(props.alert.type)}:</strong> {props.alert.msg}

    
    
  </div>
  }</div>
    
  )
}

