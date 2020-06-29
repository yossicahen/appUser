// **** CONTEXT-PROVIDER COMPONENT ****//

import React, {Component} from "react";
import Context from './Context';
import axios from '../axios/axios';

class ContextProvider extends Component {

    state = {
        appData: [],
    }

    clearData = ()=> {
        this.setState({appData:[]})
    }
    componentDidMount() {
        let page = 0;
        let limit = 20;
        let params = {
            name:{},
            searchBy:'name'
        }
        this.fetchData(page,limit,params) 
    }

    fetchData = (page,limit,params) => {
        axios.get('/', {
                params: {
                page: page,
                limit:limit,
                params:params
                }})
             .then(response => {
                let joined = this.state.appData.concat(response.data);
                this.setState({appData:joined});
            })
             .catch(error => {
                alert(error)
            });
    }
    addUserFunc = (data) => {       
        axios.post('/insert', {
          "userData": data})
         .then(response => {
            let newData = [...this.state.appData]
            newData.push(data)
            this.setState({appData:newData})
            })
         .catch(error => {
            alert(error.response)
         });
    }

    render() {
        return (
            <Context.Provider
                value={{
                state: this.state,
                addUserFunc: this.addUserFunc,
                fetchData:this.fetchData,
                clearData:this.clearData
            }}>
               {this.props.children}
            </Context.Provider>
        )
    }
}
export default ContextProvider
