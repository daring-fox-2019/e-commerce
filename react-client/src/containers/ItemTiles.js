import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { List, Modal, Button, Typography } from 'antd'

import ItemDetail from '../components/ItemDetail'
import InputAmount from '../components/InputAmount'
import ItemCard from '../components/ItemCard'
import { auth as notif } from '../components/notifications'
import {
  fetchAllItems,
  setSelected,
  clearSelected,
  setFilter,
  clearFilter
} from '../redux/modules/items'
import { addItem } from '../redux/modules/cart'

const { Text } = Typography

function ItemTiles (props) {
  const [modalVisible, showModal] = useState(false)
  const [amount, setAmount] = useState(1)

  const token = useSelector(state => state.auth.token)
  const isLoggedIn = !!token
  const selectedId = useSelector(state => state.items.selected)
  const items = useSelector(state => state.items.all)
  const userId = useSelector(state => state.auth.user._id)

  const selectedItem = items.find(item => item._id === selectedId)
  const dispatch = useDispatch()
  const applyFilter = props.location.pathname === '/my-shop/item'

  const handleClickItem = id => {
    dispatch(setSelected(id))
    showModal(true)
  }

  const handleClickAdd = itemId => {
    if (!isLoggedIn) {
      notif.loginRequired()
    } else {
      dispatch(addItem(itemId, token))
    }
  }

  const handleClickBuy = () => {
    if (!isLoggedIn) {
      notif.loginRequired()
    }
  }

  useEffect(() => {
    dispatch(clearFilter())
  }, [dispatch, applyFilter])
  useEffect(() => {
    applyFilter && dispatch(setFilter({ seller: userId }))
  }, [dispatch, applyFilter, userId])
  useEffect(() => {
    dispatch(fetchAllItems())
  }, [dispatch, applyFilter])

  return (
    <div className="ItemTiles">
      <List
        grid={{ gutter: 16, column: 6 }}
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <ItemCard
              item={item}
              onClick={() => handleClickItem(item._id)}
            />
          </List.Item>
        )}
      />
      <Modal
        centered
        width={720}
        visible={modalVisible}
        onCancel={() => showModal(false)}
        afterClose={() => dispatch(clearSelected())}
        footer={null}
      >
        { selectedItem && (
          <ItemDetail item={selectedItem}>
            { selectedItem.seller._id !== userId && (
              <>
                <p><Text>Amount</Text></p>
                <InputAmount
                  value={amount}
                  onChange={(increment) => setAmount(amount + increment)}
                  disableAdd={amount >= selectedItem.stock}
                  disableRemove={amount <= 1}
                />
                <div>
                  <Button
                    ghost
                    type="danger"
                    style={{ marginRight: '8px' }}
                    onClick={handleClickBuy}
                  >
                    Buy
                  </Button>
                  <Button
                    onClick={() => handleClickAdd(selectedItem._id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </>
            )}
          </ItemDetail>
        )}
      </Modal>
    </div>
  )
}

export default withRouter(ItemTiles)
