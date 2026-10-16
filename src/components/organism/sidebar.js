import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Dropdown, Navbar } from 'react-bootstrap';
import { AiFillDashboard } from 'react-icons/ai';
import { FiHome, FiClock, FiCheckSquare, FiLogOut, FiUser, FiClipboard } from 'react-icons/fi';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

function SidebarLayout() {
    // const storageData = localStorage.getItem('user_data');
    // const userData = storageData ? JSON.parse(storageData) : null;

    const [userData, setUserData] = useState([])
    const [isManager, setIsManager] = useState(false)
    const [isFinance, setIsFinance] = useState(false)
    const [isEmployee, setIsEmployee] = useState(false)
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token")
        const decodeToken = jwtDecode(token)
        setUserData(decodeToken)
        setIsManager(decodeToken.role.includes("ROLE_MANAGER"))
        setIsFinance(decodeToken.role.includes("ROLE_FINANCE"))
        setIsEmployee(decodeToken.role.includes("ROLE_EMPLOYEE"))
    }, [])


    return (
        <div className="vh-100 bg-light overflow-hidden">
            <Container fluid className="p-0 h-100">
                <Row className="g-0 h-100">
                    {/* PERMANENT STATIC LEFT SIDEBAR */}
                    <Col
                        className="bg-dark text-white p-3 d-flex flex-column border-end h-100"
                        style={{
                            width: '260px',
                            maxWidth: '360px',
                            flex: '0 0 auto'
                        }}
                    >
                        {/* Sidebar Header / Branding */}
                        <div className="d-flex align-items-center mb-4 px-2" style={{ minHeight: '40px' }}>
                            <span className="fw-bold text-primary fs-5 text-nowrap">Employee Portal</span>
                        </div>

                        {/* Section Header Label */}
                        <div className="small text-muted text-uppercase fw-bold px-2 mb-2 text-nowrap">
                            Core Operations
                        </div>

                        {/* Navigation Menu */}
                        <Nav className="flex-column flex-grow-1 gap-1">

                            {/* 1. DASHBOARD */}
                            <NavLink to="/" end className="text-decoration-none">
                                {({ isActive }) => (
                                    <Nav.Link
                                        as="div"
                                        active={isActive}
                                        className={`d-flex align-items-center rounded py-2 px-3 transition-all ${isActive
                                            ? 'bg-primary text-white fw-bold shadow-sm'
                                            : 'text-white-50 hover-link'
                                            }`}
                                    >
                                        <AiFillDashboard size={18} className="flex-shrink-0" />
                                        <span className="ms-3 text-nowrap">Dashboard</span>
                                    </Nav.Link>
                                )}
                            </NavLink>

                            {/* 2. OVERTIME REQUEST */}
                            {isEmployee && (
                                <NavLink to="/requests" className="text-decoration-none">
                                    {({ isActive }) => (
                                        <Nav.Link
                                            as="div"
                                            active={isActive}
                                            className={`d-flex align-items-center rounded py-2 px-3 transition-all ${isActive
                                                ? 'bg-primary text-white fw-bold shadow-sm'
                                                : 'text-white-50 hover-link'
                                                }`}
                                        >
                                            <FiClock size={18} className="flex-shrink-0" />
                                            <span className="ms-3 text-nowrap">Overtime Request</span>
                                        </Nav.Link>
                                    )}
                                </NavLink>
                            )}

                            {/* <NavLink to="/approvals" className="text-decoration-none">
                                {({ isActive }) => (
                                    <Nav.Link
                                        as="div"
                                        active={isActive}
                                        className={`d-flex align-items-center rounded py-2 px-3 transition-all ${isActive
                                            ? 'bg-primary text-white fw-bold shadow-sm'
                                            : 'text-white-50 hover-link'
                                            }`}
                                    >
                                        <FiCheckSquare size={18} className="flex-shrink-0" />
                                        <span className="ms-3 text-nowrap">Overtime Approvals</span>
                                    </Nav.Link>
                                )}
                            </NavLink> */}

                            {/* 3A. MANAGER APPROVAL (Lv1) */}
                            {isManager && (
                                <NavLink
                                    to="/approvals"
                                    state={{ status: "Awaiting Manager Approval (Lv1)" }}
                                    className="text-decoration-none"
                                >
                                    {/* 💡 Fix: Check if path matches AND state status matches Level 1 */}
                                    {() => {
                                        const isTabActive = location.pathname === "/approvals" &&
                                            location.state?.status === "Awaiting Manager Approval (Lv1)";

                                        return (
                                            <Nav.Link
                                                as="div"
                                                active={isTabActive}
                                                className={`d-flex align-items-center rounded py-2 px-3 transition-all ${isTabActive
                                                    ? 'bg-primary text-white fw-bold shadow-sm'
                                                    : 'text-white-50 hover-link'
                                                    }`}
                                            >
                                                <FiCheckSquare size={18} className="flex-shrink-0" />
                                                <span className="ms-3 text-nowrap">Approvals (Lv1)</span>
                                            </Nav.Link>
                                        );
                                    }}
                                </NavLink>
                            )}

                            {/* 3B. FINANCE APPROVAL (Lv2) */}
                            {isFinance && (
                                <NavLink
                                    to="/approvals"
                                    state={{ status: "Awaiting Finance Approval (Lv2)" }}
                                    className="text-decoration-none"
                                >
                                    {/* 💡 Fix: Check if path matches AND state status matches Level 2 */}
                                    {() => {
                                        const isTabActive = location.pathname === "/approvals" &&
                                            location.state?.status === "Awaiting Finance Approval (Lv2)";

                                        return (
                                            <Nav.Link
                                                as="div"
                                                active={isTabActive}
                                                className={`d-flex align-items-center rounded py-2 px-3 transition-all ${isTabActive
                                                    ? 'bg-primary text-white fw-bold shadow-sm'
                                                    : 'text-white-50 hover-link'
                                                    }`}
                                            >
                                                <FiCheckSquare size={18} className="flex-shrink-0" />
                                                <span className="ms-3 text-nowrap">Approvals (Lv2)</span>
                                            </Nav.Link>
                                        );
                                    }}
                                </NavLink>
                            )}

                            {/* 4. APPROVAL HISTORY */}
                            <NavLink to="/history" end className="text-decoration-none">
                                {({ isActive }) => (
                                    <Nav.Link
                                        as="div"
                                        active={isActive}
                                        className={`d-flex align-items-center rounded py-2 px-3 transition-all ${isActive
                                            ? 'bg-primary text-white fw-bold shadow-sm'
                                            : 'text-white-50 hover-link'
                                            }`}
                                    >
                                        <FiClipboard size={18} className="flex-shrink-0" />
                                        <span className="ms-3 text-nowrap">Approval History</span>
                                    </Nav.Link>
                                )}
                            </NavLink>
                        </Nav>


                        {/* Sidebar Footer Area (Profile Dropdown & Metadata) */}
                        <div className="border-top border-secondary pt-3 mt-auto mb-4">
                            <Dropdown drop="up">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="text-white d-flex align-items-center text-decoration-none p-0 w-100 border-0 shadow-none text-start"
                                >
                                    <div className="bg-secondary bg-opacity-50 p-2 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                                        <FiUser size={18} />
                                    </div>
                                    <div className="ms-3 text-nowrap overflow-hidden text-truncate" style={{ maxWidth: '160px' }}>
                                        <div className="fw-bold small lh-1" style={{ lineHeight: "0.75" }}>{userData.name}</div>
                                        <span className="extra-small" style={{ fontSize: '11px', color: 'white' }}>{userData.sub}</span>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="shadow w-100">
                                    <Dropdown.Item href="#profile">My Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#logout" className="text-danger" as={NavLink} to="/login" onClick={() => localStorage.removeItem("token")}>
                                        <FiLogOut className="me-2" /> Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <div className="text-center small text-muted mt-3 text-nowrap">
                                v1.0.4 Production
                            </div>
                        </div>
                    </Col>

                    <Col className="h-100 overflow-y-auto p-4 flex-grow-1">
                        <Outlet />
                    </Col>

                </Row>
            </Container>
        </div >
    );
}

export default SidebarLayout;
