
import React, {useContext,useState} from 'react';
import Context from '../context/Context';
import {Modal,ModalBody,ModalHeader,Input,Label,Button,DropdownToggle,DropdownItem,UncontrolledDropdown,DropdownMenu} from 'reactstrap'

import './index.css'

const AddUserButton = () => {

    const getContext = useContext(Context);
    const [modalToggle,setModalToggle] = useState(false)
    const [password,setPassword] = useState()
    const [name,setName] = useState()
    const [lastName,setLastName] = useState()
    const [role,setRole] = useState()
    const [userName,setUserName] = useState()

    const addUser = ()=>{
        let data = {
          name: name,
          userName: userName,
          lastName: lastName,
          password: password,
          role:role
        }
        getContext.addUserFunc(data)
        setModalToggle(!modalToggle)
    }
   return (
      <React.Fragment> 
        <button type="button" className="btn btn-primary" onClick={()=>setModalToggle(!modalToggle)}>Add User</button>
        <Modal isOpen={modalToggle} toggle={() => setModalToggle(!modalToggle)}>
            <ModalHeader toggle={() => setModalToggle(!modalToggle)}>Add User</ModalHeader>
            <ModalBody>
               <Label for="name">Name</Label>
               <Input onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Enter Name"/>
               <Label for="lastName">Last Name</Label>
               <Input type="text" name="lastname" placeholder="Enter Name" onChange={(e)=>setLastName(e.target.value)}/>
               <Label>Role</Label>
               <UncontrolledDropdown >
                  <DropdownToggle className="btn-block btn-light" caret>{role}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={(e)=>setRole(e.currentTarget.textContent)}>Admin</DropdownItem>
                    <DropdownItem onClick={(e)=>setRole(e.currentTarget.textContent)}>User</DropdownItem>
                  </DropdownMenu>
               </UncontrolledDropdown>
               <Label for="userName">User Name</Label>
               <Input onChange={(e)=>setUserName(e.target.value)} type="email" name="userName" placeholder="Enter user name"/>
               <Label for="userPassword">Password</Label>
               <Input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Enter password"/>
               <Button style={{backgroundColor: '#2EC2FE'}} className="col-3 ml-auto" onClick={() => addUser()} block>Send
                  <img src='assets/arrow.svg' alt="" className="ml-1"/>
               </Button>             
            </ModalBody>
       </Modal>
      </React.Fragment>
   )
}

export default AddUserButton