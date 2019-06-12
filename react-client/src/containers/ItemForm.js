import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Upload,
  Card,
  Row,
  Col,
  Icon,
  Input,
  InputNumber,
  Form,
  Button
} from 'antd'
import { StyleSheet, css } from 'aphrodite'

import { createItem, updateItem, fetchItemById } from '../redux/modules/items'
import './ItemForm.css'

const styles = StyleSheet.create({
  FormItem: {
    marginBottom: 0
  }
})

function ItemForm (props) {
  const itemId = props.match.params.itemId

  const [state, setState] = useState({
    imageChanged: false,
    image: {},
    imageUrl: '',
    name: '',
    stock: 1,
    price: 1
  })

  const token = useSelector(state => state.auth.token)
  const item = useSelector(
    state => state.items.all.find(item => item._id === props.match.params.itemId)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (itemId) {
      if (!item) {
        dispatch(fetchItemById(itemId))
      } else {
        setState(state => ({
          ...state,
          imageUrl: item.imageUrl,
          name: item.name,
          stock: item.stock,
          price: item.price
        }))
      }
    }
  }, [dispatch, item, itemId])

  const handleChangeImage = info => {
    setState({
      ...state,
      image: info.file,
      imageChanged: true,
    })
    const reader = new FileReader()

    reader.onloadend = () => {
      setState({
        ...state,
        imageUrl: reader.result
      })
    }

    if (info.file) reader.readAsDataURL(info.file)
  }

  const handleSubmit = e => {
    e.preventDefault()

    let formData = new FormData()
    formData.append('name', state.name)
    formData.append('stock', state.stock)
    formData.append('price', state.price)
    if (state.imageChanged) {
      formData.append('image', state.image)
    }

    const action = itemId
      ? updateItem(itemId, formData, token)
      : createItem(formData, token)

    dispatch(action)
      .then(() => props.history.push('/my-shop/item'))
      .catch(err => console.log(err))
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div>Upload</div>
    </div>
  )

  return (
    <Card
      hoverable
      style={{
        backgroundColor: '#f0f2f5',
        maxWidth: '720px'
      }}
    >
      <Form
        layout="vertical"
        onSubmit={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              label="Image"
              className={css(styles.FormItem)}
              required
            >
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChangeImage}
                required
              >
                {state.imageUrl
                  ? <img
                      src={state.imageUrl.replace('https', 'http')}
                      alt="item"
                      style={{ width: '100%' }}
                    />
                  : uploadButton
                }
              </Upload>
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item
              label="Name"
              className={css(styles.FormItem)}
              required
            >
              <Input
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })}
                required
              />
            </Form.Item>
            <Form.Item
              label="Stock"
              className={css(styles.FormItem)}
              required
            >
              <InputNumber
                defaultValue="1"
                min={1}
                value={state.stock}
                onChange={e => setState({ ...state, stock: e.target.value })}
                required
              />
            </Form.Item>
            <Form.Item
              label="Price"
              className={css(styles.FormItem)}
              required
            >
              <InputNumber
                defaultValue="1"
                min={1}
                value={state.price}
                onChange={e => setState({ ...state, price: e.target.value })}
                required
              />
            </Form.Item>
            <Form.Item
              style={{ marginTop: '16px' }}
              required
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '8px' }}
              >
                Save
              </Button>
              <Button>Cancel</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default withRouter(ItemForm)
