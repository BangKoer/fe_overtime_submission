import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        // login....
        e.preventDefault();
        const userData = { user_name: 'Sarah S. Kennedy', role: 'Admin' };
        localStorage.setItem('user_data', JSON.stringify(userData))
        navigate('/')
    }

    return (
        <>
            <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '600px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Login</Card.Title>

                        <Form className="mt-3">
                            <Form.Group className="mb-3" controlId="input-personal-email">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="input-personal-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>

                            <Button onClick={(e) => handleLogin(e)} variant="primary" type="submit" className="w-100 mt-2">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );

}

export default Login;