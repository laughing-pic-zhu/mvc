$(function () {
  const Model = MVC.Model.extend({
    default: {
      done: false,
      title: ''
    }
  });

  const Collection = MVC.Collection.extend({
    model: Model
  });

  const collection = new Collection();

  const liView = MVC.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    events: {
      'dblclick .view': 'editModel',
      'blur .edit': 'close',
      'keypress .edit': 'enter',
      'click .destroy': 'destroy',
      'click .toggle': 'changeCheckBox'
    },
    initialize: function () {
      var model = this.model;
      var _this = this;
      this.listenTo(model, 'change', this.render);
      this.listenTo(model, 'destroy', function () {
        _this.remove();
      });
    },

    editModel: function () {
      this.$el.addClass('editing');
      this.input.focus();
    },

    changeCheckBox: function () {
      this.model.set({
        done: this.$('.toggle')[0].checked
      })
    },

    close: function () {
      this.$el.removeClass('editing');
      var val = this.input.val();
      if (val) {
        this.model.set({
          title: val
        })
      }
    },

    enter: function (e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      this.close();
    },

    destroy: function () {
      this.model.destroy();
    },

    remove: function () {
      this.$el.remove();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    }
  });

  var AppView = MVC.View.extend({
    el: "#todoapp",

    events: {
      'keypress #new-todo': 'enter',
      'click #toggle-all': 'choose'
    },

    enter: function (e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      this.model.push({
        title: this.input.val()
      });
      this.input.val('');
    },

    initialize: function () {
      this.input = this.$("#new-todo");
      this.listenTo(this.model, 'add', this.addOne);
      this.listenTo(this.model, 'all', this.showControl);
    },

    addOne: function (todo) {
      var view = new liView({ model: todo });
      var dom = view.render();
      this.$("#todo-list").append(dom.el);
    },

    showControl: function () {
      var len = this.model.length;
      if (len >= 1) {
        this.$("#main").show()
      } else {
        this.$("#main").hide()
      }
    },

    choose: function () {
      var _this=this;
      this.model.each(function (model) {
        model.set({
          done: _this.$('#toggle-all')[0].checked
        })
      })
    }
  });

  new AppView({ model: collection });
});