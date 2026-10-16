import { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Nav, Table } from "react-bootstrap";
import { FiEye } from "react-icons/fi";
import currencyFormat from "../../../helper/currency_format";
import { overtime_approve_service } from "../../../services/overtime_approve_service";
import { jwtDecode } from "jwt-decode";
import { format, parseISO } from "date-fns";

function ViewHistoryApproval() {
    const initialRole = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodeToken = jwtDecode(token);
                const roles = decodeToken.role || [];

                if (!roles.includes("ROLE_MANAGER") && roles.includes("ROLE_FINANCE")) {
                    return "2";
                }
            } catch (error) {
                console.error("Error decoding initial token role:", error);
            }
        }
        return "1";
    }

    const [activeTab, setActiveTab] = useState(() => {
        return initialRole()
    })

    const [showDetailModal, setShowDetailModal] = useState(false)
    const [historyApproval, setHistoryApproval] = useState([])
    const [isManager, setIsManager] = useState(false)
    const [isFinance, setIsFinance] = useState(false)

    const getRoleUser = () => {
        const token = localStorage.getItem("token");
        let decodeToken = {};
        if (token) {
            decodeToken = jwtDecode(token);
        }

        setIsManager(decodeToken.role.includes("ROLE_MANAGER"))
        setIsFinance(decodeToken.role.includes("ROLE_FINANCE"))
    }

    const getHistoryApproval = async () => {
        const token = localStorage.getItem("token");
        let decodeToken = {};
        if (token) {
            decodeToken = jwtDecode(token);
        }

        try {
            const res = await overtime_approve_service.getApprovalHistory(decodeToken.employeeId)
            setHistoryApproval(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHistoryApproval()
        getRoleUser()
    }, [])

    const filteredRecords = historyApproval.filter(item => item.approvalLevel && item.approvalLevel.startsWith(activeTab));

    return (
        <>
            <Container fluid className="py-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="mb-0 fs-4 fw-bold">Approval History</Card.Title>
                        <div className="small text-muted mb-4">Review historical actions and sealed overtime request archives.</div>
                        <Nav variant="tabs" className="mb-3" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                            {isManager && (
                                <Nav.Item>
                                    <Nav.Link eventKey="1">Manager History (Lv1)</Nav.Link>
                                </Nav.Item>
                            )}
                            {isFinance && (
                                <Nav.Item>
                                    <Nav.Link eventKey="2">Finance History (Lv2)</Nav.Link>
                                </Nav.Item>
                            )}
                        </Nav>

                        <Table striped bordered hover responsive className="align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Req ID</th>
                                    <th>Requester</th>
                                    <th>Overtime Date</th>
                                    <th>Reason</th>
                                    <th>Reviewed On</th>
                                    <th>Outcome</th>
                                    <th className="text-center">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.length > 0 ? (
                                    filteredRecords.map((rec) => (
                                        <tr key={rec.overtime_id}>
                                            <td><strong>#{rec.overtimeId}</strong></td>
                                            <td>
                                                <strong>{rec.requesterName}</strong>
                                                <div className="small text-muted">ID: {rec.requesterId}</div>
                                            </td>
                                            <td>{rec.overtimeDate}</td>
                                            {/* <td>
                                            <strong>{rec.total_hours} hrs</strong>
                                            <div className="small text-success">{currencyFormat(rec.overtime_pay)}</div>
                                        </td> */}
                                            <td>{rec.reason}</td>
                                            <td className="small text-muted">{format(parseISO(rec.reviewAt), "MMMM dd, yyyy 'at' h:mm a")}</td>
                                            <td>
                                                {rec.status === "Approved" ? (
                                                    <Badge bg="success" className="px-2 py-1">APPROVED</Badge>
                                                ) : (
                                                    <Badge bg="danger" className="px-2 py-1">REJECTED</Badge>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                {/* Static placeholder action buttons */}
                                                <Button variant="outline-primary" size="sm" onClick={() => alert(`Viewing static request details for #${rec.overtime_id}`)}>
                                                    <FiEye size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-4">No historical logs match your filters.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

            </Container>
        </>
    )
}

export default ViewHistoryApproval;