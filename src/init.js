const EventEmit=require('./EventEmit');

const eventEmit=new EventEmit();

var b=function(){
  console.log(2)
};
eventEmit.on('a',function(){
  console.log(1);
});

eventEmit.once('a',b);

// eventEmit.off('a',b);
eventEmit.trigger('a');
