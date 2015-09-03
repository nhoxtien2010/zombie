
SupportForm = Ext.extend(Ext.form.FormPanel, {
  layout: 'form',
  change_form: false,
  initComponent: function(){
    this.items = this.buildItems();
    SupportForm.superclass.initComponent.call(this);
  },

  buildItems: function(){
    var wpForm = this;
    return [{
      xtype: 'fieldset',
      labelWidth: 90,
      title: 'Supports details',
      layout: 'form',
      change_form: true,
      defaults: {
        listeners: {
          'change': function() {
            wpForm.change_form = true;
          }
        }
      },
      defaultType: 'textfield',
      autoHeight: true,
      bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
      border: false,
      items: [{
        fieldLabel: 'ID',
        name: 'id',
        disabled: true
      }, {
        fieldLabel: 'Name',
        name: 'name',
        allowBlank: false
      }, {
        xtype: 'numberfield',
        fieldLabel: 'Price',
        minLength: 1,
        maxLength: 3,
        allowBlank: false,
        name: 'price'
      }, {
        xtype: 'numberfield',
        fieldLabel: 'Attack',
        minLength: 1,
        maxLength: 3,
        allowBlank: false,
        name: 'attack'
      }, {
        xtype: 'numberfield',
        minLength: 1,
        maxLength: 3,
        fieldLabel: 'Speed',
        allowBlank: false,
        name: 'speed'
      }, {
        xtype: 'numberfield',
        minLength: 1,
        maxLength: 3,
        fieldLabel: 'Defence',
        allowBlank: false,
        name: 'defence'
      }, {
        xtype: 'radiogroup',
        fieldLabel: 'Cloth',
        name: 'cloth',
        columns: 2,

        items: [{
          xtype: 'radio',
          boxLabel: 'True',
          name: 'cloth',
          checked: true,
          allowBlank: false,
          inputValue: 'true'
        }, {
          xtype: 'radio',
          name: 'cloth',
          boxLabel: 'False',
          inputValue: 'false'
        }]
      }]
    }];
  }
});