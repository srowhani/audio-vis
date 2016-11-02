import Ember from 'ember';
const {
  Component
} = Ember
export default Component.extend({
  tagName: 'audio',
  src: null,
  controls: true,
  attributeBindings: ['src', 'controls']
})
