const Model = require('./Model');
const View = require('./View');

const Todo = Model.extend({
  sex: 'male',
  name: 'zhujian'
});

const model = new Todo();

const TodoView=View.extend({
  initialize: function () {
    this.listenTo(model, 'change', function () {
      console.log('change');
    });
    this.listenTo(model, 'destroy', function () {
      console.log('destroy');
    });
    this.listenTo(model, 'all', function () {
      console.log('all1');
    });
    this.listenTo(model, 'all', function () {
      console.log('all2');
    });
  }
});

new TodoView();
model.set('name', 'daoge');
console.log(model.toJSON());
model.clear();
