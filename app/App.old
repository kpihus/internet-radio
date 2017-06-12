<template>
    <div id="app">
        <navbar placement="top" type="default">
            <a slot="brand" href="#" title="Sid Commander" class="navbar-brand">Sid Commander</a>

        </navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2 col-md-offset-10">
                    <button class="addbtn btn btn-primary" @click="newMessage()">Add New Message</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <accordion type="info" :one-at-atime="checked">
                        <panel v-for="item in commands">
                            <strong slot="header"><u>{{item.message}}</u></strong>
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td><strong>Message:</strong></td>
                                                <td colspan="4"><input type="text" v-model=item.message size="16" maxlength="16" /> </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Answers</strong></td>
                                                <td><input type="text" size="4" maxlength="3" v-model=item.answers[0] /></td>
                                                <td><input type="text" size="4" maxlength="3" v-model=item.answers[1] /></td>
                                                <td><input type="text" size="4" maxlength="3" v-model=item.answers[2] /></td>
                                                <td><input type="text" size="4" maxlength="3" v-model=item.answers[3] /></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <button class="btn btn-success" @click="sendMessage(item)">Send</button>
                                                </td>
                                                <td colspan="3">&nbsp;</td>
                                                <td style="text-align: right">
                                                    <button class="btn btn-danger" @click="deleteMessage(item)">Delete</button>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </panel>
                    </accordion>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <panel>
                        <strong slot="header">Connected clients</strong>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Last message</th>
                                <th>Answer</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in clients">
                                <td>{{item.name}}</td>
                                <td>{{item.status}}</td>
                                <td>{{item.message}}</td>
                                <td>{{item.answer}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </panel>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .menu_item {
        cursor: pointer;
        padding: 10px
    }
    .addbtn{
        margin: 5px;
    }
</style>

<script>
  import {accordion, panel, navbar, dropdown} from 'vue-strap';
  export default {


    components: {
      accordion, panel, navbar, dropdown
    },

    data () {
      return {
        commands: [],
        clients: []
      }
    },

    filters: {},

    created () {
      var self = this;
      console.log('CREATED',); //TODO: REMOVE
      this.getMessages();
      this.$socket.on('clientin', function (clientItem) {
        self.clients.push(Object.assign({},clientItem, {
          status: 'Connected',
          message: '',
          answer: ''
        }));


      });
      this.$socket.on('clientout', function(clientId){
        console.log('CLIENTOUT', clientId); //TODO: REMOVE
        self.removeClient(clientId);
      });

      this.$socket.on('clientack', function(clientId){
        self.setAck(clientId);
      })
      this.$socket.on('clientresp', function(msg){
        self.setResp(msg.client, msg.resp)
      })
    },

    methods: {
      getMessages(){
        this.$http.get('http://localhost:3000/messages')
          .then(function (response) {
            console.log(response)
            this.$set('commands', response.body)
          })
      },
      saveMessages(){
        console.log('Saving messages');
        this.$http.post('http://localhost:3000/messages', this.commands)
          .then(function(response){
            console.log('Messages saved',response);
          })
      },
      deleteMessage(item){
        this.commands.$remove(item);
        this.saveMessages();
      },
      sendMessage(message){
        var string = message.answers.reduce(function(acc, val){
          return acc+'|'+val;
        }, message.message);

        console.log('Sending Message', string)
        this.$socket.emit("message", string);
        this.setSent(message.message);
        this.saveMessages();
      },
      removeClient(clientId){
       var client = this.clients.find(function(item){
         console.log('REMOVE ITEM', item); //TODO: REMOVE
         return item.clientid === clientId;
         });
       console.log('CLIENT TO REMOVE',client)
        this.clients.$remove(client);

      },
      setSent(text){
        this.clients.forEach(function (item) {
          item.status = 'Sent'
          item.message = text
          item.answer = ''
        })
      },
      setResp(client, resp){
        this.clients.forEach(function (item) {
          if(item.clientid === client){
            item.status='Answer'
            item.answer = resp
          }
        })
      },
      setAck(clientId){
        console.log(clientId)
        this.clients.forEach(function (item) {
          if(item.clientid === clientId){
            item.status = 'Received'
          }
        })
      },
      newMessage(){
        this.commands.push({
        title: '', message: '', answers: ['','','','']
        })
      }
    }

  }
</script>
