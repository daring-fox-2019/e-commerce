<template>
  <v-carousel
    height="350"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'carousel',
  data() {
    return {
      items: [
        {
          src: 'https://images.techhive.com/images/article/2017/04/apple-product-family-stock-2017-100719903-large.jpg',
        },
        {
          src: 'http://www.banningtechknow.com/wp-content/uploads/2015/02/samsung_products.jpg',
        },
        {
          src: 'https://zdnet2.cbsistatic.com/hub/i/r/2017/07/05/a8338f87-4cbf-4697-aa15-8c9de772b672/resize/1170x878/231e549f629436360a74edf9b0369bb4/2017-07-0515-01-58.jpg',
        },
        {
          src: 'http://bpc.h-cdn.co/assets/17/24/1497286705-samsung-phones.jpg',
        },
        {
          src: 'https://9to5mac.com/wp-content/uploads/sites/6/2018/08/public-beta1.jpg?quality=82&strip=all&w=1600',
        },
        {
          src: 'https://cdn2.techadvisor.co.uk/cmsdata/features/3647841/samsung_note_809.jpg',
        },
        {
          src: 'http://www.electronicsb2b.com/wp-content/uploads/2017/07/22-4.jpg',
        },
        {
          src: 'http://static1.businessinsider.com/image/596e282cc50c291e008b4fb4-1190-625/the-best-apple-products-to-buy-from-apples-refurbished-mac-store.jpg',
        },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        // },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        // },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        // },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        // },
      ],
    };
  },
};
</script>
