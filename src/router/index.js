import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Contacts from '@/components/Contacts'
import ContactForm from '@/components/ContactForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/contacts/add',
      name: 'ContactForm',
      component: ContactForm
    },
    {
      path: '/contacts/edit/:id(\\d+)',
      name: 'EditContactForm',
      component: ContactForm
    }
  ]
})
