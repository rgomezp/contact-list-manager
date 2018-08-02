import React from 'react';
import ReactTable from 'react-table';
import './App.css';

class Contacts extends React.Component{
  state = {
    contacts: [],
    columns : [{
      Header: 'Name',
     accessor: 'name' // String-based value accessors!
   }, {
     Header: 'Phone',
     accessor: 'phone',
     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
   }, {
     Header: 'Birthday', // Custom header components!
     accessor: 'birthday'
    }]
  }

  componentDidMount(){
    fetch('/getContacts', {
      method: 'GET',
      credentials: 'same-origin'
    }).then(res => (res.json()))
    .then(json => {
      this.setState({contacts:json});
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render(){
    return(
      <ReactTable
        data={this.state.contacts}
        columns = {this.state.columns}
        className = "table"
        defaultPageSize = {10}
      />
    )
  }
}

export default Contacts;
