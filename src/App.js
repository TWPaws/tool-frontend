import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import { RewardList } from './models/reward-list.js';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginModal } from './models/login.js';
import Cookies from 'js-cookie';

export default function App() {
  const [broadcasterInfo, setBroadcasterInfo] = useState(0);
  const [loginInfo, setLoginInfo] = useState(0);

  const getBroadcasterInfoFromChild = (broadcasterInfo) => {
    setBroadcasterInfo(broadcasterInfo);
  };

  const getLoginInfoFromChild = (loginInfo) => {
    setLoginInfo(loginInfo);
  };

  return (
    <>
    <Navbar expand='lg' fixed="top" className='bg-body-tertiary'>
      <Container fluid={true}>
        <Navbar.Brand>TWPaws</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {loginInfo ? 
            <Navbar.Text>Signed in as: <a href="#home">{loginInfo.nickname}</a></Navbar.Text>
          : <LoginModal passLoginInfo={getLoginInfoFromChild} />}
          {loginInfo ? 
              <Navbar.Text>以連接Twitch帳號</Navbar.Text>
            : <Navbar.Text>
                <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=ecmnwqtzoa9c67bhtjunt7ne2vrog0&redirect_uri=https://www.twpaws.live/api/user/twitch_callback&scope=bits%3Aread+channel%3Amanage%3Amoderators+channel%3Amanage%3Aredemptions+channel%3Amanage%3Avips+channel%3Aread%3Aeditors+channel%3Aread%3Aredemptions+channel%3Aread%3Asubscriptions+channel%3Aread%3Avips+moderation%3Aread+moderator%3Amanage%3Aannouncements+moderator%3Amanage%3Aautomod+moderator%3Amanage%3Aautomod_settings+moderator%3Amanage%3Abanned_users+moderator%3Amanage%3Achat_messages+moderator%3Amanage%3Achat_settings+moderator%3Amanage%3Aguest_star+moderator%3Aread%3Aautomod_settings+moderator%3Aread%3Achat_settings+moderator%3Aread%3Achatters+moderator%3Aread%3Afollowers+moderator%3Aread%3Aguest_star+moderator%3Aread%3Ashield_mode+moderator%3Aread%3Ashoutouts+user%3Aedit+user%3Aedit%3Abroadcast+user%3Aedit%3Afollows+user%3Amanage%3Ablocked_users+user%3Amanage%3Achat_color+user%3Amanage%3Awhispers+user%3Aread%3Ablocked_users+user%3Aread%3Abroadcast+user%3Aread%3Aemail+user%3Aread%3Afollows+user%3Aread%3Asubscriptions+channel%3Abot+channel%3Amoderate+chat%3Aedit+chat%3Aread+user%3Abot+user%3Aread%3Achat">
                  Connect with Twitch
                </a>
              </Navbar.Text>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="mainContainer">
      <RewardList passBroadcasterInfo={getBroadcasterInfoFromChild} />
    </div>
    </>
  );
}
