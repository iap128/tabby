import './App.css';
import { Col, Row } from 'antd';
import Time from './cards/Time';
import Weather from './cards/Weather';

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
      <Row gutter={16}>
        <Col>
          <Weather />
        </Col>
        <Col>
          <Time />
        </Col>
      </Row>
    </div>
  );
}

export default App;
