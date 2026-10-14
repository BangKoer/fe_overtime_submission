import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth_services } from '../../services/auth_service';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { email: email, password: password };
        try {
           const res = await auth_services.login(loginData);
           await localStorage.setItem("token", res.data.data.token)
           navigate('/')
        } catch (error) {
            throw error.response ? error.response.data : error
        }
    }

    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Login</Card.Title>

      
                            <Form.Group className="mb-3" controlId="input-personal-email">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="input-personal-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button onClick={(e) => handleLogin(e)} variant="primary" className="w-100 mt-2">
                                Submit
                            </Button>
                     
                    </Card.Body>
                </Card>
            </Container>
        </>
    );

}

export default Login;