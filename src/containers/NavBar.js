//**** NAV-BAR COMPONENT ****//

import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import AddUserButton from '../components/AddUserButton';
import {Input} from 'reactstrap'
import './index.css';

const NavBar = (props) => {
    
    let history = useHistory()
    const [searchUserBy, setSearchUserBy] = useState("name");
    
    const handleKeyUp = (e) =>{
        const params = {name:e.target.value,searchUserBy:searchUserBy};
        props.searchUser(params)
    }
    const signOut = ()=>{
        localStorage.clear();
        history.push("/")
    }

    return (
        <div className="d-flex m-4">
            <AddUserButton/>
            <Input onKeyUp={(e)=>handleKeyUp(e)} className="mx-2 col-2" type="text" placeholder="Search User"/>      
            <div className="col-4" >Search By :   
                 <label>
                    <input checked={searchUserBy==='name'} className="mx-1" type="radio" onChange={()=>setSearchUserBy('name')}/>
                    <span className="checkmark"></span>
                    Name 
                </label>
                 <label> 
                    <input checked={searchUserBy!=='name'} className="mx-1" type="radio" onChange={()=>setSearchUserBy('userName')}/>
                    <span className="checkmark"></span>
                    User Name 
                </label>
            </div>     
            <button className="btn btn-secondary col-1 ml-auto" onClick={()=>signOut()}>Sign Out</button>
        </div>
    )

}

export default NavBar