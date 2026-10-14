import { useEffect, useState } from 'react';
import { Container, Card, Table, Badge, Button, Row, Modal } from 'react-bootstrap';
import { FiDelete, FiEdit, FiEdit2, FiEye, FiTrash } from 'react-icons/fi';
// import OvertimeApproval from '../overtime_approval';
import OvertimeRequest from './overtime_request';
import OvertimeRequestDetail from './overtime_request_detail';
import "../../../services/overtime_request_service"
// import { dummyOvertimeRequest } from '../../../services/overtime_request_service';
import getStatusColor from '../../../helper/color_status';
import { dummyOvertimeRequest } from '../../../services/dummy_overtime_data';

let ViewOvertimeRequest = () => {
    const [overtimeReq, setOvertimeReq] = useState([]);

    useEffect(() => {
        setOvertimeReq(dummyOvertimeRequest);
    }, [])

    const [show, setShow] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [isReadOnly, setIsReadOnly] = useState(false)

    const handleClose = () => {
        setSelectedRequest(null);
        setShow(false);
    };
    const handleOpenModal = (requestData, viewOnly) => {
        setSelectedRequest(requestData)
        setIsReadOnly(viewOnly)
        setShow(true)
    }

    const [showRequest, setShowRequest] = useState(false);
    const handleCloseRequest = () => setShowRequest(false);
    const handleShowRequest = () => setShowRequest(true);

    return (
        <>
            <Container fluid className="py-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="mb-2">Overtime Requests Ledger</Card.Title>

                        <Button className='mb-2 px-2 py-0 pb-1' variant='success' onClick={handleShowRequest}>New Request</Button>

                        <Table striped bordered hover responsive className="align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Req ID</th>
                                    <th>Employee</th>
                                    <th>Date / Time</th>
                                    <th>Hour - Payout</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    overtimeReq.map(ovr => {
                                        return (
                                            <tr>
                                                <td><strong>#{ovr.req_id}</strong></td>
                                                <td>
                                                    <strong>{ovr.employee_name}</strong>
                                                    <div className="small text-muted">Emp ID: {ovr.employee_id}</div>
                                                </td>
                                                <td>{ovr.overtime_date}<br /><span className="small text-muted">{ovr.start_time} - {ovr.end_time}</span></td>
                                                <td><strong>{ovr.total_hours} hrs</strong><div className="small text-success">Rp{ovr.payout}</div></td>
                                                <td>{ovr.reason}</td>
                                                <td>
                                                    <Badge bg={getStatusColor(`${ovr.request_status}`)}>
                                                        {ovr.request_status}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">

                                                    <Button className="me-2 pb-2" variant="outline-primary" size="sm" onClick={ () => handleOpenModal(ovr, true) }>
                                                        <FiEye size={18} className="flex-shrink-0" />
                                                    </Button>
                                                    <Button className=" pb-2" variant="outline-warning" size="sm" onClick={ () => handleOpenModal(ovr, false) }>
                                                        <FiEdit2 size={18} className="flex-shrink-0" />
                                                    </Button>

                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal View and Edit */}
            <Modal show={show} onHide={handleClose} size='lg' scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Overtime Request ID #01</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    {selectedRequest && (
                        <OvertimeRequestDetail data={selectedRequest} disabled={isReadOnly} ></OvertimeRequestDetail>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Request */}
            <Modal show={showRequest} onHide={handleCloseRequest} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title >Overtime Request Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OvertimeRequest></OvertimeRequest>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewOvertimeRequest;