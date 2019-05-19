<template>
    <div class="quantity-toggle">
        <button :disabled="disabledInput" @click="decrement">&mdash;</button>
            <input :disabled="disabledInput" style="min-width: 60px; font-weight: bold;" v-model="finalquantity" type="text"  @change="updateQty">
        <button :disabled="disabledInput" type="button" @click="increment">&#xff0b;</button>
    </div>
</template>
<script>
export default {
  props: ['quantity', 'readonly'],
  data () {
    return {
      internalquantity: 0,
    }
  },
  watch: {
      quantity: function(oldval, newval){
          this.internalquantity = this.$props.quantity;
          if(!this.internalquantity) {
            this.internalquantity = 0;
          }
      }
  },
  computed: {
    disabledInput() {
      if(this.$props.readonly) {
        console.log('disabled...');
        return true;
      }
      else {
        return false;
      }
    },
    finalquantity: {
        get: function() {
            return this.internalquantity;
        },
        set: function(value){
            this.internalquantity = Number(value) !== NaN ? Number(value) : 0
            console.log(this.internalquantity);
        }
    }
  },
  mounted() {
      if(this.$props.quantity) {
          this.internalquantity = this.$props.quantity >= 0 ? this.$props.quantity : 0
      }
  },
  methods: {
    increment () {
        this.internalquantity++
        this.$emit('updatequantity', this.internalquantity)
    },
    decrement (e) {
      if(this.internalquantity > 0) {
        this.internalquantity--
      }
      this.$emit('updatequantity', this.internalquantity)
    },
    updateQty() {
        this.$emit('updatequantity', this.finalquantity);
    }
  }
}
</script>
<style scoped>

.quantity-toggle {
  display: flex;
  border-radius: 4px;
}
.quantity-toggle input {
    border: 0;
    border-top: 2px solid #ddd;;
    border-bottom: 2px solid #ddd;;
    width: 2.5rem;
    text-align: center;
    padding: 0 .5rem;
}
.quantity-toggle button {
    border: 2px solid #ddd;;
    padding: .5rem;
    background: #f5f5f5;
    color: #888;
    font-size: 1rem;
    cursor: pointer;
  }

</style>


