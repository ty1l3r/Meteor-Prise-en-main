import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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
    }

  });

    Template.hello.events({
      'click .js-addBouton'(event, instance) {
        // increment the counter when button is clicked
        instance.counter.set(instance.counter.get() + 1);
      },
      'click .js-addPlus'(event, instance) {
        instance.counter.set(instance.counter.get() + 5);
      }
    });
