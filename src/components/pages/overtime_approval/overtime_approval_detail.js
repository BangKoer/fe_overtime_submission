import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FiCalendar, FiClock, FiLock } from "react-icons/fi";

function OvertimeApprovalDetail({ data, disabled }) {
    return (
        <>
            <Card className="w-100 border-0">
                <Card.Body>

                    <Row>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="employeeId">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="number" name="employee_id" value={data?.employee_id || 0} disabled={disabled} required />
                            </Form.Group>
                        </Col>
                        <Col md={10}>
                            <Form.Group className="mb-3" controlId="employeeName">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control type="text" name="employee_name" value={data?.employee_name || ""} required disabled={disabled} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="supervisorName">
                                <Form.Label>Supervisor Name</Form.Label>
                                <Form.Control type="text" name="supervisor_name" value={data?.supervisor_name || "Default Supervisor"} disabled={disabled} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="SubmitterName">
                                <Form.Label>Submitter Name</Form.Label>
                                <Form.Control type="text" name="submitter_name" value={data?.submitter_name || data.employee_name} required disabled={disabled} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" name="department" value={data?.department_name || "Default Department"} required disabled={disabled} />
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date</Form.Label>
                                <InputGroup>
                                    <Form.Control type="date" name="date" value={data?.overtime_date || ""} disabled={disabled} required />
                                    <InputGroup.Text>
                                        <FiCalendar />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3" controlId="startTime">
                                <Form.Label>Start Time</Form.Label>
                                <InputGroup>
                                    <Form.Control type="time" name="start_time" value={data?.start_time || ""} required disabled={disabled} />
                                    <InputGroup.Text className="bg-light text-muted">
                                        <FiClock />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3" controlId="endTime">
                                <Form.Label>End Time</Form.Label>
                                <InputGroup>
                                    <Form.Control type="time" name="end_time" value={data?.end_time || ""} required disabled={disabled} />
                                    <InputGroup.Text>
                                        <FiClock />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className="mb-3" controlId="totalHours">
                                <Form.Label>Total</Form.Label>
                                <Form.Control type="number" name="total_hours" value={data?.total_hours || ""} required disabled={disabled} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="payout">
                        <Form.Label>Payout</Form.Label>
                        <Form.Control type="text" name="payout" value={data?.payout || ""} required disabled={disabled} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="overtimeReason">
                        <Form.Label>Reason for Overtime</Form.Label>
                        <Form.Control as="textarea" rows={3} name="reason" value={data?.reason || ""} required disabled={disabled} />
                    </Form.Group>

                    <div class="d-grid gap-2">
                        <Button variant="warning" size="lg" disabled>
                            <h5 className="mt-1">{data?.request_status || ""}</h5>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default OvertimeApprovalDetail;