WeaponWindow = Ext.extend(Ext.Window, {
  renderTo: Ext.getBody(),
  width: 500,
  height: 350,
  closeAction: 'hide',
  layout: 'fit',
  plain: true,
  initComponent: function(){
    var myWindow = this;

    this.buttons = [{
      text: 'Cancel',
      handler: function(){
        myWindow.hide();
      }
    },{
      text: 'Save',
      handler: this.buildSave
    }];
    this.items = [this.myForm];
    WeaponWindow.superclass.initComponent.call(this);
  },
  buildSave: function(){}
});


// register xtype to class WeaponWindow
Ext.reg('weaponWindow', WeaponWindow);