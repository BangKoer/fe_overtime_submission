import React from 'react';
import { Container, Row, Col, Nav, Dropdown, Navbar } from 'react-bootstrap';
import { AiFillDashboard } from 'react-icons/ai';
import { FiHome, FiClock, FiCheckSquare, FiLogOut, FiUser } from 'react-icons/fi';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

function SidebarLayout() {
    // const storageData = localStorage.getItem('user_data');
    // const userData = storageData ? JSON.parse(storageData) : null;


    return (
        // Locks the root display viewport to the screen boundaries
        <div className="vh-100 bg-light overflow-hidden">
            <Container fluid className="p-0 h-100">
                {/* <Row>
                    <Navbar className="bg-dark d-flex flex-column py-2">
                        <Container>
                            <Navbar.Brand href="#home" className="fw-bold text-primary fs-5 text-nowrap">Admin Portal</Navbar.Brand>
                            <Navbar.Toggle />
                        </Container>
                    </Navbar>
                </Row> */}
                <Row className="g-0 h-100">
                    {/* PERMANENT STATIC LEFT SIDEBAR */}
                    <Col
                        className="bg-dark text-white p-3 d-flex flex-column border-end h-100"
                        style={{
                            width: '260px',
                            maxWidth: '260px',
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

                            {/* 3. OVERTIME APPROVALS */}
                            <NavLink to="/approvals" className="text-decoration-none">
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
                                        <div className="fw-bold small lh-1" style={{ lineHeight: "0.75" }}>Leon S.Kennedy</div>
                                        <span className="extra-small" style={{ fontSize: '11px', color: 'white' }}>Employee Portal</span>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark" className="shadow w-100">
                                    <Dropdown.Item href="#profile">My Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#logout" className="text-danger" as={NavLink} to="/login">
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
