import { Col, Divider, Grid, Row, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const { Text } = Typography;
export const ContactBar: React.FC = (): JSX.Element => {
  return (
    <>
      <div
        className="contact-bar"
        style={{ height: '30px', position: 'relative' }}
      >
        <Row style={{width: '100%',display: 'flex', flexWrap: 'inherit', alignItems: 'center', justifyContent: 'space-between', paddingRight: '5px'}}>
          <Col style={{flexBasis: 'auto', flexGrow: '1'}}>
            <Text strong>Contact Center: 021-411888</Text>
          </Col>
          <Col style={{display: 'flex', height: '100%', backgroundColor: '#B6732D', alignItems: 'center', padding: '0 5px', justifyContent: 'space-between', flexWrap: 'inherit'}}>
            <Link to={'hello'} style={{color: '#000'}}>LA</Link>
            <Divider type="vertical" />
            <Link to={'hello'} style={{color: '#000'}}>EN</Link>
          </Col>
        </Row>
      </div>
    </>
  );
};
