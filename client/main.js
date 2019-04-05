import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import   { Messages } from '../both/collections';
import './main.html';

if (Meteor.isDevelopment) {
  window.Messages = Messages;
}

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

  Template.hello.helpers({
    counter() {
      return Template.instance().counter.get();
    },
    title(str) {
      return str + ' Titre provenant du JS ' + str;
    },

    // vue du formulaire
    messages() {
      return Messages.find().fetch();
    }

  });

    Template.hello.events({
      'click .js-addBouton'(event, instance) {
        // increment the counter when button is clicked
        instance.counter.set(instance.counter.get() + 1);
      },
      'click .js-addPlus'(event, instance) {
        instance.counter.set(instance.counter.get() + 5);
      },
      
       // bouton submit
      'submit .js-insert-message'(event, instance) {
        event.preventDefault(); //empeche le rechargement de l'url après validation (GET)

        let content = event.target.content.value; //recupérer le input du formulaire

        // pour montrer que l'event à bien fonctionné
        console.log('form event', content); 

        //creation de la varibal a injecter dans "Messages.insert"

        let messageDoc = {
          content: content,
          createdAt: new Date()
        };

        Messages.insert({messageDoc});

        //on efface la valeur restante dans l'input
        event.target.content.value = ''; 
      }

    });
