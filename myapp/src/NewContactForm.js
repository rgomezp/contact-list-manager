import React from 'react';
import './App.css';

class NewContactForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name  : '',
      phone : '',
      birth : '',
      nameField  : {},
      phoneField : {},
      birthField : {}
    }
  }

  textChange(event, key){
    var text = event.target.value;
    if(key==="name"){
      this.setState({
        name:text,
        nameField: {borderColor:'#ced4da'}
      })
    }else if(key==="phone" && !isNaN(text) && text.length <= 10){
      this.setState({
        phone:text,
        phoneField: {borderColor:'#ced4da'}
      })
    }
  }

  dateChange(event){
    this.setState({
      birth: event.target.value,
      birthField: {borderColor:'#ced4da'}
    });
  }

  clearForm(){
    this.setState({
      name  : '',
      phone : '',
      birth : '',
    })
  }

  createContact(){
    // VALIDATE
    var goodName = false;
    var goodPhone = false;
    var goodDate = false;

    // name
    if(this.state.name.length !== 0)    goodName = true;
    else this.setState({nameField:{borderColor:'red'}})

    // phone
    if(this.state.phone.length === 10)  goodPhone = true;
    else this.setState({phoneField:{borderColor:'red'}})

    // date
    var dateArr = this.state.birth.split('-');

    dateArr.filter(function(chars){
      return !isNaN(chars) && chars.length === 2;
    });

    if(dateArr.length === 3) goodDate = true;
    else this.setState({birthField:{borderColor:'red'}})

    // POST NEW CONTACT TO SERVER
    if(goodName && goodPhone && goodDate){
      fetch('/create', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          phone: this.state.phone,
          birthday: this.state.birth
        })
      }).then((res) => {
        if(res.status === 200){
          this.clearForm();
          window.location.reload();
        }
      })
      .catch(err=>console.log('miscellaneous error: ', err));
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className='NCF-form'>

            {/* NAME FIELD */}
            <input style={this.state.nameField} onChange={(e)=>this.textChange(e, 'name')} value={this.state.name} placeholder='Name' className='form-control'></input>

            {/* PHONE FIELD */}
            <input style={this.state.phoneField} onChange={(e)=>this.textChange(e, 'phone')} value={this.state.phone} placeholder='Phone' className='form-control'></input>

            {/* BIRTH FIELD */}
            <label>Birthday</label>

            <input style={this.state.birthField} onChange={(e)=>this.dateChange(e)} value={this.state.birth} type='date' className='form-control'></input>

            {/* BUTTON */}
            <button onClick={()=>this.createContact()} type='submit' className='btn btn-success'>ADD CONTACT</button>

          </div>
        </div>
      </div>
    )
  }
}

export default NewContactForm;
