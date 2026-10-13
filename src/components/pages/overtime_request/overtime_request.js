import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function OvertimeRequest() {
    return (
        <>
                <Card className="w-100 border-0">
                    <Card.Body>
                        {/* <Card.Title className="text-center mb-4">Overtime Request Form</Card.Title> */}

                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="employeeId">
                                        <Form.Label>Employee ID</Form.Label>
                                        <Form.Control type="number" name="employee_id" value={11} disabled required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="submittedById">
                                        <Form.Label>Submitted By ID</Form.Label>
                                        <Form.Control type="number" name="submitted_by_id" required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="overtimeDate">
                                <Form.Label>Overtime Date</Form.Label>
                                <Form.Control type="date" name="date" required />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="startTime">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="time" name="start_time" required />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="endTime">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control type="time" name="end_time" required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-4" controlId="overtimeReason">
                                <Form.Label>Reason for Overtime</Form.Label>
                                <Form.Control as="textarea" rows={3} name="reason" required />
                            </Form.Group>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button variant="danger" type="button">
                                    Cancel
                                </Button>
                                <Button variant="success" type="submit">
                                    Submit Request
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
        </>
    );
}

export default OvertimeRequest;