import { Badge, Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../../../features/counter";
import { useEffect, useState } from "react";
import { overtime_request_service } from "../../../services/overtime_request_service";

let Dashboard = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await overtime_request_service.getOvertimeRequest();
                setData(response.data.data || response);
            } catch (error) {
                console.error("Failed to fetch overtime requests:", error);
                setData([]);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            {/* {data && data.map((datum) => {
                return (
                    <>
                        <p>{datum.employee_name}</p>
                        <p>{datum.department_name}</p>
                        <br />
                    </>
                )
            })} */}
            {/* KPI's */}
            <Row>
                <h1>KPI's</h1>
            </Row>
            <Row>
                <Col md={3} className="mb-4">
                    <Card border="success" className="border-1 shadow-sm bg-body-tertiary">
                        <Card.Body className="p-4">
                            {/* Top row: Label on left, Badge on right */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted fw-medium text-uppercase small">Total Overtime Payout</span>
                            </div>

                            {/* Main Metric Value */}
                            <h2 className="fw-bold mb-1">$48,259.00</h2>

                            {/* Footer/Context info */}
                            <small className="text-muted">vs. $42,890.00 last month</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-4">
                    <Card border="success" className="border-1 shadow-sm bg-body-tertiary">
                        <Card.Body className="p-4">
                            {/* Top row: Label on left, Badge on right */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted fw-medium text-uppercase small">Total Overtime Payout</span>
                            </div>

                            {/* Main Metric Value */}
                            <h2 className="fw-bold mb-1">$48,259.00</h2>

                            {/* Footer/Context info */}
                            <small className="text-muted">vs. $42,890.00 last month</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-4">
                    <Card border="success" className="border-1 shadow-sm bg-body-tertiary">
                        <Card.Body className="p-4">
                            {/* Top row: Label on left, Badge on right */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted fw-medium text-uppercase small">Total Overtime Payout</span>
                            </div>

                            {/* Main Metric Value */}
                            <h2 className="fw-bold mb-1">$48,259.00</h2>

                            {/* Footer/Context info */}
                            <small className="text-muted">vs. $42,890.00 last month</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-4">
                    <Card border="success" className="border-1 shadow-sm bg-body-tertiary">
                        <Card.Body className="p-4">
                            {/* Top row: Label on left, Badge on right */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted fw-medium text-uppercase small">Total Overtime Payout</span>
                            </div>

                            {/* Main Metric Value */}
                            <h2 className="fw-bold mb-1">$48,259.00</h2>

                            {/* Footer/Context info */}
                            <small className="text-muted">vs. $42,890.00 last month</small>
                        </Card.Body>
                    </Card>
                </Col>

                {/* <Col md={4}>
                    <Card bg="secondary" text="light">
                        <Card.Body>
                            <Card.Title><h3>This is Redux Trial</h3></Card.Title>
                            <Card.Text>
                                <h5>{count}</h5>
                                <input className="w-100" name="inputByAmount" onChange={(e)=>setAmount(e.target.value)}></input>
                            </Card.Text>
                            <Card.Footer>
                                <Row className="justify-content-center gap-2">
                                    <ButtonGroup size="sm">
                                        <Button onClick={() => dispatch(decrement())}>-</Button>
                                        <Button onClick={() => dispatch(increment())}>+</Button>
                                        <Button onClick={() => dispatch(incrementByAmount(Number (amount)))}>Add Amount</Button>
                                    </ButtonGroup>
                                </Row>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>

            <hr className="border border-success border-1 opacity-75 my-2" />

            {/* Charts */}
            <Row>
                <h1>Charts</h1>
            </Row>
            <Row>
                <Col md={8}>
                    <Card style={{ width: '100%' }} border="success" className="border-1 shadow-sm bg-body-tertiary">
                        <Card.Body className="p-4">
                            {/* Top row: Label on left, Badge on right */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted fw-medium text-uppercase small">Total Overtime Payout</span>
                            </div>

                            {/* Main Metric Value */}
                            <h2 className="fw-bold mb-1">$48,259.00</h2>

                            {/* Footer/Context info */}
                            <small className="text-muted">vs. $42,890.00 last month</small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card style={{ width: '100%' }} border="success" className="border-1 shadow-sm bg-body-tertiary">
                        <Card.Body className="p-4">
                            {/* Top row: Label on left, Badge on right */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted fw-medium text-uppercase small">Total Overtime Payout</span>
                            </div>

                            {/* Main Metric Value */}
                            <h2 className="fw-bold mb-1">$48,259.00</h2>

                            {/* Footer/Context info */}
                            <small className="text-muted">vs. $42,890.00 last month</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;