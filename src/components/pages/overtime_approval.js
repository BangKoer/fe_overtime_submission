import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function OvertimeApproval() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
                <Card className="p-4 shadow-sm w-100" style={{ maxWidth: '700px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Overtime Approval Form</Card.Title>

                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="employeeId">
                                        <Form.Label>Overtime ID</Form.Label>
                                        <Form.Control type="number" name="employee_id" value={81} required disabled />
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="submittedById">
                                        <Form.Label>Approver ID</Form.Label>
                                        <Form.Control type="number" name="submitted_by_id" value={1} required disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select className="mb-3" controlId="status">
                                        <option>-</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-4" controlId="notes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control as="textarea" rows={3} name="notes" required />
                            </Form.Group>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button variant="danger" type="button">
                                    Cancel
                                </Button>
                                <Button variant="success" type="submit">
                                    Submit Approval
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default OvertimeApproval;