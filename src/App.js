import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import { RewardList } from './models/reward-list.js';
import { useEffect, useState } from 'react';
import { LoginModal } from './models/login.js';

export default function App() {
  const URL_PREFIX = process.env.REACT_APP_URL_PREFIX;
  const [broadcasterInfo, setBroadcasterInfo] = useState(0);
  const [nickname, setNickname] = useState(0);
  const [connectedToTwitch, setConnectedToTwitch] = useState(0);

  const getBroadcasterInfoFromChild = (broadcasterInfo) => {
    setBroadcasterInfo(broadcasterInfo);
  };

  const getLoginInfoFromChild = (loginInfo) => {
    setNickname(loginInfo.nickname);
    setConnectedToTwitch(loginInfo.connectedToTwitch);
  };

  const handleLogout = () => {
    fetch(URL_PREFIX.concat('/user/logout'), {method: 'GET'})
    .then((res) => res.json())
    .then(data => {
      setNickname(null);
      setConnectedToTwitch(false);
    });
  }

  useEffect(() => {
    fetch(URL_PREFIX.concat('/user/status'), {method: "GET"})
    .then(async (res) => {
      var data = await res.json();
      if (res.status === 200) {
        setNickname(data.nickname);
        setConnectedToTwitch(true);
      }
      else if (res.status === 404) {
        setNickname(data.nickname);
        setConnectedToTwitch(false);
      }
      else {
        setNickname(null);
        setConnectedToTwitch(false);
      }
    })
  });

  return (
    <>
    <Navbar expand='lg' fixed="top" className='bg-body-tertiary'> 
      <Container fluid={true}>
        <Navbar.Brand>TWPaws</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {nickname ? 
            <Navbar.Text>Signed in as: <a href="#" onClick={handleLogout}>{nickname}</a></Navbar.Text>
          : <LoginModal passLoginInfo={getLoginInfoFromChild} />}
          {connectedToTwitch ? 
              <Navbar.Text>✅</Navbar.Text>
            : <Navbar.Text>
                <a href="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=ecmnwqtzoa9c67bhtjunt7ne2vrog0&redirect_uri=https://www.twpaws.live/api/user/twitch_callback&scope=bits%3Aread+channel%3Amanage%3Amoderators+channel%3Amanage%3Aredemptions+channel%3Amanage%3Avips+channel%3Aread%3Aeditors+channel%3Aread%3Aredemptions+channel%3Aread%3Asubscriptions+channel%3Aread%3Avips+moderation%3Aread+moderator%3Amanage%3Aannouncements+moderator%3Amanage%3Aautomod+moderator%3Amanage%3Aautomod_settings+moderator%3Amanage%3Abanned_users+moderator%3Amanage%3Achat_messages+moderator%3Amanage%3Achat_settings+moderator%3Amanage%3Aguest_star+moderator%3Aread%3Aautomod_settings+moderator%3Aread%3Achat_settings+moderator%3Aread%3Achatters+moderator%3Aread%3Afollowers+moderator%3Aread%3Aguest_star+moderator%3Aread%3Ashield_mode+moderator%3Aread%3Ashoutouts+user%3Aedit+user%3Aedit%3Abroadcast+user%3Aedit%3Afollows+user%3Amanage%3Ablocked_users+user%3Amanage%3Achat_color+user%3Amanage%3Awhispers+user%3Aread%3Ablocked_users+user%3Aread%3Abroadcast+user%3Aread%3Aemail+user%3Aread%3Afollows+user%3Aread%3Asubscriptions+channel%3Abot+channel%3Amoderate+chat%3Aedit+chat%3Aread+user%3Abot+user%3Aread%3Achat">
                  ❌ Connect with Twitch
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
