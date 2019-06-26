import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import { Layout, Typography, notification } from 'antd'
import { Flex, Box } from '@rebass/grid'

import Nav from './components/Nav'
import ItemTiles from './containers/ItemTiles'
import AuthForm from './containers/AuthForm'
import ItemForm from './containers/ItemForm'
import CartContainer from './containers/CartContainer'

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
  onClick: notification.destroy
})

const { Header, Content } = Layout
const { Title } = Typography

const styles = StyleSheet.create({
  App: {
    minHeight: '100vh'
  },

  App__Layout: {
    backgroundColor: 'white'
  },

  App__Header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #f0f2f5',
    height: '100%'
  },

  App__Content: {
    padding: '48px 50px'
  }
})

export default function App (props) {
  const isLoggedIn = useSelector(state => !!state.auth.token)

  return (
    <div className="App">
      <Layout className={css(styles.App__Layout)}>
        <Header className={css(styles.App__Header)}>
          <Flex
            alignItems="center"
            justifyContent="space-between">
            <Box>
              <Title level={4} style={{ margin: 0 }}>
                <Link to="/">e-commerce</Link>
              </Title>
            </Box>
            <Box>
              {
                isLoggedIn
                  ? <Nav />
                  : <AuthForm />
              }
            </Box>
          </Flex>
        </Header>
        <Content className={css(styles.App__Content)}>
          <Route exact path="/" component={ItemTiles} />
          <Route exact path="/my-shop/item" component={ItemTiles} />
          <Switch>
            <Route path="/my-shop/item/new" component={ItemForm} />
            <Route path="/my-shop/item/:itemId" component={ItemForm} />
          </Switch>
          <Route exact path="/my-cart" component={CartContainer} />
        </Content>
      </Layout>
    </div>
  )
}
