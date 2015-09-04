Ext.onReady(function() {
  var loginForm = new Ext.form.FormPanel({
    labelWidth: 75,
    frame: true,
    // title: 'Login',
    bodyStyle: 'padding:5px 5px 0',
    width: 350,
    defaults: {
      width: 230
    },
    defaultType: 'textfield',
    items: [{
      fieldLabel: 'Name',
      name: 'name',
      allowBlank: false
    }, {
      fieldLabel: 'Password',
      inputType: 'password',
      name: 'password',
      allowBlank: false
    }]
  });

  loginWindow = new Ext.Window({
    width: 400,
    height: 150,
    closeAction: 'hide',
    layout: 'fit',
    title: 'Login',
    closeAction: 'hide',
    items: [loginForm],
    buttons: [{
      text: 'Cancel',
      handler: function(){
        loginWindow.hide();

      }
    },{
      text: 'Login',
      handler: login_function
    }]
  });

  loginWindow.show();





   function login_function(){
    Ext.Ajax.request({
      url: '/login/login',
      success: function(response) {
        var data= Ext.util.JSON.decode(response.responseText);
        if(data.success)
        {
          alert("You login successfully!");
          window.location.href = '/weapons';
        }else{
          alert("Wrong name or password!");
        }

      },
      failure: function(response, opts) {
        Ext.MessageBox.alert('Warning', 'Password or Name invalid!');
      },
      params: {
        name: loginForm.getForm().getValues()['name'],
        password: loginForm.getForm().getValues()['password']
      }
    });
  }

})