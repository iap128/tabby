import './App.css';
import Time from './cards/Time';
import Weather from './cards/Weather';
import QuickLinks from './cards/QuickLinks';
import CalendarCard from './cards/CalendarCard';
import { FloatButton } from 'antd';
import { useState } from 'react';
import Settings from './personalization/Settings';
import { SettingOutlined } from '@ant-design/icons';
import { Config } from './Config';
import LoadingSkeleton from './components/LoadingSkeleton';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        padding: '100px 5% 0px 5%',
        backgroundImage: 'url(./background.jpg)',
        backgroundRepeat: 'no-repeat',
        height: '240px',
      }}
    >
      <FloatButton style={{ top: 5, right: 5 }} icon={<SettingOutlined />} type='primary' onClick={() => setOpen(true)} />
      <Settings open={open} setOpen={setOpen}/>
      <div style={{ display: 'flex', gap: '20px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Config.apiKey ? <Weather /> : <LoadingSkeleton />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '33%' }}>
          <QuickLinks />
          <Time />
          <CalendarCard />
        </div>
      </div>
    </div>
  );
}

export default App;
