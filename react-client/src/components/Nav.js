import React from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import { Menu, Button } from 'antd'

import { logout } from '../redux/modules/auth'

const { SubMenu } = Menu

const styles = StyleSheet.create({
  Nav__Menu: {
    borderBottom: 'none',
    lineHeight: 4
  },

  'Button__type--link': {
    padding: 0
  }
})

function Nav (props) {
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    localStorage.removeItem('e-commerce_user')
    localStorage.removeItem('e-commerce_token')
    dispatch(logout())
  }

  const handleClickMenu = ({ key }) => {
    props.history.push(key)
  }

  return (
    <div className="Nav">
      <Menu
        mode="horizontal"
        selectable={false}
        className={css(styles.Nav__Menu)}
        onClick={handleClickMenu}
      >
        <Menu.Item key="/my-cart">
          <Button
            type="link"
            className={css(styles['Button__type--link'])}
          >
            My Cart
          </Button>
        </Menu.Item>
        <SubMenu
          title={
            <Button
              type="link"
              className={css(styles['Button__type--link'])}
            >
              My Shop
            </Button>
          }
          key="shop"
        >
          <Menu.Item key="/my-shop/item">List item</Menu.Item>
          <Menu.Item key="/my-shop/item/new">Create an Item</Menu.Item>
        </SubMenu>
        <Menu.Item
          key="logout"
          onClick={handleClickLogout}
        >
          <Button
            type="link"
            className={css(styles['Button__type--link'])}
          >
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default withRouter(Nav)
