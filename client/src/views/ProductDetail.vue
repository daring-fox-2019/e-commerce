<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 item-photo">
                <img style="max-width:100%;" src="https://i.ebayimg.com/images/g/9VsAAOSw1NFaOWSC/s-l640.jpg" />
            </div>
            <div class="col-md-5" style="border:0px solid gray">
                <h3>{{product.name}}</h3>    
                <!-- Datos del vendedor y titulo del producto -->
                <h5 style="color:#337ab7">by <a href="#">Noel</a> · <small style="color:#337ab7">(sell over 5054)</small></h5>
    
                <!-- Precios -->
                <h3 style="margin-top:0px;">Rp. {{product.price}}</h3>
      
                <div class="section" style="padding-bottom:20px;">
                    <div>
                        <h6 class="title-attr"><small>Quantity</small></h6>         <div style="display: flex;">
                            <div class="btn-minus"> - </div>
                            <input value="1" />
                            <div class="btn-plus"> + </div>
                        </div>    
                    </div>
                </div>                
    
                <!-- Botones de compra -->
                <div class="section" style="padding-bottom:20px;">
                    <button class="btn btn-success"><i class="fas fa-shopping-cart" style="margin-right:5px;"></i> Buy Now</button>
                    <h6><a href="#"><span class="glyphicon glyphicon-heart-empty" style="cursor:pointer;"></span>Add to cart</a></h6>
                </div>                                        
            </div>                              
    
            <div class="col-md-9">
                <ul class="menu-items">
                    <li class="active">Detail</li>
                    <li>Feedback</li>
                </ul>
                <div style="width:100%;border-top:1px solid silver">
                    <p style="padding:15px;">
                        <small>
                        Most of the songs on the album were written during March and April 1968 at a Transcendental Meditation course in Rishikesh, India. The group returned to EMI's Abbey Road Studios in London at the end of May to commence recording sessions that lasted through to mid-October. During these sessions, arguments broke out among the foursome over creative differences. Another divisive element was the constant presence of John Lennon's new partner, Yoko Ono, whose attendance in the studio broke with the Beatles' policy regarding wives and girlfriends not attending recording sessions. After a series of problems, including producer George Martin taking a sudden leave of absence and engineer Geoff Emerick suddenly quitting, Ringo Starr left the band briefly in August. The same tensions continued throughout the following year, leading to the break-up of the band by 1970. 
                        </small>
                    </p>
                    <small>
                        <ul>
                            <li>Super AMOLED capacitive touchscreen display with 16M colors</li>
                            <li>Available on GSM, AT T, T-Mobile and other carriers</li>
                            <li>Compatible with GSM 850 / 900 / 1800; HSDPA 850 / 1900 / 2100 LTE; 700 MHz Class 17 / 1700 / 2100 networks</li>
                            <li>MicroUSB and USB connectivity</li>
                            <li>Interfaces with Wi-Fi 802.11 a/b/g/n/ac, dual band and Bluetooth</li>
                            <li>Wi-Fi hotspot to keep other devices online when a connection is not available</li>
                            <li>SMS, MMS, email, Push Mail, IM and RSS messaging</li>
                            <li>Front-facing camera features autofocus, an LED flash, dual video call capability and a sharp 4128 x 3096 pixel picture</li>
                            <li>Features 16 GB memory and 2 GB RAM</li>
                            <li>Upgradeable Jelly Bean v4.2.2 to Jelly Bean v4.3 Android OS</li>
                            <li>17 hours of talk time, 350 hours standby time on one charge</li>
                            <li>Available in white or black</li>
                            <li>Model I337</li>
                            <li>Package includes phone, charger, battery and user manual</li>
                            <li>Phone is 5.38 inches high x 2.75 inches wide x 0.13 inches deep and weighs a mere 4.59 oz </li>
                        </ul>  
                    </small>
                </div>
            </div>		
        </div>
    </div>  
</template>

<script>
  import api from '@/api/localapi'

    export default {
        props:['id'],
        data() {
            return {
                product : {}
            }
        },
        mounted() {
            this.product = {}
            this.fetchDetailProduct()
        },
        methods: {
            fetchDetailProduct() {
                console.log(this.id);
                api
                .get(`/products/${this.id}`)
                .then(({data}) => {
                    console.log(data);
                    this.product = data
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
    }
</script>

<style scoped>
ul > li{margin-right:25px;font-weight:lighter;cursor:pointer}
li.active{border-bottom:3px solid silver;}

.item-photo{display:flex;justify-content:center;align-items:center;border-right:1px solid #f6f6f6;}
.menu-items{list-style-type:none;font-size:11px;display:inline-flex;margin-bottom:0;margin-top:20px}
.btn-success{width:100%;border-radius:0;}
.section{width:100%;margin-left:-15px;padding:2px;padding-left:15px;padding-right:15px;background:#f8f9f9}
.title-price{margin-top:30px;margin-bottom:0;color:black}
.title-attr{margin-top:0;margin-bottom:0;color:black;}
.btn-minus{cursor:pointer;font-size:12px;display:flex;align-items:center;padding:5px;padding-left:10px;padding-right:10px;border:1px solid gray;border-radius:2px;border-right:0;}
.btn-plus{cursor:pointer;font-size:12px;display:flex;align-items:center;padding:5px;padding-left:10px;padding-right:10px;border:1px solid gray;border-radius:2px;border-left:0;}
div.section > div {width:100%;display:inline-flex;}
div.section > div > input {margin:0;padding-left:5px;font-size:10px;padding-right:5px;max-width:18%;text-align:center;}
.attr,.attr2{cursor:pointer;margin-right:5px;height:20px;font-size:10px;padding:2px;border:1px solid gray;border-radius:2px;}
.attr.active,.attr2.active{ border:1px solid orange;}
</style>
