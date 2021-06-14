<template>
    <div>
        <v-card 
              class="mx-auto mt-5"
              max-width="80%"
        >
        <v-card-title>
            Add Freelancer
        </v-card-title>
        <v-card-body color="#eee" class="p-5" >
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
             <v-text-field
                class="mx-3"
                label="FirstName"
                :rules="rules1"
                v-model="freelancer.firstname"
                hide-details="auto"
                ></v-text-field>
                <v-text-field
                class="mx-3"
                label="LastName"
                :rules="rules1"
                v-model="freelancer.lastname"
                hide-details="auto"
                ></v-text-field>
            <v-text-field
                 class="mx-3"
                label="Email"
                v-model="freelancer.email"
                :rules="rules3"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Phone number"
                v-model="freelancer.phoneNumber"
                :rules="rules2"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Address"
                v-model="freelancer.address"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Website"
                v-model="freelancer.website"
                hide-details="auto"
                ></v-text-field>
            </v-form>
        </v-card-body>
        <v-card-actions class="mt-5">
            <v-btn
            :disabled="!valid"
            elevation="2"
            class="primary"
            @click="addFreelancer"
            > Add </v-btn>
        </v-card-actions>
        </v-card>

    <v-card class="mx-auto mt-5"
              max-width="80%"
              >
     <v-card-title>
         List of freelancers
     </v-card-title>
     <v-card-body>
        <v-simple-table
    fixed-header
    height="300px"
    class="mx-10 mt-5"
  >
    <template v-slot:default>
      <thead>
        <tr>
        <th class="text-left">
            Id
          </th>
          <th class="text-left">
            FirstName
          </th>
          <th class="text-left">
            LasName
          </th>
          <th class="text-left">
            PhoneNumber
          </th>
          <th class="text-left">
            WebSite
          </th>
          <th class="text-left">
            Adress
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in freelancers"
          :key="item.name"
        >
          <td class="text-left">{{ item.id }}</td>
          <td class="text-left">{{ item.firstName }}</td>
          <td class="text-left">{{ item.lastName}}</td>
          <td class="text-left">{{ item.phoneNumber}}</td>
          <td class="text-left">{{ item.website}}</td>
          <td class="text-left">{{ item.address}}</td>
          <td class="text-left">
              <router-link :to="'/freelancer/' + item.id">
              <v-btn >Details</v-btn>
              </router-link>
              </td>
              
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
    valid: false,
      freelancer: {
        name: null,
        email: null,
        phoneNumber: null,
        address: null,
        website: null,
      },
      freelancers: [],
      rules1: [
        value => !!value || 'Required.',
        v => (v && v.length > 3) || 'Name must be more than 10 characters'
      ],
       rules2: [
        value => !!value || 'Required.',
        value => !isNaN(parseInt(value)) || 'Number is required',
      ],
      rules3: [
          value => !!value || 'Required.',
          value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      ]
    }),
    methods: {
        addFreelancer() {
            var data = JSON.stringify({
                    "firstName": "Foulen",
                    "lastName": "Ben foulen",
                    "email": "foulen@freelancer.com",
                    "phoneNumber": "11223344",
                    "address": "Rue Adresse Immeuble",
                    "website": "freelancer.com"
                    });

            var config = {
                method: 'post',
                url: 'https://intern.api.cynoia.com/api/freelancer/add_freelancer',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
                };
            axios.post(config)
            .then(res => {
                alert('succ')
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
        },
        getFreelancers(){
            axios.get('https://intern.api.cynoia.com/api/freelancer/')
            .then(res => {
                this.freelancers = res.data
            })
            .catch(e => console.log(e))
        },
    },
    created() {
            this.getFreelancers()
        }
  }
</script>