import './App.css';
import Time from './cards/Time';
import Weather from './cards/Weather';
import QuickLinks from './cards/QuickLinks';
import CalendarCard from './cards/CalendarCard';
import { Button, FloatButton, Layout } from 'antd';
import { useRef, useState } from 'react';
import Settings from './personalization/Settings';
import { SettingOutlined } from '@ant-design/icons';
import AppTour from './AppTour';

function App() {
  const [open, setOpen] = useState(false);

  const weatherRef = useRef(null);
  const quickLinksRef = useRef(null);
  const settingsRef = useRef(null);

  const endTour = () => {
    setOpen(true);
    window.localStorage.setItem('firstVisit', 'false');
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
      <FloatButton
        ref={settingsRef}
        style={{ top: 5, right: 5 }}
        icon={<SettingOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      />
      <Settings open={open} setOpen={setOpen} />
      <div style={{ display: 'flex', gap: '20px', height: '85vh' }}>
        <div ref={weatherRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Weather />
        </div>

        <div
          ref={quickLinksRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '33%' }}
        >
          <QuickLinks />
          <Time />
          <CalendarCard />
        </div>
      </div>

      <AppTour
        closeAction={endTour}
        weatherRef={weatherRef}
        quickLinksRef={quickLinksRef}
        settingsRef={settingsRef}
      />

      <Layout.Footer style={{ textAlign: 'center' }}>
        Made with ❤️ by{' '}
        <Button type="dashed" href="https://n818pe.com">
          Ryan Hunter
        </Button>
      </Layout.Footer>
    </div>
  );
}

export default App;
