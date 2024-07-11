import './App.css';
import Time from './cards/Time';
import Weather from './cards/Weather';
import QuickLinks from './cards/QuickLinks';
import CalendarCard from './cards/CalendarCard';
import { Button, FloatButton } from 'antd';
import { useRef, useState } from 'react';
import Settings from './personalization/Settings';
import { SettingOutlined } from '@ant-design/icons';
import { setCookie } from 'typescript-cookie';
import AppTour from './AppTour';

function App() {
  const [open, setOpen] = useState(false);

  const weatherRef = useRef(null);
  const quickLinksRef = useRef(null);
  const settingsRef = useRef(null);

  const endTour = () => {
    setOpen(true);
    setCookie('firstVisit', 'false', { expires: 365 });
  };

  return (
    <div
      style={{
        padding: '100px 5% 0px 5%',
        backgroundImage: 'url(./background.jpg)',
        backgroundRepeat: 'no-repeat',
        height: '240px',
      }}
    >
      <FloatButton ref={settingsRef} style={{ top: 5, right: 5 }} icon={<SettingOutlined />} type='primary' onClick={() => setOpen(true)} />
      <Settings open={open} setOpen={setOpen}/>
      <div style={{ display: 'flex', gap: '20px' }}>

        <div ref={weatherRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Weather />
        </div>

        <div ref={quickLinksRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '33%' }}>
          <QuickLinks />
          <Time />
          <CalendarCard />
        </div>
      </div>

      <AppTour closeAction={endTour} weatherRef={weatherRef} quickLinksRef={quickLinksRef} settingsRef={settingsRef} />

      <div style={{ position: 'absolute', bottom: 0, left: '45%', marginBottom: '10px'}}>
      Made with ❤️ by{' '}
        <Button type="dashed" href="https://n818pe.com">
          Ryan Hunter
        </Button>
        </div>
    </div>
  );
}

export default App;
