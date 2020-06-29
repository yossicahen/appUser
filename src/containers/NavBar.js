//**** NAV-BAR COMPONENT ****//

import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import AddUserButton from '../components/AddUserButton';
import {Input} from 'reactstrap'
import './index.css';

const NavBar = (props) => {
    
    let history = useHistory()
    const [searchUserBy, setSearchUserBy] = useState("name");
    const [inputVal, setInputVal] = useState('');
    const [order, setOrder] = useState(1);
    

    const handleKeyUp = () =>{
        const params = {name:inputVal,searchBy:searchUserBy,order:order};
        params.name.replace(/\\/g, "\\\\");
        props.searchUser(params)
    }
    const signOut = ()=>{
        localStorage.clear();
        history.push("/")
    }
    const radioButtonToggle = (name) =>{
        setInputVal('')
        setSearchUserBy(name)
    }
    const orderResult = (val)=>{
        const params = {name:inputVal,searchBy:searchUserBy,order:val};
        props.setqueryParamsName(params)
        if(val !== order){
        setOrder(val)
        params.name.replace(/\\/g, "\\\\");
        props.searchUser(params)}
    }

    return (
        <div className="d-flex m-4">
            {props.isAdmin?<AddUserButton/>:''}  
            <Input onChange={(e)=>setInputVal(e.target.value)} onKeyUp={()=>handleKeyUp()} value={inputVal} className="mx-2 col-2" type="text" placeholder="Search User"/>      
            <div className="col-4" >Search By :   
                 <label>
                    <input checked={searchUserBy==='name'} className="mx-1" type="radio" onChange={()=> radioButtonToggle('name')}/>
                    <span className="checkmark"></span>
                    Name 
                </label>
                 <label> 
                    <input checked={searchUserBy!=='name'} className="mx-1" type="radio" onChange={()=> radioButtonToggle('userName')}/>
                    <span className="checkmark"></span>
                    User Name 
                </label>
                <img onClick={()=>orderResult(1)} className="ml-2" style={{transform: 'rotate(270deg)',cursor:"pointer"}} alt="" src='assets/arrow.png'/>
                <img onClick={()=>orderResult(-1)} className="ml-2" style={{transform: 'rotate(90deg)',cursor:"pointer"}} alt="" src='assets/arrow.png'/>    
            </div>
            <button className="btn btn-secondary col-1 ml-auto" onClick={()=>signOut()}>Sign Out</button>
        </div>
    )

}

export default NavBar