Ext.onReady(function() {
  // application instance for showing user-feedback messages.
  var App = new Ext.App({});
  // create httpProxy instannce
  var proxy = new Ext.data.HttpProxy({
    api: {
      read: 'weapons/read',
      create: 'weapons/create',
      update: 'weapons/update',
      destroy: 'weapons/destroy'
    }
  });

  var reader = new Ext.data.JsonReader({
    idProperty: 'id',
    totalProperty: 'total',
    successProperty: 'success',
    root: 'weapons',
    messageProperty: 'message'
  }, [{
    name: 'id'
  }, {
    name: 'name',
    allowBlank: false
  }, {
    name: 'price',
    allowBlank: false
  }, {
    name: 'attack',
    allowBlank: false
  }, {
    name: 'speed',
    allowBlank: false
  }, {
    name: 'range',
    allowBlank: false
  }, {
    name: 'weapon_type',
    allowBlank: false
  }, {
    name: 'equip'
  }]);

  // datawriter component
  var writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: false
  });

  var store = new Ext.data.Store({
    id: 'weapon',
    proxy: proxy,
    reader: reader,
    writer: writer,
    autoSave: false
  });


  store.load({
    params: {
      start: 0,
      limit: 25
    }
  });
  // listen to all DataProxy beforewrite events
  Ext.data.DataProxy.addListener('beforewrite', function(proxy, action) {
    App.setAlert(App.STATUS_NOTICE, "Before" + action);

  });

  // all write events
  Ext.data.DataProxy.addListener('write', function(proxy, action, result, res, rs) {
    App.setAlert(true, action + ':' + res.message);

  });

  // all exeption events
  Ext.data.DataProxy.addListener('exeption', function(proxy, type, action, options, res) {
    App.setAlert(false, "Something bad happend while executing " + action);

  });

  // render columns

  var fm = Ext.form;

  var weaponType = new Ext.data.JsonStore({
    url: '/get_weapon_type',
    root: 'wpType',
    idPropertive: 'id',
    fields: ['id', 'name']
  });

  weaponType.load();

  var weaponColumns = [{
      header: "ID",
      sortable: true,
      dataIndex: 'id',
      filterable: true
    }, {
      header: "Name",
      sortable: true,
      dataIndex: 'name'
    }, {
      header: "Price",
      sortable: true,
      dataIndex: 'price'
    }, {
      header: "Attack",
      sortable: true,
      dataIndex: 'attack'
    }, {
      header: "Speed",
      sortable: true,
      dataIndex: 'speed'
    }, {
      header: "Range",
      sortable: true,
      dataIndex: 'range'
    }, {
      header: "Weapon_type",
      sortable: true,
      dataIndex: 'weapon_type'
    }, {
      header: 'Equip?',
      xtype: 'checkcolumn',
      dataIndex: 'equip'
    }

  ];

  Ext.QuickTips.init();
  // user RowEditor for editting
  var editor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });

  var weapon_rec;

  // create a typical Gridpanel with RowEditor plugin
  var weaponGrid = new Ext.grid.EditorGridPanel({
    // renderTo: 'listing-weapons',
    frame: true,
    title: 'Listing weapons',
    height: 300,
    store: store,
    sm: new Ext.grid.RowSelectionModel({
      singleSelect: true,
      listeners: {
        rowselect: function(sm, row, rec) {
          weapon_rec = rec;
        }
      }
    }),

    columns: weaponColumns,
    tbar: [{
      text: 'Add',
      iconCls: 'silk-add',
      handler: onAdd

    }, '-', {
      text: 'Delete',
      iconCls: 'silk-delete',



      handler: onDelete
    }, '-', {
      text: 'Zombie show',
      iconCls: 'silk-user',
      handler: onShowZombie
    }, '-', {
      text: 'Edit',
      iconCls: 'silk-table-edit ',
      handler: onEdit
    }],
    bbar: new Ext.PagingToolbar({
      pageSize: 25,
      store: store,
      displayInfo: true,
      totalProperty: 'total',
      displayMsg: 'Displaying weapons {0} - {1} of {2}',
      emptyMsg: "No weapons to display",

    }),
    listeners: {
      viewready: function(g) {
        g.getSelectionModel().selectRow(0);
      }
    },
    viewConfig: {
      forceFit: true
    }
  });


  // =============================onAdd=========================

  // create weapon record
  weapon_record = new Ext.data.Record.create([{
    name: "id",
    type: "integer"
  }, {
    name: "name",
    type: "string"
  }, {
    name: "bio",
    type: "string"
  }, {
    name: "attack",
    type: "integer"
  }, {
    name: "speed",
    type: "integer"
  }, {
    name: "defence",
    type: "integer"
  }, {
    name: "birthday",
    type: "date"
  }, {
    name: "gold",
    type: "integer"
  }]);

  function onAdd(btn, ev) {
    new_record = new weapon_record();
    if (!weapon_window) {
      weapon_window = new WeaponWindow({
        id: "weapon_window",
        buildSave: function() {
          if (edit_weapon_value == false) {
            Ext.MessageBox.alert('Warning', 'Nothing to saved!');
          } else {
            // form = Ext.getCmp("weapon_form").getForm()
            form = weapon_window.myForm;
            values = form.getValues();

            new_record.set('name', values["name"]);
            new_record.set('price', values["price"]);
            new_record.set('attack', values["attack"]);
            new_record.set('speed', values["speed"]);
            new_record.set('range', values["range"]);
            new_record.set('weapon_type', values["weapon_type"]);
            new_record.set('equip', values["equip"]);

            weaponGrid.getStore().insert(0, new_record);
            weaponGrid.getStore().save();
            edit_weapon_value = false;
          }
        },
      });
    }
    new_record = new weapon_record();
    weapon_window.myForm.getForm().loadRecord(new_record);
    weapon_window.myForm.getForm().reset();
    weapon_window.show(this);
  }


  // onDelete
  function onDelete() {
    var rec = weaponGrid.getSelectionModel().getSelected();
    if (!rec) {
      return false;
    }
    weaponGrid.store.remove(rec);
  }


  var zombie_window
  var weapon_window;
  var zombie_info = new Ext.data.JsonStore({
    url: '/get_zombie_info',
    root: 'zombie',
    fields: ['id', 'name', 'birthday', 'gold', 'attack', 'defence', 'bio']
  });



  // zombie show to show zombie information in zombie_window
  var zombie_form = new Ext.FormPanel({
    labelWidth: 75,
    layout: 'form',
    frame: true,
    title: 'Zombie information',
    defaultType: 'textfield',

    items: [{
      fieldLabel: 'ID',
      name: 'id',
      disabled: true,
    }, {
      fieldLabel: 'Name',
      name: 'name',
    }, {
      fieldLabel: 'Birthday',
      name: 'birthday',
    }, {
      fieldLabel: 'Gold',
      name: 'gold'
    }, {
      fieldLabel: 'Attack',
      name: 'attack'
    }, {
      fieldLabel: 'Defence',
      name: 'defence',
    }, {
      fieldLabel: 'Bio',
      name: 'bio'
    }]
  });

  // onshow zombie zombie_window
  zombie_info.load();

  function onShowZombie() {
    if (!zombie_window) {
      zombie_window = new Ext.Window({
        renderTo: Ext.getBody(),
        width: 500,
        height: 300,
        closeAction: 'hide',
        layout: 'fit',
        plain: true,
        buttons: [{
          text: 'Close',
          handler: function() {
            zombie_window.hide();
          }
        }],
        items: [zombie_form]
      });
    }

    zombie_form.getForm().loadRecord(zombie_info.getAt(0));
    zombie_window.show(this);
  }


  function onEdit() {
    if (typeof weapon_rec === 'undefined') {
      Ext.MessageBox.alert('Warning', 'Please select Record Weapon to edit first!!');
    } else {
      if (!weapon_window) {
        weapon_form = new WeaponForm({
          weaponType: weaponType
        });
        weapon_window = new Ext.user.weapon_window({
          function() {
            if (edit_weapon_value == false) {
              Ext.MessageBox.alert('Warning', 'Nothing to saved!');
            } else {
              form = Ext.getCmp("weapon_form").getForm()
              values = form.getValues();

              weapon_rec.set('name', values["name"]);
              weapon_rec.set('price', values["price"]);
              weapon_rec.set('attack', values["attack"]);
              weapon_rec.set('speed', values["speed"]);
              weapon_rec.set('range', values["range"]);
              weapon_rec.set('weapon_type', values["weapon_type"]);
              weapon_rec.set('equip', values["equip"]);

              weaponGrid.getStore().insert(0, new_record);
              weaponGrid.getStore().save();
              edit_weapon_value = false;
            }
          },
          buildItems: [weapon_form]
        });
        weapon_form.getForm().loadRecord(weapon_rec);
        weapon_window.show(this);
      }
    }
  }

  var edit_weapon_value = false;
  var new_record;
  var weapon_form;



  // panel for support
  // =================================================================================================
  var supports = new Ext.data.JsonStore({
    url: '/get_support',
    root: 'supports',
    idPropertive: 'id',
    fields: ['id', 'name', 'price', 'attack', 'speed', 'defence', 'equip']
  });

  var supportColumns = [{
      header: "ID",
      width: 40,
      sortable: true,
      dataIndex: 'id'
    }, {
      header: "Name",
      width: 100,
      sortable: true,
      dataIndex: 'name',
      editor: new fm.TextField({})
    }, {
      header: "Price",
      width: 60,
      sortable: true,
      dataIndex: 'price',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Attack",
      width: 60,
      sortable: true,
      dataIndex: 'attack',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Speed",
      width: 60,
      sortable: true,
      dataIndex: 'speed',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Defence",
      width: 60,
      sortable: true,
      dataIndex: 'defence',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: 'Equip?',
      xtype: 'checkcolumn',
      dataIndex: 'equip',
      width: 55,
      editor: new Ext.form.Checkbox({})
    }

  ];

  supports.load({
    params: {
      start: 0,
      limit: 25
    }
  });

  var editor1 = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });



  var supportsGrid = new Ext.grid.GridPanel({
    iconCls: 'icon-grid',
    title: 'Listing supports',
    height: 300,

    store: supports,
    columns: supportColumns,
    tbar: [{
      text: 'Add',
      iconCls: 'silk-add',

    }, '-', {
      text: 'Delete',
      iconCls: 'silk-delete',
      // handler: onDelete
    }, '-', {
      text: 'Zombie show',
      iconCls: 'silk-user',
      handler: onShowZombie
    }, '-'],
    bbar: new Ext.PagingToolbar({
      pageSize: 25,
      store: store,
      displayInfo: true,
      totalProperty: 'total',
      displayMsg: 'Displaying weapons {0} - {1} of {2}',
      emptyMsg: "No supports to display",
      items: [
        '-', {
          pressed: true,
          enableToggle: true,
          text: 'Show Preview',
          cls: 'x-btn-text-icon details',
          toggleHandler: function(btn, pressed) {
            var view = grid.getView();
            view.showPreview = pressed;
            view.refresh();
          }
        }
      ]
    }),
    viewConfig: {
      forceFit: true
    }
  });

  var gridForm = new Ext.FormPanel({
    frame: true,
    title: 'Weapon data',
    bodyStyle: 'padding:5px',
    width: 600,
    layout: 'column',
    items: [weaponGrid]
  });

  var tabs = new Ext.TabPanel({
    renderTo: 'tabs1',
    activeTab: 0,
    frame: true,
    defaults: {
      autoHeight: true
    },
    items: [
      gridForm,
      supportsGrid
    ]
  });
})