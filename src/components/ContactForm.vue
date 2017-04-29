<template>
<div class="py-4 container">
  <h2 class="text-center">Contact Info</h2>
  <div class="container col-md-10">
    <vue-form :state="formstate" v-model="formstate" @submit.prevent="onSubmit">

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.first_name)">
        <label>First Name</label>
        <input type="text" name="first_name" class="form-control" maxlength="40" required v-model.lazy="formData.first_name">
  
        <field-messages name="first_name" show="$touched || $submitted" class="form-control-feedback">
          <div>Success!</div>
          <div slot="required">First Name is a required field</div>
        </field-messages>
  
      </validate>
  
      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.last_name)">
        <label>Lsat Name</label>
        <input type="text" name="last_name" class="form-control" required maxlength="40" v-model.lazy="formData.last_name">
  
        <field-messages name="last_name" show="$touched || $submitted" class="form-control-feedback">
          <div>Success!</div>
          <div slot="required">Last Name is a required field</div>
        </field-messages>
  
      </validate>
      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
        <label>Email</label>
        <input type="email" name="email" class="form-control" required v-model.lazy="formData.email">
  
        <field-messages auto-label name="email" show="$touched || $submitted" class="form-control-feedback">
          <div>Success!</div>
          <div slot="required">Email is a required field</div>
          <div slot="email">Email is invalid</div>
        </field-messages>
  
      </validate>
  
      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.description)">
        <label>Description</label>
        <textarea name="description" class="form-control" maxlength="300" required v-model.lazy="formData.description"></textarea>
        <field-messages name="description" show="$touched || $submitted" class="form-control-feedback">
          <div>Success!</div>
          <div slot="required">Description is a required field</div>
        </field-messages>
      </validate>
  
      <div class="row">
        <div class="col-md-5 text-right">
          <button  v-if=submited class="btn btn-primary" type="submit" disabled="disabled">Submit</button>
          <button v-else class="btn btn-primary" type="submit">Submit</button>
        </div>
        <div class="col-md-1">
        </div>
        <div class="col-md-5 text-left">
          <button class="btn btn-primary" type="button" v-on:click="goBack()">Cancel</button>
        </div>
      </div>
    </vue-form>
  </div>
</div>

</template>

<script>
import api from '../api.js'
import router from '../router'
export default {
  name: 'contactForm',
  data () {
    return {
      formstate:{},
      formData: {
      first_name:'',
      last_name: '',
      email:'',
      description:''
      },
      submited:false
    }
  },
  mounted (){
    this.getContacts(this.$route.params.id);
  } ,
  methods:{
    getContacts (id) {
      if(id){
        api.get('contacts/'+id, {}, (response)=>{
          //console.log(response);
          this.formData = response;
        });
      }
    },
    goBack() {
      //alert(JSON.stringify(this.formData));
      router.push("/contacts");
    },
    fieldClassName: function (field) {
      if(!field) {
        return '';
      }
      if((field.$touched || field.$submitted) && field.$valid) {
        return 'has-success';
      }
      if((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-danger';
      }
    },
    onSubmit: function() {
      if(this.formstate.$valid) {
        this.submited=true;
        if(this.formData.id){
          api.put('contacts/'+this.formData.id, this.formData, (response)=>{
           this.goBack();
          });
        }else{
          api.post('contacts', this.formData, (response)=>{
           this.goBack();
          });
        }
      }
    }

  }
}
</script>



<style>
.required-field > label::after {
  content: '*';
  color: red;
  margin-left: 0.25rem;
}
</style>