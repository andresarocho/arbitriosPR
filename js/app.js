App = Ember.Application.create();

App.ApplicationView = Ember.View.extend({
  templateName: 'nav',
  didInsertElement: function() 
  {
    $('.button-collapse').sideNav({'edge': 'left'});
    $('.modal-trigger').leanModal();
    $('.scrollspy').scrollSpy();
  }
})



App.Router.map(function() {
  this.resource('calculation');
  this.resource('msrp');
  
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('calculation');
  }
});

Ember.Handlebars.helper('number', function(value, options) {
    return accounting.formatNumber(value);
});

Ember.Handlebars.helper('money', function(value, options) {
    return accounting.formatMoney(value, (options.hash.symbol || '$'), (options.hash.precision || 2));
});

App.FocusInputComponent = Ember.TextField.extend({
  becomeFocused: function() {
   this.$().focus();
     this.$().keypress(function (e) 
     {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) 
     {
        
    }
   });
  }.on('didInsertElement')
});



App.CalculationController = Ember.Controller.extend({
  isFinished: false,
  isCarPriceEmpty: false,
  carPrice:'',
  taxesToPay: '',
  totalPrice: '',
  range: '',
  taxRange: '',
  animationIn: 'img-rounded animated bounceIn',
  animationOut: 'img-rounded animated bounceOut',

  animationClass: function () {
    return this.get('isFinished') && this.get('carPrice') ? 'animated bounceIn' : 'animated bounceOut';
  }.property('result','errors.email'),

  carPriceValueObserver: function ()
  {
  	this.set('isFinished', false);
    carPrice = this.get('carPrice');
    if(carPrice)
      this.set('carPrice',accounting.formatNumber(carPrice));
    else
    {
      this.set('carPrice',carPrice);
    }
  	// if(carPrice)
  	// 	this.set('isCarPriceEmpty',false);

  }.observes("carPrice"),

    actions: {
    calcularArbitrios: function() {

      // Logic to calculate 
      carPrice = this.get('carPrice');
      cleanPrice = parseFloat(carPrice.replace(/[^0-9-.]/g, ''));
      taxesToPay  = calculateTax(cleanPrice);
      this.set('taxesToPay',taxesToPay.taxToPay);
      this.set('totalPrice',taxesToPay.totalPrice);
      this.set('range',taxesToPay.range);
      this.set('taxRange',taxesToPay.taxRange);
      

      carPrice = accounting.formatMoney(carPrice);
      console.log("Convertido a dinero: " + carPrice);
      this.set('carPrice',carPrice);
      this.set('isFinished', true);

      // Scroll a little bit
      $('#result').scrollSpy();

    },

    focused: function() {
    carPrice = '';
    this.set('carPrice',carPrice);
    },

    reset: function() {
      this.set('isFinished', false);
    },

  }
});


App.ApplicationController = Ember.Controller.extend({
  test: false,
    actions: {
    openMSRPModal: function(){
      $('#modal1').openModal();
    }
  }
});


