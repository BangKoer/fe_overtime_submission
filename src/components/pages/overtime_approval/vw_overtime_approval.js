import { useEffect, useState } from 'react';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import OvertimeRequestDetail from '../overtime_request/overtime_request_detail';
import { overtime_request_service } from '../../../services/overtime_request_service';
import { jwtDecode } from 'jwt-decode';
import { format, parse } from 'date-fns';
import currencyFormat from '../../../helper/currency_format';
import { FiCheckSquare, FiEye } from 'react-icons/fi';
import OvertimeApproval from './overtime_approval';
import { useLocation } from 'react-router-dom';

function ViewOvertimeApproval() {
    const [showReview, setShowReview] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [overtimeReq, setOvertimeReq] = useState([]);

    const location = useLocation();

    // 1. Grab status from NavLink state dynamically
    const activeStatusFilter = location.state?.status || "Awaiting Manager Approval (Lv1)";

    const handleOpenModal = (requestData) => {
        setSelectedRequest(requestData);
        setShowReview(true);
    };

    const handleCloseModal = () => {
        setShowReview(false);
    };

    const handleOpenModalApprove = (requestData) => {
        setSelectedRequest(requestData);
        setShowApprove(true);
    };

    const handleCloseModalApprove = () => {
        setShowApprove(false);
    };

    const getEmployeeRequest = async () => {
        const token = localStorage.getItem("token");
        let decodeToken = {};
        if (token) {
            decodeToken = jwtDecode(token);
        }
        try {
            let reqData = {};
            if (activeStatusFilter === "Awaiting Manager Approval (Lv1)") {
                reqData = await overtime_request_service.getOvertimeRequestBySupId(decodeToken.employeeId, activeStatusFilter)
            } else {
                reqData = await overtime_request_service.getOvertimeRequestByStatus(activeStatusFilter)
            }
            setOvertimeReq(reqData.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEmployeeRequest();
    }, [activeStatusFilter]);

    return (
        <>
            <Container fluid className="py-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="mb-0">Overtime Approvals Pipeline</Card.Title>
                        <div className="small text-muted mb-3">Viewing: {activeStatusFilter}</div>

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
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overtimeReq.length > 0 ? (
                                    overtimeReq.map((ovr) => {
                                        const isLv2 = activeStatusFilter.includes("Lv2");

                                        return (
                                            <tr key={ovr.overtime_id}>
                                                <td>
                                                    <Badge bg={isLv2 ? "secondary" : "info"} text={isLv2 ? "white" : "dark"}>
                                                        {isLv2 ? "L2" : "L1"}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <strong>{ovr.employee_name}</strong>
                                                    <div className="small text-muted">ID: {ovr.employee_id}</div>
                                                </td>
                                                <td>
                                                    {ovr.overtime_date}
                                                    <br />
                                                    <span className="small text-muted">
                                                        {format(parse(ovr.start_time, 'HH:mm:ss', new Date()), 'hh:mm a')} - {format(parse(ovr.end_time, 'HH:mm:ss', new Date()), 'hh:mm a')}
                                                    </span>
                                                </td>
                                                <td>{ovr.total_hours} Hours</td>
                                                <td>{currencyFormat(ovr.overtime_pay)}</td>
                                                <td>{ovr.reason}</td>
                                                <td>
                                                    {ovr.request_status === activeStatusFilter ? (
                                                        <Badge bg="warning">PENDING</Badge>
                                                    ) : (
                                                        <Badge bg="success">APPROVED</Badge>
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <Button onClick={() => handleOpenModal(ovr)} variant="outline-primary" size="sm" className='me-1'>
                                                        <FiEye size={18} className='pb-1' />
                                                    </Button>
                                                    <Button onClick={() => handleOpenModalApprove(ovr)} variant="outline-success" size="sm">
                                                        <FiCheckSquare size={18} className='pb-1' />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-4">No Overtime Request Data Yet For this Level Authorities</td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>

            {/* Review Modal */}
            <Modal show={showReview} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Review Overtime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRequest && (
                        <OvertimeRequestDetail data={selectedRequest} disabled={true}></OvertimeRequestDetail>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='pb-2' variant="danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Approval Modal */}
            <Modal show={showApprove} onHide={handleCloseModalApprove} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Approve Overtime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRequest && (
                        /* 💡 Fix 6: Automatically triggers a re-fetch when actions are finished */
                        <OvertimeApproval
                            data={selectedRequest}
                            onClose={() => {
                                handleCloseModalApprove();
                                getEmployeeRequest();
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ViewOvertimeApproval;
