import './App.css';
import Weather from './cards/Weather';
import { Button, FloatButton, Layout } from 'antd';
import { useRef, useState } from 'react';
import Settings from './personalization/Settings';
import { SettingOutlined } from '@ant-design/icons';
import AppTour from './AppTour';
import Column2 from './components/Column2';

function App() {
  const [open, setOpen] = useState(false);
  const [sorting, setSorting] = useState(false);

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
      <Settings open={open} setOpen={setOpen} setSorting={setSorting} />

      <div style={{ display: 'flex', gap: '20px', height: '85vh' }}>
        <div ref={weatherRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Weather />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '33%' }}>
          <Column2 sorting={sorting} />
        </div>
      </div>
      
      <AppTour
        closeAction={endTour}
        weatherRef={weatherRef}
        quickLinksRef={quickLinksRef}
        settingsRef={settingsRef}
      />

      {sorting && <Button danger block type='primary'>Save</Button>}

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
