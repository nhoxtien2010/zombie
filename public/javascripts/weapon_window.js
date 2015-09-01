Ext.ns("TienNguyen");

TienNguyen.WeaponWindow = Ext.extend(Ext.Window, {
  renderTo: Ext.getBody(),
  width: 500,
  height: 350,
  closeAction: 'hide',
  layout: 'fit',
  plain: true,
  initComponent: function(){
    this.buttons = [{
      text: 'Cancel',
      handler: function() {
        this.hide();
      }
    },{
      text: 'Save',
      handler: this.buildSave
    }];

    this.myForm = new WeaponForm();

    this.items = [this.myForm];
    WeaponWindow.superclass.initComponent.call(this);
  },
  buildSave: function(){}
})