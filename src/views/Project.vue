<template>
    <div>
        <v-card
           class="mx-auto mt-5"
              max-width="80%"
        >
            <v-card-title>
                Project id {{$route.params.id}}
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
            <td> {{project.id}}</td>
        </tr>
        <tr>
            <td> Title : </td>
            <td> {{project.title}}</td>
        </tr>
        <tr>
            <td> Description : </td>
            <td> {{project.description}}</td>
        </tr>
        <tr>
            <td> StartDate : </td>
            <td> {{moment(project.startDate).format("DD-MM-YYYY")}}</td>
        </tr>       
        <tr>
            <td> EndDate : </td>
            <td> {{moment(project.endDate).format("DD-MM-YYYY")}}</td>
        </tr> 
        <tr>
            <td> Duration : </td>
            <td> {{project.duration}}</td>
        </tr>  
        <tr>
            <td> Type : </td>
            <td> {{project.type}}</td>
        </tr> 
    </tbody>
            </template>
        </v-simple-table>
            </v-card-body>
        </v-card>

        <v-card 
              class="mx-auto mt-5"
              max-width="80%"
        >
        <v-card-title>
            Update Project
        </v-card-title>
        <v-card-body color="#eee" class="p-5" >
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
             <v-text-field
                class="mx-3"
                label="Title"
                v-model="projectu.title"
                hide-details="auto"
                ></v-text-field>
                <v-text-field
                class="mx-3"
                label="Description"
                v-model="projectu.description"
                hide-details="auto"
                ></v-text-field>
            <v-text-field
                 class="mx-3"
                label="StartDate"
                v-model="projectu.startDate"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="EndDate"
                v-model="projectu.endDate"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Duration"
                v-model="projectu.duration"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Type"
                v-model="projectu.type"
                hide-details="auto"
                ></v-text-field>
            </v-form>
        </v-card-body>
        <v-card-actions class="mt-5">
            <v-btn
            elevation="2"
            class="primary"
            @click="updateProject"
            > Update </v-btn>
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
                    <v-btn class="warning" @click="affect(item.id)">Affect</v-btn>
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
    import moment from 'moment'
  export default {
    data: () => ({
      project: null,
      projectu:null,
      freelancers: [],
    }),
    methods: {
        moment,
        updateProject() {
            axios.post('https://intern.api.cynoia.com/api/project/update_project',this.projectu)
            .then(res => {
                console.log(res)
                this.getProject()
            })
            .catch(e => {
                console.log(e)
            })
        },
        getProject(){
            let id = this.$route.params.id
            axios.get('https://intern.api.cynoia.com/api/project/' + id)
            .then(res => {
                this.project = res.data
                this.projectu = res.data
            })
            .catch(e => console.log(e))
        },
        getFreelancers(){
            axios.get('https://intern.api.cynoia.com/api/freelancer/')
            .then(res => {
                this.freelancers = res.data
            })
            .catch(e => console.log(e))
        },
        affect(id){
            var data = {
                freelancerId: id,
                projectId: this.project.id,

            }
            axios.put('https://intern.api.cynoia.com/api/freelancer/',data)
            .then(res => {
                console.log(res)
                alert('affected')
            })
            .catch(e => console.log(e))
        }
    },
    created() {
            this.getProject()
            this.getFreelancers()
        }
  }
</script>