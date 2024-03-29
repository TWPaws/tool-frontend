import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import { RewardList } from './models/reward-list.js';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [broadcasterInfo, setBroadcasterInfo] = useState(0);

  const getBroadcasterInfoFromChild = (broadcasterInfo) => {
    setBroadcasterInfo(broadcasterInfo)
  };

  const access_token = sessionStorage.getItem('access_token');
  const [searchParam] = useSearchParams();
  if (searchParam.get('access_token')) {
    sessionStorage.setItem('access_token', searchParam.get('access_token'));
  }

  return (
    <>
    <Navbar expand='lg' fixed="top" className='bg-body-tertiary'>
      <Container fluid={true}>
        <Navbar.Brand>TWPaws</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          {access_token ? 
            <Navbar.Text>Signed in as: <a href="#home">{broadcasterInfo.display_name}</a></Navbar.Text> 
            : <Navbar.Text>
                <a href="https://id.twitch.tv/oauth2/authorize?client_id=fhc0ko2asch2gf7ya4ame220yahpka&redirect_uri=https://www.twpaws.live&scope=analytics%3Aread%3Aextensions+analytics%3Aread%3Agames+bits%3Aread+channel%3Aedit%3Acommercial+channel%3Amanage%3Aads+channel%3Amanage%3Abroadcast+channel%3Amanage%3Aextensions+channel%3Amanage%3Aguest_star+channel%3Amanage%3Amoderators+channel%3Amanage%3Apolls+channel%3Amanage%3Apredictions+channel%3Amanage%3Araids+channel%3Amanage%3Aredemptions+channel%3Amanage%3Aschedule+channel%3Amanage%3Avideos+channel%3Amanage%3Avips+channel%3Aread%3Aads+channel%3Aread%3Acharity+channel%3Aread%3Aeditors+channel%3Aread%3Agoals+channel%3Aread%3Aguest_star+channel%3Aread%3Ahype_train+channel%3Aread%3Apolls+channel%3Aread%3Apredictions+channel%3Aread%3Aredemptions+channel%3Aread%3Astream_key+channel%3Aread%3Asubscriptions+channel%3Aread%3Avips+clips%3Aedit+moderation%3Aread+moderator%3Amanage%3Aannouncements+moderator%3Amanage%3Aautomod+moderator%3Amanage%3Aautomod_settings+moderator%3Amanage%3Abanned_users+moderator%3Amanage%3Ablocked_terms+moderator%3Amanage%3Achat_messages+moderator%3Amanage%3Achat_settings+moderator%3Amanage%3Aguest_star+moderator%3Amanage%3Ashield_mode+moderator%3Amanage%3Ashoutouts+moderator%3Aread%3Aautomod_settings+moderator%3Aread%3Ablocked_terms+moderator%3Aread%3Achat_settings+moderator%3Aread%3Achatters+moderator%3Aread%3Afollowers+moderator%3Aread%3Aguest_star+moderator%3Aread%3Ashield_mode+moderator%3Aread%3Ashoutouts+user%3Aedit+user%3Aedit%3Abroadcast+user%3Aedit%3Afollows+user%3Amanage%3Ablocked_users+user%3Amanage%3Achat_color+user%3Amanage%3Awhispers+user%3Aread%3Ablocked_users+user%3Aread%3Abroadcast+user%3Aread%3Aemail+user%3Aread%3Afollows+user%3Aread%3Asubscriptions+channel%3Abot+channel%3Amoderate+chat%3Aedit+chat%3Aread+user%3Abot+user%3Aread%3Achat+whispers%3Aedit+whispers%3Aread&response_type=token">
                  Login with Twitch
                </a>
              </Navbar.Text>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="mainContainer">
      {access_token ? <RewardList passBroadcasterInfo={getBroadcasterInfoFromChild} /> : <p>Please Login first</p>}
    </div>
    </>
  );
}
