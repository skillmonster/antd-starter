import { Card } from 'antd';
import * as React from 'react';

interface Props {
  title?: React.ReactNode;
  style?: React.CSSProperties;
  headStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  extra?: React.ReactNode;
  cardType?: 'default' | 'add';
}
export const LaoITDevCardAdd: React.FC<Props> = ({
  title,
  style,
  headStyle,
  bodyStyle,
  children,
  extra,
  cardType = 'default',
}) => {
  return (
    <Card
      className={`laoit-dev-card${
        cardType === 'add' ? ' laoit-dev-card-add' : ''
      }`}
      title={title}
      style={style}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      extra={extra}
    >
      {children}
    </Card>
  );
};
