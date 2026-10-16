import { useEffect, useState } from 'react';
import { Container, Card, Table, Badge, Button, Row, Modal } from 'react-bootstrap';
import { FiDelete, FiEdit, FiEdit2, FiEye, FiTrash } from 'react-icons/fi';
// import OvertimeApproval from '../overtime_approval';
import OvertimeRequest from './overtime_request';
import OvertimeRequestDetail from './overtime_request_detail';
import "../../../services/overtime_request_service"
// import { dummyOvertimeRequest } from '../../../services/overtime_request_service';
import getStatusColor from '../../../helper/color_status';
// import { dummyOvertimeRequest } from '../../../services/dummy_overtime_data';
import { jwtDecode } from 'jwt-decode';
import { overtime_request_service } from '../../../services/overtime_request_service';
import { parse, format } from 'date-fns'


let ViewOvertimeRequest = () => {
    const [overtimeReq, setOvertimeReq] = useState([]);



    useEffect(() => {
        // Get token payload
        const token = localStorage.getItem("token");
        let decodeToken = {}
        if (token) {
            decodeToken = jwtDecode(token)
        }

        const getEmployeeRequest = async () => {
            try {
                let reqData = await overtime_request_service.getOvertimeRequestByEmployeeId(decodeToken.employeeId)
                setOvertimeReq(reqData.data.data)
            } catch (error) {
                console.log(error);
            }
        }

        getEmployeeRequest()
        // setOvertimeReq(dummyOvertimeRequest);
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
                                    {/* <th>Hour - Payout</th> */}
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
                                                <td><strong>#{ovr.overtime_id}</strong></td>
                                                <td>
                                                    <strong>{ovr.employee_name}</strong>
                                                    <div className="small text-muted">Emp ID: {ovr.employee_id}</div>
                                                </td>
                                                <td>{ovr.overtime_date}<br /><span className="small text-muted">{format(parse(ovr.start_time, 'HH:mm:ss', new Date()), 'hh:mm a')} - {format(parse(ovr.end_time, 'HH:mm:ss', new Date()), 'hh:mm a')}</span></td>
                                                {/* <td><strong>{ovr.total_hours} hrs</strong><div className="small text-success">Rp{ovr.overtime_pay}</div></td> */}
                                                <td>{ovr.reason}</td>
                                                <td>
                                                    <Badge bg={getStatusColor(`${ovr.request_status}`)}>
                                                        {ovr.request_status}
                                                    </Badge>
                                                </td>
                                                <td className="text-center">

                                                    <Button className="me-2 pb-2" variant="outline-primary" size="sm" onClick={() => handleOpenModal(ovr, true)}>
                                                        <FiEye size={18} className="pe-1" />
                                                        View
                                                    </Button>
                                                    {/* <Button className=" pb-2" variant="outline-warning" size="sm" onClick={ () => handleOpenModal(ovr, false) }>
                                                        <FiEdit2 size={18} className="flex-shrink-0" />
                                                    </Button> */}

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
                    <Modal.Title>Overtime Request ID #{selectedRequest && selectedRequest.overtime_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    {selectedRequest && (
                        <OvertimeRequestDetail data={selectedRequest} disabled={isReadOnly} ></OvertimeRequestDetail>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant={isReadOnly ? "danger" : "primary"} onClick={handleClose}>
                        {isReadOnly ? (<>Close</>) : (<>Submit</>)}
                    </Button>

                </Modal.Footer>
            </Modal>

            {/* Modal Request */}
            <Modal show={showRequest} onHide={handleCloseRequest} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title >Overtime Request Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OvertimeRequest onClose={handleCloseRequest}></OvertimeRequest>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewOvertimeRequest;