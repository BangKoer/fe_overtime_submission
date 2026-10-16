import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { overtime_approve_service } from "../../../services/overtime_approve_service";

function OvertimeApproval({ data, onClose }) {

    const [userData, setUserData] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')

    const handleNewApprove = async () => {

        try {
            const payload = {
                overtime_id: data.overtime_id,
                approver_id: userData.employeeId,
                status: status,
                notes: notes
            }

            const res = overtime_approve_service.addNewApproval(payload)
            alert("Request added successfully!");

            if (onClose) {
                onClose()
            }

        } catch (error) {
            console.error("Failed: "+error);
            alert("Failed: "+error.data)
        }
    }

    const handleClose = () => {
        setStatus('')
        setNotes('')
        onClose()
    }

    const tokenDecode = () => {
        const token = localStorage.getItem("token")
        const decode = jwtDecode(token)
        return decode;
    }

    useEffect(() => {
        setUserData(tokenDecode())
    }, [])

    return (
        <>

            <Card className="w-100 border-0">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="employeeId">
                                <Form.Label>Overtime ID</Form.Label>
                                <Form.Control type="number" name="employee_id" value={data.overtime_id} required disabled />
                            </Form.Group>

                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="submittedById">
                                <Form.Label>Approver ID</Form.Label>
                                <Form.Control type="number" name="submitted_by_id" value={userData.employeeId} required disabled />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select className="mb-3" controlId="status" onChange={(e) => setStatus(e.target.value)}>
                                <option>-</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-4" controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} name="notes" onChange={(e) => setNotes(e.target.value)} required />
                    </Form.Group>

                    <div className="d-flex gap-2 justify-content-end">
                        <Button variant="danger" type="button">
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" onClick={handleNewApprove}>
                            Submit Approval
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default OvertimeApproval;