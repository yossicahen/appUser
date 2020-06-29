//**** DASHBOARD COMPONENT ****//

import React, {useContext,useState} from 'react';
import Context from '../context/Context';
import { useHistory } from "react-router-dom";  
import './index.css';
import NavBar from '../containers/NavBar';

const Dashboard = (props) => {
    const  [queryParamsPage,setqueryParamsPage] = useState(20)
    const [queryParamsLimit] = useState(20)
    const [queryParamsName,setqueryParamsName] = useState({name:{},searchBy:'name',order:1})
    let history = useHistory()
    const getContext = useContext(Context);
    const data = getContext.state.appData;

    const searchUser = (params) => {
      getContext.clearData();
      setqueryParamsPage(0);
      setqueryParamsName(params);
      getContext.fetchData(0,20,params);
    }

    const creatingElementsFromData = (data) => {
        let tableRows = data.map((value, index) => {
            return(
              <tr key={index}>
                <th scope="row">{value.userName}</th>
                <td>{value.name}</td>
                <td>{value.lastName}</td>
                <td>{value.role}</td>
             </tr>
            )
        });
      return tableRows
    }

   const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            setqueryParamsPage(queryParamsPage+20)
            getContext.fetchData(queryParamsPage,queryParamsLimit,queryParamsName)
         }
      }

    const authorization = localStorage.getItem('auth-data') === props.location.state.token;
    return (
       authorization?
        <div>
            <NavBar searchUser={searchUser} setqueryParamsName={setqueryParamsName} isAdmin={props.location.state.isAdmin}/>
            <div style={{maxHeight: '75vh',overflow: 'auto'}} onScroll={(e)=>handleScroll(e)}>
              <table className='table table-hover table-bordered'>
                 <thead>
                    <tr className=''>
                        <th scope="col" className=''>USER NAME</th>
                        <th scope="col" className=''>NAME </th>
                        <th scope="col" className=''>LAST NAME</th>
                        <th scope="col" className=''>ROLE</th>
                    </tr>
                 </thead>
                 <tbody>{data?creatingElementsFromData(data):''}</tbody>
              </table>
            </div>
        </div>
      :
       <React.Fragment>{history.push("/")}</React.Fragment>
    );
}

export default Dashboard;