import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Typography,Row, Col, Descriptions, Button } from 'antd'
import { Flex, Box } from '@rebass/grid'

import { fetchCart } from '../redux/modules/cart'
import './CartContainer.css'

const { Title, Text } = Typography

function CartContainer (props) {
  const token = useSelector(state => state.auth.token)
  let cart = useSelector(state => state.cart)
  let total = cart.reduce((acc, curr) => acc += curr.price, 0)
  let ids = Array.from(new Set(cart.map(c => c._id)))
  cart = cart.map(c => {
    c.amount = cart.filter(it => it._id === c._id).length
    return c
  })
  cart = ids.map(id => cart.find(c => c._id === id))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart(token))
  }, [dispatch, token])

  return (
    <List
      header={(
        <Flex
          justifyContent="space-between"
        >
          <Box></Box>
          <Box style={{ textAlign: 'center' }}>
            <div style={{ float: 'left', marginRight: '24px' }}>
              <Title level={4}>Total</Title>
              <Text>Rp. {total}</Text>
            </div>
            <div style={{ float: 'right', height: '100%' }}>
              <Button style={{ height: '100%', color: 'green', borderColor: 'green' }}>Checkout</Button>
              <Button style={{ height: '100%' }} type="link">Cancel All</Button>
            </div>
          </Box>
        </Flex>
      )}
      dataSource={cart}
      renderItem={item => (
        <List.Item style={{ padding: '32px' }}>
          <Row
            gutter={48}
            style={{
              maxWidth: '560px'
            }}
          >
            <Col span={12}>
              <img
                alt={item.name}
                src={item.imageUrl.replace('https', 'http')}
                style={{
                  width: '100%',
                  boxShadow: '2px 2px 16px 1px #a9a9a9'
                }}
              />
            </Col>
            <Col span={12}>
              <Descriptions
                title={<Title level={3}>{item.name}</Title>}
                column={1}
                size="small"
              >
                <Descriptions.Item
                  label={<Text strong>Price</Text>}
                >
                  Rp. {item.price}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<Text strong>Amount</Text>}
                >
                  {item.amount}
                </Descriptions.Item>
                <Descriptions.Item
                  label={<Text strong>Subtotal</Text>}
                >
                  Rp .{item.price * item.amount}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  )
}

export default CartContainer
