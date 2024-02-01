import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [credentials, setCredentials] = useState({ name:"", email: "", password:"", geolocation:""})

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/create-user", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        })
        const json = await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter valid Credentials")
        }
    }
    const onChange =(event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value})
    }
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
        <div class="mb-3">
      <label htmlFor="name" class="form-label">Name</label>
      <input type="text" class="form-control" name='name' value={credentials.name} onChange={onChange}></input>
    </div>
    <div class="mb-3">
      <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"></input>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"></input>
    </div>
    <div class="mb-3">
      <label htmlFor="exampleInputPassword1" class="form-label">Address</label>
      <input type="text" class="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword2"></input>
    </div>
    <button type="submit" class="m-3 btn btn-success">Submit</button>
    <Link to="/login" className='m-3 btn btn-danger'> Already u user</Link>
  </form>
  </div>
  </>
  )
}
