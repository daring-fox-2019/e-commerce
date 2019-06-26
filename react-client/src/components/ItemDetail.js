import React from 'react'
import { Row, Col, Typography } from 'antd'

const { Title, Text } = Typography

function ItemDetail (props) {
  return (
    <Row
      gutter={32}
      style={{ padding: '16px' }}
    >
      <Col span={12}>
        <img
          alt={props.item.name}
          src={props.item.imageUrl.replace('https', 'http')}
          style={{ width: '100%', boxShadow: '0 0 16px 2px #a9a9a9' }}
        />
      </Col>
      <Col span={12}>
        <Title>{props.item.name}</Title>
        <Title
          type="danger"
          level={3}
        >
          Rp. {props.item.price}
        </Title>
        <p><Text>Seller: <Text strong>{props.item.seller.email}</Text></Text></p>
        <p><Text>In stock: <Text strong>{props.item.stock}</Text></Text></p>
        {props.children}
      </Col>
    </Row>
  )
}

export default ItemDetail
