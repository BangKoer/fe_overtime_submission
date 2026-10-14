import { useState } from 'react';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
// import { dummyOvertimeRequest } from '../../../services/overtime_request_service';
import OvertimeRequestDetail from '../overtime_request/overtime_request_detail';
import { dummyOvertimeRequest } from '../../../services/dummy_overtime_data';

function ViewOvertimeApproval() {
    const [showReview, setShowReview] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null)

    const handleOpenModal = (requestData) => {
        setSelectedRequest(requestData);
        setShowReview(true);
    }

    const handleCloseModal = () => {
        setShowReview(false);
    }

    return (
        <>
            <Container fluid className="py-4" >
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="mb-2">Overtime Approvals Pipeline</Card.Title>
                        <Table striped bordered hover responsive className="align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Level</th>
                                    <th>Requester</th>
                                    <th>Date / Time</th>
                                    <th>Total Hours</th>
                                    <th>Payout</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Approver</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <Badge bg="info" text="dark">L1</Badge>
                                    </td>
                                    <td>
                                        <strong>Charlie Brown</strong>
                                        <div className="small text-muted">ID: 102</div>
                                    </td>
                                    <td>2026-10-05<br /><span className="small text-muted">{"17:00:00 "} - {"20:00:00"}</span></td>
                                    <td>2.0 hrs</td>
                                    <td>$60.00</td>
                                    <td>End of month financial audit reporting</td>
                                    <td>
                                        <Badge bg="warning">PENDING</Badge>
                                    </td>
                                    <td>
                                        <span className="text-muted italic">Unassigned</span>
                                    </td>
                                    <td className="text-center">
                                        <Button onClick={ () => handleOpenModal(dummyOvertimeRequest[1])} variant="outline-primary" size="sm">Review</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal Request */}
            <Modal show={showReview} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title >Review Overtime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRequest && (
                        <OvertimeRequestDetail data={selectedRequest} disabled={false}></OvertimeRequestDetail>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='pb-2' variant="danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button className='pb-2' variant="success">
                        Approve
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewOvertimeApproval;