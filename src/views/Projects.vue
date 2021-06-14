<template>
    <div>
        <v-card 
              class="mx-auto mt-5"
              max-width="80%"
        >
        <v-card-title>
            Add Project
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
                :rules="rules1"
                v-model="project.title"
                hide-details="auto"
                ></v-text-field>
                <v-text-field
                class="mx-3"
                label="Description"
                :rules="rules1"
                v-model="project.description"
                hide-details="auto"
                ></v-text-field>
            <v-text-field
                 class="mx-3"
                label="StartDate"
                v-model="project.startDate"
                :rules="rules3"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="EndDate"
                v-model="project.endDate"
                :rules="rules2"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Duration"
                v-model="project.duration"
                hide-details="auto"
                ></v-text-field>

            <v-text-field
                    class="mx-3"
                label="Type"
                v-model="project.type"
                hide-details="auto"
                ></v-text-field>
            </v-form>
        </v-card-body>
        <v-card-actions class="mt-5">
            <v-btn
            :disabled="!valid"
            elevation="2"
            @click="addProject"
            > Add </v-btn>
        </v-card-actions>
        </v-card>

    <v-card class="mx-auto mt-5"
              max-width="80%"
              >
     <v-card-title>
         List of Projects
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
            Description
          </th>
          <th class="text-left">
            startDate
          </th>
          <th class="text-left">
            endDate
          </th>
          <th class="text-left">
            Duration
          </th>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in projects"
          :key="item.id"
        >
          <td class="text-left">{{ item.id }}</td>
          <td class="text-left">{{ item.description }}</td>
          <td class="text-left">{{ moment(item.startDate).format("DD-MM-YYYY")}}</td>
          <td class="text-left">{{ moment(item.endDate).format("DD-MM-YYYY")}}</td>
          <td class="text-left">{{ item.duration}}</td>
          <td class="text-left">{{ item.type}}</td>
          <td class="text-left">
              <router-link :to="'/project/' + item.id">
              <v-btn >Details</v-btn>
              </router-link>
              <v-btn @click="deleteProject(item.id)" class="ml-2 error">Delete</v-btn>
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
    valid: false,
      project: {
        title: null,
        description: null,
        startDate: null,
        endDate: null,
        duration: null,
        type: null,
      },
      projects: [],
      rules1: [
      ],
       rules2: [
      ],
      rules3: [
      ]
    }),
    methods: {
        moment,
        addProject() {
            axios.post('https://intern.api.cynoia.com/api/project',this.project)
            .then(res => {
                alert('succ')
                console.log(res)
                this.getProjects()
            })
            .catch(e => {
                console.log(e)
            })
        },
        getProjects(){
            axios.get('https://intern.api.cynoia.com/api/project')
            .then(res => {
                console.log(res.data)
                this.projects = res.data
            })
            .catch(e => console.log(e))
        },
        deleteProject(id){
            axios.delete('https://intern.api.cynoia.com/api/project/' + id)
            .then(() => {
                this.getProjects()
            })
            .catch(e => console.log(e))
        }
    },
    created() {
            this.getProjects()
        }
  }
</script>