import { useState } from "react";


const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [course, setCourse] = useState("")
    const submitForm = (e) => {
        e.preventDefault();
        console.log("NAME:  "+  username);
        console.log(`Email: ${email}`);
        console.log(`password: ${password}`);
        console.log(`phone: ${phone}`);
        console.log(`course: ${course}`);
    }
  return (
    <div>
        <h2>Register</h2>
        <label htmlFor="username">Username:</label>
        <input className="inputField" type="text" name="username" id="username" onChange={(e)=>{setUsername(e.target.value)}} />
        <label htmlFor="password">Password:</label>
        <input className="inputField" type="password" name="password" id="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        
        <label htmlFor="email">email:</label>
        <input className="inputField" type="email" name="email" id="email"  onChange={(e)=>{setEmail(e.target.value)}}/>
        
        <label htmlFor="phone">phone:</label>
        <input className="inputField" type="number" name="phone" id="phone"  onChange={(e)=>{setPhone(e.target.value)}}/>
        
        <label htmlFor="course">Course:</label>
        <select className="inputField" type="dropdown" name="couse" id="couse" value={course}  onChange={(e)=>{setCourse(e.target.value)}}>
          <option value="null">Select</option>
          <option value="WebDev">WebDev</option>
          <option value="AppDev">AppDev</option>
        </select>
        
        <button onClick={submitForm}> Register </button>
    </div>
  );
};

export default Register;