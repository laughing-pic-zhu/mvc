const Model = require('./Model');
const View = require('./View');

const model = new Model({
  sex: 'male',
  name: 'zhujian'
});

new View({
  initialize: function () {
    this.listenTo(model, 'change', function () {
      console.log('change');
    });
    this.listenTo(model, 'destroy', function () {
      console.log('destroy');
    })
  }
});

model.set('name', 'daoge');
console.log(model.toJSON());
model.clear();
