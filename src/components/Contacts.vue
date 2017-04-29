<template>
<div class="py-4 container">
  <h2 class="text-center">Contact List</h2>
  <div class="row">
    <div class="col-md-6">
      <b-form-fieldset horizontal label="Rows" >
        <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
        </b-form-select>
      </b-form-fieldset>
    </div>
    <div class="col-md-6 text-right">
      <b-button size="md" variant="primary" v-on:click="addContacts()">
      Add Contact
      </b-button>
    </div>
  </div>

  <!-- Main table element -->
  <b-table striped hover :items="contactsList" :fields="fields" :per-page="perPage" :current-page="currentPage" :filter="filter">
    <template slot="name" scope="item">
      {{item.value.first}} {{item.value.last}}
    </template>
    <template slot="actions" scope="item">
      <b-btn size="sm" @click="editContacts(item.item.id)">Edit</b-btn>
      <b-btn size="sm" @click="delConfirm(item.item.id)">Del</b-btn>
    </template>
  </b-table>

  <div class="justify-content-center row my-1">
    <b-pagination size="sm" :total-rows="this.contactsList.length" :per-page="perPage" v-model="currentPage" />
  </div>

  <b-modal id="confirm-modal" ref="confirmModal" title="Please confirm" close-title="cancel" @ok="delContacts(deleteID)">
    <div class="modal-body">
      are you sure you want to delete ID: {{deleteID}}?
    </div>
  </b-modal>
</div>
</template>

<script>
import api from '../api.js'
import router from '../router'
export default {
  name: 'contacts',
  data () {
    return {
      contactsList:[],
      fields: {
        id: {
          label: 'ID',
          sortable: true
        },
        first_name: {
          label: 'First name',
          sortable: true
        },
        last_name: {
          label: 'Last name',
          sortable: true
        },
        email: {
          label: 'Email Address',
          sortable: true
        },
        description: {
          label: 'Description'
        },
        actions: {
          label: 'Actions'
        }
      },
      filter: null,
      currentPage:1,
      perPage:10,
      deleteID:null
    }
  },
  mounted (){
    this.getContacts();
  } ,
  methods:{
    getContacts (params) {
      api.get('contacts', params, (response)=>{
        //console.log(response);
        this.contactsList = response;
      });
    },
    delConfirm (id) {
      this.deleteID=id;
      //this.$root.$emit('show::modal','confirm-modal');
      //console.log(this.$refs);
      this.$refs.confirmModal.show();
    },
    delContacts (id) {
      this.$refs.confirmModal.hide();
      api.delete('contacts/'+id, {}, (response)=>{
        this.getContacts();
      });
    },
    editContacts (id) {
      router.push("/contacts/edit/"+id);
    },
    addContacts () {
      router.push("/contacts/add");
    }
  }
}
</script>
