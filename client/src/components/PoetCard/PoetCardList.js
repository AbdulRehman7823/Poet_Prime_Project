import React from 'react'
import readerServices from '../Services/ReaderServices';


const [poets,setPoets] = React.useState([]);

const loadPoets =  ()=>{
    readerServices.getPoets().then(data=>{
        console.log(data);
        setPoets(data);
    }).catch(err=>{
        console.error(err);
    })

}

React.useEffect(()=>{loadPoets},[])
function PoetCardList() {
  return (
    <div> 
        
    </div>
  )
}

export default PoetCardList;