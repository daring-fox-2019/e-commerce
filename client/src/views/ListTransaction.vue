<template>
  <div>
    <v-data-table :headers="headers" :items="listTransaction" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item._id }}</td>
        <td>{{ props.item.cart }}</td>
        <td class="text-xs-right">{{ props.item.status }}</td>
        <td class="text-xs-center">
          <v-btn
            color="green"
            @click="action(props.item._id, props.item.status)"
            v-if="props.item.status==='not yet paid'  && !statusAdmin"
          >Pay</v-btn>
          <v-btn
            color="green"
            @click="action(props.item._id, props.item.status)"
            v-else-if="props.item.status==='waiting for delivery confirmation' && statusAdmin"
          >Deliver</v-btn>
          <v-btn
            color="green"
            @click="action(props.item._id, props.item.status)"
            v-else-if="props.item.status==='delivery process' && !statusAdmin"
          >Confrim</v-btn>
          <span v-else-if="props.item.status==='arrived'">Done</span>
          <span v-else>Waiting</span>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Id Transaction',
          align: 'center',
          value: '_id',
          width: '4%',
        },
        {
          text: 'Items',
          align: 'center',
          sortable: false,
          value: 'cart',
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
          width: '15%',
        },
        {
          text: 'Action',
          align: 'center',
          sortable: false,
          width: '1%',
        },
      ],
      listTransaction: [],
      statusAdmin: this.$store.state.isAdmin,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (this.$store.state.isAdmin) {
        axios
          .get('http://localhost:3000/transaction', {
            headers: {
              token: localStorage.token,
            },
          })
          .then(({ data }) => {
            data.forEach((element) => {
              if (element.status === '0') {
                element.status = 'not yet paid';
              } else if (element.status === '1') {
                element.status = 'waiting for delivery confirmation';
              } else if (element.status === '2') {
                element.status = 'delivery process';
              } else if (element.status === '3') {
                element.status = 'arrived';
              }

              let listItem = '';
              element.cart.forEach((el) => {
                this.$store.state.listProduct.forEach((dat) => {
                  if (dat._id == el.productId) {
                    listItem += `${dat.name} (${el.quantity}), `;
                  }
                });
              });
              if (
                listItem.slice(listItem.length - 2, listItem.length) === ', '
              ) {
                listItem = listItem.slice(0, listItem.length - 2);
              }
              element.cart = listItem;
            });
            this.listTransaction = data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get('http://localhost:3000/transaction/user', {
            headers: {
              token: localStorage.token,
            },
          })
          .then(({ data }) => {
            data.forEach((element) => {
              if (element.status === '0') {
                element.status = 'not yet paid';
              } else if (element.status === '1') {
                element.status = 'waiting for delivery confirmation';
              } else if (element.status === '2') {
                element.status = 'delivery process';
              } else if (element.status === '3') {
                element.status = 'arrived';
              }

              let listItem = '';
              element.cart.forEach((el) => {
                this.$store.state.listProduct.forEach((dat) => {
                  if (dat._id == el.productId) {
                    listItem += `${dat.name} (${el.quantity}), `;
                  }
                });
              });
              if (
                listItem.slice(listItem.length - 2, listItem.length) === ', '
              ) {
                listItem = listItem.slice(0, listItem.length - 2);
              }
              element.cart = listItem;
            });
            this.listTransaction = data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    action(id, status) {
      if (status === 'not yet paid') {
        status = '1';
      } else if (status === 'waiting for delivery confirmation') {
        status = '2';
      } else if (status === 'delivery process') {
        status = '3';
      }
      axios
        .patch(
          `http://localhost:3000/transaction/${id}`,
          {
            status,
          },
          {
            headers: {
              token: localStorage.token,
            },
          },
        )
        .then(() => {
          this.loadData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
