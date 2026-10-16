import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { employee_service } from "../../../services/employee_service";
import { overtime_request_service } from "../../../services/overtime_request_service";

function OvertimeRequest({ onClose }) {
    const [userData, setUserData] = useState([])
    const [employees, setEmployees] = useState([])

    const [submitterId, setSubmitterId] = useState(0)
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [reason, setReason] = useState('')

    

    const getDataFromToken = () => {
        const token = localStorage.getItem("token");
        let decodeToken = {}
        if (token) {
            decodeToken = jwtDecode(token)
            setUserData(decodeToken)
        }
        return decodeToken
    }

    const getEmployeeByDepartment = async (token) => {
        try {
            let res = await employee_service.getEmployeeByDepartment(token.departmentId)
            setEmployees(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewRequest = async (e) => {
        e.preventDefault();
        try {
            const newRequest = {
                employee_id: userData.employeeId,
                submitted_by_id: submitterId,
                date: date,
                start_time: startTime,
                end_time: endTime,
                reason: reason
            }

            const res = await overtime_request_service.addOvertimeRequest(newRequest)
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
        setSubmitterId(0)
        setDate('')
        setStartTime('')
        setEndTime('')
        setReason('')

        onClose()
    }

    useEffect(() => {
        getEmployeeByDepartment(getDataFromToken())
    }, [])



    return (
        <>
            <Card className="w-100 border-0">
                <Card.Body>
                    {/* <Card.Title className="text-center mb-4">Overtime Request Form</Card.Title> */}

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="employeeId">
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control type="number" name="employee_id" value={userData.employeeId} disabled required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="submittedById">
                                <Form.Label>Submitter Name</Form.Label>
                                <Form.Select onChange={(e) => setSubmitterId(e.target.value)}>
                                    {
                                        employees.map((emp) => {
                                            return (
                                                <option value={emp.id} >{emp.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="overtimeDate">
                        <Form.Label>Overtime Date</Form.Label>
                        <Form.Control type="date" name="date" onChange={(e) => setDate(e.target.value)} required />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="startTime">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" name="start_time" onChange={(e) => setStartTime(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="endTime">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="time" name="end_time" onChange={(e) => setEndTime(e.target.value)}  required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-4" controlId="overtimeReason">
                        <Form.Label>Reason for Overtime</Form.Label>
                        <Form.Control as="textarea" rows={4} name="reason" onChange={(e) => setReason(e.target.value)} required />
                    </Form.Group>

                    <div className="d-flex gap-2 justify-content-end">
                        <Button variant="danger" type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit" onClick={handleNewRequest}>
                            Submit Request
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default OvertimeRequest;