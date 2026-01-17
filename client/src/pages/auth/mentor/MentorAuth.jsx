import React from 'react'
import { useNavigate } from 'react-router-dom';

function MentorAuth() {
    const navigate =useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // authentication logic here
        navigate(`/mentor/dashboard`);
    };
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow-md">
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                    className="border p-2 mb-4 w-full"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
            </form>
           <div className="mt-4 text-center">
  <p className="text-gray-600">
    Not registered?
    <a
      href="mailto:email@example.com?subject=Mentor Registration Request&body=Hello,%0D%0A%0D%0AI would like to register as a Mentor on your application.%0D%0A%0D%0AThank you."
      className="text-blue-500 hover:underline ml-2"
    >
      Click here to request access
    </a>
  </p>
</div>

        </div>
  )
}

export default MentorAuth