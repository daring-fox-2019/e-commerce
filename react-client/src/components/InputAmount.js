import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Button, Typography } from 'antd'
import { Flex, Box } from '@rebass/grid'

const { Title } = Typography

const styles = StyleSheet.create({
  InputAmount__Flex: {
    marginBottom: '16px',
    maxWidth: '120px'
  }
})

function InputAmount (props) {
  const handleClickAdd = () => {
    props.onChange(1)
  }

  const handleClickRemove = () => {
    props.onChange(-1)
  }

  return (
    <div className="InputAmount">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={css(styles.InputAmount__Flex)}>
        <Box>
          <Button
            icon="minus"
            shape="circle"
            onClick={handleClickRemove}
            disabled={props.disableRemove}
          ></Button>
        </Box>
        <Box>
          <Title
            level={4}
            style={{ margin: 0 }}
          >
            {props.value}
          </Title>
        </Box>
        <Box>
          <Button
            icon="plus"
            shape="circle"
            onClick={handleClickAdd}
            disabled={props.disableAdd}
          ></Button>
        </Box>
      </Flex>
    </div>
  )
}

export default InputAmount
