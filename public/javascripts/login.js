Ext.onReady(function() {
  loginForm = new Ext.FormPanel({
    labelWidth: 75,
    frame: true,
    title: 'Login',
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
      name: 'password'
    }]
  });

  loginWindow = new WeaponWindow({
    header: 'Login',
    myForm: loginForm,
    buildSave: login_function
  });

  
  loginWindow.buttons[1].text = "Login";
  values = loginForm.getForm().getValues();

  function login_function() {
    Ext.Ajax.request({
      url: '/login/login',
      success: function(response, opts) {
        Ext.MessageBox.alert('Warning', 'You are login success!');
      },
      failure: function(response, opts) {
        Ext.MessageBox.alert('Warning', 'Password or Name invalid!');
      },
      params: {
        login: values
      }
    });


  }

})