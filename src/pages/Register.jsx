import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function Register() {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    // Disable and enable submit button
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && verifyPassword !== "") && (password === verifyPassword) && (mobileNo.length === 11)){

            setIsActive(true)

        } else {

            setIsActive(false)

        }
    }, [firstName, lastName, email, mobileNo, password, verifyPassword])

    function registerUser(e){
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/users/register`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })

        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.message === "Registered Successfully"){
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobileNo("");
                setPassword("");
                setVerifyPassword("");
                alert("Registration succesful");
                navigate('/login')
            }else if(data.message === "Invalid email format"){
                alert("Email is invalid");
            }else if(data.message === "Mobile number is invalid"){
                alert("Mobile number is invalid");
            }else if(data.message === "Password must be atleast 8 characters long"){
                alert("Password must be at least 8 characters");
            }else{
                alert("Something went wrong");
            }
        })
    }

    return (
        (user.id !== null && user.id !== undefined) ?
            <Navigate to="/courses" />
            :
        <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your First Name" 
                    required
                    value={firstName}
                    onChange={e => {setFirstName(e.target.value)}}
                    />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter your Last Name" 
                    required
                    value={lastName}
                    onChange={e => {setLastName(e.target.value)}}
                    />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter your Email" 
                    required
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control 
                    type="string" 
                    placeholder="Enter your 11 digit mobile number" 
                    required
                    value={mobileNo}
                    onChange={e => {setMobileNo(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    required
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Verify Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Verify your password" 
                    required
                    value={verifyPassword}
                    onChange={e => {setVerifyPassword(e.target.value)}}
                />
            </Form.Group>

            {isActive ?
                <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
                :
                <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
            }
        </Form>
    )

}