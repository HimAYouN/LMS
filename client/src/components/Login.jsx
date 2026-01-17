import { useState } from "react";

function Login({role}){


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = (e)=>{
        e.preventDefault();
        console.log(username);
        console.log(password);
        console.log(role);
    }

    return(

        <>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input className="inputField" type="text" name="username" id="username" onChange={(e)=>{setUsername(e.target.value)}} />
            <label htmlFor="password">Password:</label>
            <input className="inputField" type="password" name="password" id="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={submitForm}> Login </button>
        </>
    )
}


export default Login;