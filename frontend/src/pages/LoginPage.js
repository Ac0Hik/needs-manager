import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <div className='container mt-5 '>
            <div className='h-100 d-flex justify-content-center align-items-center '>
                <Form onSubmit={loginUser} className="mt-5 p-5 border border-primary rounded w-50">
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>username:</Form.Label>
                        <Form.Control name="username" type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
           </div>
        </div>
    )
}

export default LoginPage



