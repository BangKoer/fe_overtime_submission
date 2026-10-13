import logo from './logo.svg';
import './App.css';
import Login from './components/pages/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import OvertimeRequest from './components/pages/overtime_request';
import OvertimeApproval from './components/pages/overtime_approval';
import ViewOvertimeApproval from './components/pages/vw_overtime_approval';
import ViewOvertimeRequest from './components/pages/vw_overtime_request';
import SidebarLayout from './components/organism/sidebar';
import OvertimeRequestDetail from './components/pages/overtime_request_detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<SidebarLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='requests' element={<ViewOvertimeRequest />} />
              <Route path='approvals' element={<ViewOvertimeApproval />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
