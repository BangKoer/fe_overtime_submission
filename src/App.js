import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewOvertimeRequest from './components/pages/overtime_request/vw_overtime_request';
import ViewOvertimeApproval from './components/pages/overtime_approval/vw_overtime_approval';
import SidebarLayout from './components/organism/sidebar';
import Dashboard from './components/pages/dashboard/dashboard';
import Login from './components/pages/login';

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
