<template>
  <div class="landing">
    <div class="univbg">
        <div class="text-center pt-5 container">
        <h3 style="margin-top:18vh;" class="firstjudul text-center">Teekultur</h3>
        <small class=" secondjudul">/ intertwining drinking with subtle insights into ethics / </small><br><br>
        <router-link to="/products"><button class="btn btn-outline-light">Shop Now</button></router-link>
        </div>
    </div>
    <div class="container-fluid">
      <!-- <div class="univbg row">
        <div class="col xs-12">
          <img class="py-2 img-fluid" src="../assets/landing3.jpg">
        </div>
      </div>-->
      <div style="background-color : rgb(244,244,241)" class="mt-3 row">
        <div class="col-md-3">
          <ImageBlock :pic="pic[0]"></ImageBlock>
        </div>
        <div class="col-md-3">
          <ImageBlock :pic="pic[1]"></ImageBlock>
        </div>
        <div class="col-md-3">
          <ImageBlock :pic="pic[2]"></ImageBlock>
        </div>
        <div class="col-md-3">
          <ImageBlock :pic="pic[3]"></ImageBlock>
        </div>
      </div>

      <div class="container mt-4">
        <div class="row">
          <div class="col-sm-12 col-md-2"></div>
          <div class="col-sm-12 col-md-4">
            <ImageBlock :text="text1" :pic="pic[4]"></ImageBlock>
          </div>
          <div class="col-sm-12 col-md-4">
            <ImageBlock  :text="text2" :pic="pic[5]"></ImageBlock>
          </div>
          <div class="col-sm-12 col-md-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageBlock from "@/components/ImageBlock";
export default {
  components: {
    ImageBlock
  },
  data() {
    return {
      pic: [
        "https://i.ibb.co/GTTk736/prod5b.png",
        "https://i.ibb.co/sKrJrSr/prod4a.png",
        "https://i.ibb.co/Fs2dtSJ/prod3a.png",
        "https://i.ibb.co/dPQ5vWg/prod2a.png",
        "https://images.unsplash.com/photo-1508598076548-8e71b212dd04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1461337164761-2124f78ecc21?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1524424108398-708360971de3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      ],
      text1 : 'Wares',
      text2 : 'Teas'
    };
  }
};
</script>

<style scoped>
.coba {
  max-width: 200vh;
  position: relative;
  z-index: -99999;
}

.firstjudul {
  font-family: "Vollkorn", serif;
  font-weight: 600;
  font-size: 4.3rem;
}

.secondjudul {
  font-family: "Vollkorn", serif;
  font-weight: lighter;
  font-size: 1.2rem;
}

.univbg {
  background-color: white;
  background-image: linear-gradient(to top, transparent, white),
    url("https://images.unsplash.com/photo-1455157823797-3019317cbcf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
  position: relative;
}
</style>
