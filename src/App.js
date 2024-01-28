import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import { RewardList } from './models/reward-list.js';
import { useState } from 'react';

export default function App() {
  const [broadcasterInfo, setBroadcasterInfo] = useState(0);

  const getBroadcasterInfoFromChild = (broadcasterInfo) => {
    setBroadcasterInfo(broadcasterInfo)
  };

  return (
    <>
    <Navbar expand='lg' fixed="top" className='bg-body-tertiary'>
      <Container fluid={true}>
        <Navbar.Brand>TWPaws</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>Signed in as: <a href="#home">{broadcasterInfo.display_name}</a></Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="mainContainer">
      <RewardList passBroadcasterInfo={getBroadcasterInfoFromChild} />
    </div>
    </>
  );
}
