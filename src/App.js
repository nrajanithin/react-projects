import React from 'react';
import axios from 'axios';
import validator from 'validator';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
class App extends React.Component
{
  /*callAPI()
  {
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => this.setState({apiResponse:res}));
  }
  componentWillMount()
  {
    this.callAPI();
  }*/
  render()
  {
    return(
      <Header/>     
    );
  }
}
class Header extends React.Component
{
  render()
  {

    return(
      <>
      
      <div className="center">
        <h1>Add Pets Screen</h1>
      </div>
      <Router>
      <div className="container center">
        <nav className="menu">
          
            <div className="menu__right">
                <ul className="menu__list">
                    <li className="menu__list-item"><Link className="menu__link" to="/home">Home</Link></li>
                    <li className="menu__list-item"><Link className="menu__link" to="/profile">My Profile</Link></li>
                    <li className="menu__list-item"><Link className="menu__link" to="/community">My Community</Link></li>
                    <li className="menu__list-item"><Link className="menu__link" to="/mypet">My Pet</Link></li>
                    <li className="menu__list-item"><Link className="menu__link" to="/username">User Name</Link></li>
                </ul>
            </div>        
         </nav>
       </div> 
       <div className="raju">
       <div className="bmenu">
        <ul className="withoutDots">
          <li><Link className="buttonClass first btn btn-primary" to="/addpet">ADD PET</Link></li>
         <br/>
        <li><Link  className="buttonClass btn btn-primary" to="/existingpet">EXISTING PET</Link></li>
        <br/>
        <li><Link  className="buttonClass btn btn-primary" to="/">HELP</Link></li>
        <br/>
        <li><Link  className="buttonClass btn btn-primary" to="/">SUPPORT</Link></li>
        <br/>
        <li><Link  className="buttonClass btn btn-primary" to="/">ABOUT</Link></li>
        </ul>
        </div>
       </div>
       <div className="kshatriya">
         <Switch>
                <Route exact path="/home">
                 <Home/>
                </Route>
                <Route exact path="/addpet">
                 <AddPet/>
                </Route>
                <Route exact path="/existingpet">
                  <ExistingPet/>
                </Route>
          </Switch>
       </div>   
          </Router>   
       </>
    );
  }
}
class ExistingPet extends React.Component
{
  constructor(props)
  {
     super(props);
     this.state = {respons : []};
     fetch("http://localhost:9000/testAPI/data")
     .then(res => res.json())
     .then(data => this.setState({respons : data.pets}))
  }
  handleReRender = ()=>
  {
    fetch("http://localhost:9000/testAPI/data")
     .then(res => res.json())
     .then(data => this.setState({respons : data.pets}))
  }
  handlerDelete = (e)=>
  {
     console.log(e);
     try{
      axios.delete("http://localhost:9000/testAPI/data/"+e)
      .then(res => console.log(res)) 
      .then(this.handleReRender)
     }
      catch(e)
      {
        console.log(e);
      }
  }
  render()
  {
    console.log(this.state);
    return(
      <div className="existingpets">
        {
          this.state.respons.map(pet=>(
            <div>
              <h5>Owner Name : {pet.owner_name}</h5>
              <h5>Pet Name: {pet.pet_name}</h5>
              <img src={pet.image} width="120px" height="120px"/>
              <button onClick={()=>this.handlerDelete(pet._id)} style={{marginLeft:"50px"}} >Delete</button>
              <p>----------------------</p>
            </div>    
          ))
        } 
      </div>
    );     
  }
}
class AddPet extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
                warning : "",
                pic_name : "",
                display : true,
                owner_name : "",
                pet_type : "",
                petpicture : null,
                pet_breed : "",
                pet_location :"",
                owner_details : "",
                pet_name : "",
                contact : ""
                };
  } 
   changeHandler = (e)=>
   {
       this.setState({warning:""})
       this.setState({[e.target.name]:e.target.value});
       if(e.target.name == "owner_name")
       {
         this.setState({owner_name : e.target.value});
       }
       if(e.target.name == "pet_type")
       {
         this.setState({pet_type : e.target.value});
       }
       if(e.target.name == "pet_breed")
       {
         this.setState({pet_breed : e.target.value});
       }
       if(e.target.name == "pet_location")
       {
         this.setState({pet_location : e.target.value})
       }
       if(e.target.name == "owner_details")
       {
         this.setState({owner_details : e.target.value});
       }
       if(e.target.name == "pet_name")
       {
         this.setState({pet_name : e.target.value});
       }
       if(e.target.name == "contact")
       {
         console.log(e.target.name);
         var x = e.target.value;
         if(validator.isMobilePhone(x) && x.length==10)
         {
            console.log(x);
            this.setState({warning : ""});
            this.setState({contact : x})
         }
         else{
            this.setState({warning : "* please enter valid phone number *"});
         }
       }
       if(e.target.name == "petpicture")
       {
         console.log(e.target.files[0]);
        try{
          if(e.target.files[0].name.includes('.png') || e.target.files[0].name.includes('.jpg'))
          {
            console.log("picture ok");
            console.log(e.target.files[0].name);
            this.setState({petpicture : e.target.files[0]})
            this.setState({pic_name : e.target.files[0].name})
          }
          else
          {
            this.setState({warning : "* please upload a valid file *"});
          }
        }
        catch(e)
        {
          console.log(e);
        }
        /* const fd = new FormData();
         fd.append('image',this.state.petpicture,this.state.petpicture.name);*/
       }
   }
   submitHandler = (event)=>
   {
     var formData = new FormData();
     formData.append('image',this.state.petpicture);
     formData.append('owner_name',this.state.owner_name);
     formData.append('pet_type',this.state.pet_type);
     formData.append('pet_breed',this.state.pet_breed);
     formData.append('pet_location',this.state.pet_location);
     formData.append('owner_details',this.state.owner_details);
     formData.append('pet_name',this.state.pet_name);
     formData.append('contact',this.state.contact);
     axios.post("http://localhost:9000/testAPI/data",formData)
     .then(res => console.log(res))
     console.log(this.state);
     this.setState({display : false})
     setTimeout(function() { 
      this.setState({display: true}) 
      }.bind(this), 3000)
   }
   render()
   {
     return(
       <div>
         {
           this.state.display ?
         <form className="formClass" onSubmit={this.submitHandler}>
           <label style={{color:"black"}}>{this.state.warning}</label>
           <table>
              <tbody>
             <tr>
               <td><label>Owner Name</label></td>
               <td><input onChange={this.changeHandler} name="owner_name" type="text" required/></td>
             </tr>
             <tr>
             <td><label>Pet Type</label></td>
               <td><input type="text" onChange={this.changeHandler} name="pet_type" required/></td>
             </tr>
             <tr>
             <td><label>Pet Breed</label></td>
               <td><input type="text" onChange={this.changeHandler} name="pet_breed" required/></td>
             </tr>
             <tr>
             <td><label>Pet Pictures</label></td>
               <td><input type="file"  onChange={this.changeHandler} name="petpicture" required/></td>
             </tr>
             <tr>
             <td><label>Pet Location</label></td>
               <td><input type="text" onChange={this.changeHandler} name="pet_location" required/></td>
             </tr>
             <tr>
             <td><label>Owner Details</label></td>
               <td><input type="text" onChange={this.changeHandler} name="owner_details" required/></td>
             </tr>
             <tr>
             <td><label>Pet Name</label></td>
               <td><input type="text" onChange={this.changeHandler} name="pet_name" required /></td>
             </tr>
             <tr>
             <td><label>Contact</label></td>
               <td><input type="text" onChange={this.changeHandler} name="contact" required  minLength={10} maxLength={10}/></td>
             </tr>
             </tbody>
           </table>
           <input type="submit" value="Submit"/>
         </form> :  "form submitted and redirecting to the form in 5 seconds."
   }
       </div>
     );
   }
}
class Home extends React.Component
{
  render()
  {
    return(
      <div className="homediv">
        <h1>This is Raja Nithin Varma's Home Page</h1>
      </div>
      
    );
  }
}
export default App;
