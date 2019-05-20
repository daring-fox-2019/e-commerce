import {
    Bar,
    mixins
} from 'vue-chartjs'

export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    data() {
        return {
            options: {
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      },
                      gridLines: {
                        display: true
                      }
                    }
                  ],
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true
                      },
                      gridLines: {
                        display: false
                      }
                    }
                  ]
                },
                legend: {
                  display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                height: 200
              }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }

}