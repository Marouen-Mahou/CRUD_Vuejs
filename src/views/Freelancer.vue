<template>
    <div>
        <v-card
           class="mx-auto mt-5"
              max-width="80%"
        >
            <v-card-title>
                Freelancer id {{$route.params.id}}
            </v-card-title>
            <v-card-body>
                <v-simple-table
    fixed-header
    class="mx-10 mt-5"
  >
    <template v-slot:default>
      <tbody>
        <tr>
            <td> Id : </td>
            <td> {{freelancer.id}}</td>
        </tr>
        <tr>
            <td> FirstName : </td>
            <td> {{freelancer.firstName}}</td>
        </tr>
        <tr>
            <td> LastName : </td>
            <td> {{freelancer.lastName}}</td>
        </tr>       
        <tr>
            <td> Email : </td>
            <td> {{freelancer.email}}</td>
        </tr> 
        <tr>
            <td> PhoneNumber : </td>
            <td> {{freelancer.phoneNumber}}</td>
        </tr>  
        <tr>
            <td> Adress : </td>
            <td> {{freelancer.address}}</td>
        </tr>
        <tr>
            <td> WebSite : </td>
            <td> {{freelancer.website}}</td>
        </tr>        
    </tbody>
            </template>
        </v-simple-table>
            </v-card-body>
        </v-card>
    </div>
</template>
<script>
    import axios from 'axios'
  export default {
    data: () => ({
      freelancer: null,
    }),
    methods: {
        addFreelancer() {
            
            axios.post('https://intern.api.cynoia.com/api/freelancer/add_freelancer',this.freelancer)
            .then(res => {
                alert('succ')
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
        },
        getFreelancer(){
            let id = this.$route.params.id
            axios.get('https://intern.api.cynoia.com/api/freelancer/byid?id=' + id)
            .then(res => {
                this.freelancer = res.data
            })
            .catch(e => console.log(e))
        },
    },
    created() {
            this.getFreelancer()
        }
  }
</script>