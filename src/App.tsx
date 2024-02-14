import './App.css';
import Time from './cards/Time';
import Weather from './cards/Weather';
import QuickLinks from './cards/QuickLinks';

function App() {
  return (
    <div
      style={{
        padding: '100px 5% 0px 5%',
        backgroundImage: 'url(./background.jpg)',
        backgroundRepeat: 'no-repeat',
        height: '240px',
      }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Weather />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <QuickLinks />
          <Time />
        </div>
      </div>
    </div>
  );
}

export default App;
