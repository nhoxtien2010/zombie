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

  var ds = new Ext.data.JsonStore({
    url: '/get_weapon_type',
    root: 'wpType',
    idPropertive: 'id',
    fields: ['id', 'name']
  });

  ds.load();

  var weaponColumns = [{
      header: "ID",
      sortable: true,
      dataIndex: 'id',
      filterable: true
    }, {
      header: "Name",
      sortable: true,
      dataIndex: 'name',
      editor: new fm.TextField({})
    }, {
      header: "Price",
      sortable: true,
      dataIndex: 'price',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Attack",
      sortable: true,
      dataIndex: 'attack',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Speed",
      sortable: true,
      dataIndex: 'speed',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Range",
      sortable: true,
      dataIndex: 'range',
      editor: new fm.NumberField({
        allowBlank: false,
        allowNegative: false,
        maxValue: 1000
      })
    }, {
      header: "Weapon_type",
      sortable: true,
      dataIndex: 'weapon_type',
      editor: new fm.ComboBox({
        store: ds,
        displayField: 'name',
        triggerAction: "all",
        typeAhead: true
      })
    }, {
      header: 'Equip?',
      xtype: 'checkcolumn',
      dataIndex: 'equip',
      editor: new Ext.form.Checkbox({})
    }

  ];

  Ext.QuickTips.init();
  // user RowEditor for editting
  var editor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });

  // create a typical Gridpanel with RowEditor plugin
  var weaponGrid = new Ext.grid.EditorGridPanel({
    // renderTo: 'listing-weapons',
    columnWidth: .7,
    iconCls: 'icon-grid',
    frame: true,
    title: 'Listing weapons',
    height: 300,
    store: store,
    sm: new Ext.grid.RowSelectionModel({
      singleSelect: true,
      listeners: {
        rowselect: function(sm, row, rec) {
          Ext.getCmp("weapon-form").getForm().loadRecord(rec);
        }
      }
    }),

    // plugins: [editor],
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
    }, '-'],
    bbar: new Ext.PagingToolbar({
      pageSize: 25,
      store: store,
      displayInfo: true,
      totalProperty: 'total',
      displayMsg: 'Displaying weapons {0} - {1} of {2}',
      emptyMsg: "No weapons to display",
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
        }, {
          text: 'Save all',
          cls: 'x-btn-text-icon details',
          handler: function(btn, pressed) {
            weaponGrid.getStore().save();
          }
        }
      ]
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
  // onAdd


  function onAdd(btn, ev) {
    var u = new weaponGrid.store.recordType({
      'name': '',
      'attack': '',
      'speed': '',
      'range': '',
      'price': '',
      'weapon_type': '',
      'equip': ''
    });

    editor.stopEditing();
    weaponGrid.store.insert(0, u);
    editor.startEditing(0, 1);
  }

  // onDelete
  function onDelete() {
    var rec = weaponGrid.getSelectionModel().getSelected();
    if (!rec) {
      return false;
    }
    weaponGrid.store.remove(rec);
  }

  var win;
  var zombie_info = new Ext.data.JsonStore({
    url: '/get_zombie_info',
    root: 'zombie',
    fields: ['atrribute', 'value']
  });

  function onShowZombie() {


    zombie_info.load();

     var zombie_form = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        title: 'Zombie Infomation',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',

        items: [{
                fieldLabel: 'Name',
                name: 'name',
                allowBlank:false
            },{
                fieldLabel: 'Bio',
                name: 'bio'
            },{
                fieldLabel: 'Gold',
                name: 'gold'
            }, {
                fieldLabel: 'Birthday',
                name: 'birthday',
            }, {
                fieldLabel: 'Attack',
                name: 'attack',
            }, {
                fieldLabel: 'Defence',
                name: 'defence',
            }, {
                fieldLabel: 'Speed',
                name: 'speed',
            }
        ],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]
    });


    var grid = new Ext.grid.EditorGridPanel({
      region: 'center',
      title: 'Zombie infomation',
      height: 300,
      store: zombie_info,
      columns: [{
        header: "Attribute",
        sortable: true,
        dataIndex: 'atrribute'
      }, {
        header: "Value",
        sortable: true,
        dataIndex: 'value'
      }]
    });
    // create the window on the first click and reuse on subsequent clicks
    win = new Ext.Window({
      renderTo: Ext.getBody(),
      width: 500,
      height: 300,
      closeAction: 'hide',
      layout: 'border',
      plain: true,
      buttons: [{
        text: 'Close',
        handler: function() {
          win.hide();
        }
      }],
      items: [grid]
    });
    win.show(this);
  };


  // panel for support
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
    id: 'weapon-form',
    frame: true,
    title: 'Weapon data',
    bodyStyle: 'padding:5px',
    width: 600,
    layout: 'column',
    items: [ 
      weaponGrid,
    {
      columnWidth: .3,
      xtype: 'fieldset',
      labelWidth: 90,
      title: 'Weapon details',
      layout: 'form',
      defaults: {
        width: 200,
        border: false
      },
      defaultType: 'textfield',
      autoHeight: true,
      bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
      border: false,
      style: {
        "margin-left": "10px",
        "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"
      },
      items: [{
        fieldLabel: 'ID',
        name: 'id'
      }, {
        fieldLabel: 'Name',
        name: 'name'
      }, {
        fieldLabel: 'Price',
        name: 'price'
      }, {
        fieldLabel: 'Attack',
        name: 'attack'
      }, {
        fieldLabel: 'Speed',
        name: 'speed'
      }, {
        fieldLabel: 'Range',
        name: 'range'
      }, {
        fieldLabel: 'Weapon type',
        name: 'weapon_type'
      }, {
        fieldLabel: 'Equip',
        name: 'equip'
      }],
      buttons: [{
        text: 'Save',
        handler: function(){
          // record = this.getRecord();     // get the form record
          form = Ext.getCmp("weapon-form").getForm()
          values = form.getValues();

          var rec = weaponGrid.getStore().getById(values["id"]);
          console.log(rec);
          rec.set('name', values["name"]);
          rec.set('price', values["price"]);
          rec.set('attack', values["attack"]);
          rec.set('speed', values["speed"]);
          rec.set('range', values["range"]);
          rec.set('weapon_type', values["weapon_type"]);
          rec.set('equip', values["equip"]);

          rec.commit();
          rs = [];
          rs << rec;
          weaponGrid.getStore().doTransaction('update',rs, true);


        }
      }]
    }]
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



});