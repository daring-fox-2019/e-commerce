import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Typography, Button, Tooltip, Popconfirm } from 'antd'

import { deleteItem } from '../redux/modules/items'

const { Title, Text } = Typography

function ItemCard (props) {
  const inShop = props.location.pathname === '/my-shop/item'

  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  const handleClickEdit = e => {
    e.stopPropagation()
    props.history.push(`/my-shop/item/${props.item._id}`)
  }

  const handleConfirm = () => {
    dispatch(deleteItem(props.item._id, token))
  }

  const action = (
    <div style={{ position: 'absolute', top: -16, right: 8 }}>
      <Tooltip title="edit">
        <Button
          shape="circle"
          icon="edit"
          style={{ marginRight: '4px' }}
          onClick={handleClickEdit}
        />
      </Tooltip>
      <Tooltip title="delete">
        <Popconfirm
          title="Are you sure delete this item?"
          okText="Yes"
          cancelText="No"
          onClick={e => e.stopPropagation()}
          onConfirm={handleConfirm}
        >
          <Button
            shape="circle"
            icon="delete"
            type="danger"
          />
        </Popconfirm>
      </Tooltip>
    </div>
  )

  return (
    <>
      <Card
        hoverable
        bordered={false}
        cover={
          <img
            alt={props.item.name}
            src={props.item.imageUrl.replace('https', 'http')}
          />
        }
        bodyStyle={{ padding: '4px' }}
        onClick={props.onClick}
      >
        <Title
          level={4}
          style={{ margin: '4px 0' }}
        >
          {props.item.name}
        </Title>
        <Text
          strong
          type="danger"
          style={{ fontSize: '120%' }}
        >
          Rp. {props.item.price}
        </Text>
        <br />
        <Text type="secondary">{props.item.seller.email}</Text>
      </Card>
      {inShop && action}
    </>
  )
}

export default withRouter(ItemCard)
