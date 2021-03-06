
WeaponForm = Ext.extend(Ext.form.FormPanel, {
  layout: 'form',
  change_form: false,
  initComponent: function(){

    this.weaponType = new Ext.data.JsonStore({
      autoLoad: true,
      url: '/get_weapon_type',
      root: 'wpType',
      idPropertive: 'id',
      fields: ['id', 'name']
    });
    this.items = this.buildItems();

    WeaponForm.superclass.initComponent.call(this);
  },

  buildItems: function(){
    var wpForm = this;
    return [{
      xtype: 'fieldset',
      labelWidth: 90,
      title: 'Weapon details',
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
        fieldLabel: 'Range',
        allowBlank: false,
        name: 'range'
      }, {
        xtype: 'combo',
        store: this.weaponType,
        displayField: 'name',
        triggerAction: "all",
        typeAhead: true,
        fieldLabel: 'Weapon type',
        allowBlank: false,
        name: 'weapon_type'
      }, {
        xtype: 'radiogroup',
        fieldLabel: 'Equip',
        name: 'equip',
        //arrange Radio Buttons into 2 columns--
        columns: 2,

        items: [{
          xtype: 'radio',
          boxLabel: 'True',
          name: 'equip',
          checked: true,
          allowBlank: false,
          inputValue: 'true'
        }, {
          xtype: 'radio',
          name: 'equip',
          boxLabel: 'False',
          inputValue: 'false'
        }]
      }]
    }];
  }
});