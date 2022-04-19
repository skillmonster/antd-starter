import React, { FC } from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom'
interface Props { }
export const NotFound: FC<Props> = (props): JSX.Element => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={"/"}><Button type="primary">Back Home</Button></Link>}
    />
  )
}