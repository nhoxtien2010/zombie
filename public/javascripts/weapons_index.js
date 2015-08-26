
// application instance for showing user-feedback messages.

  var App = new Ext.App({});
// create httpProxy instannce
var proxy =  new Ext.data.HttpProxy({
  api: {
    read: 'weapons/read',
    create: 'weapons/create',
    update: 'weapons/update',
    destroy: 'weapons/destroy'
  }
});

var reader = new Ext.data.JsonReader({
  idPropertive: 'id',
  totalProperty: 'total',
  successProperty: 'success',
  root: 'weapons',
  messageProperty: 'message'
},[
  {name: 'id'},
  {name: 'name'},
  {name: 'price'},
  {name: 'attack'},
  {name: 'speed'},
  {name: 'range'},
  {name: 'weapon_type'},
  {name: 'equip'}
]);

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
  autoSave: true
});


store.load({params:{start:0, limit:25}});
// listen to all DataProxy beforewrite events
Ext.data.DataProxy.addListener('beforewrite', function(proxy,action){
  App.setAlert(App.STATUS_NOTICE, "Before"+action);

});

// all write events
Ext.data.DataProxy.addListener('write', function(proxy,action,result,res,rs){
  App.setAlert(true, action+ ':'+res.message);

});

// all exeption events
Ext.data.DataProxy.addListener('exeption', function(proxy,type,action,options,res){
  App.setAlert(false, "Something bad happend while executing "+action);

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

var weaponColumns = [
  {header: "ID", width: 40, sortable: true, dataIndex: 'id'},
  {header: "Name", width: 100, sortable: true, dataIndex: 'name', editor: new fm.TextField({})},
  {header: "Price", width: 60, sortable: true, dataIndex: 'price', editor: new fm.NumberField({ allowBlank: false, allowNegative: false, maxValue: 1000})},
  {header: "Attack", width: 60, sortable: true, dataIndex: 'attack', editor: new fm.NumberField({ allowBlank: false, allowNegative: false, maxValue: 1000})},
  {header: "Speed", width: 60, sortable: true, dataIndex: 'speed', editor: new fm.NumberField({ allowBlank: false, allowNegative: false, maxValue: 1000})},
  {header: "Range", width: 60, sortable: true, dataIndex: 'range', editor: new fm.NumberField({ allowBlank: false, allowNegative: false, maxValue: 1000})},
  {header: "Weapon_type", width: 60, sortable: true, dataIndex: 'weapon_type', editor: new fm.ComboBox({store: ds, displayField:'name', typeAhead: false })},
  {header: "Equip", width: 60, sortable: true, dataIndex: 'equip'}

];

Ext.onReady(function(){

  Ext.QuickTips.init();
  // user RowEditor for editting
  var editor = new Ext.ux.grid.RowEditor({
    saveText: 'Update'
  });

  // create a typical Gridpanel with RowEditor plugin
  var weaponGrid = new Ext.grid.GridPanel({
    renderTo: 'listing_weapons',
    iconCls: 'icon-grid',
    frame: true,
    title: 'Listing weapons',
    height: 300,
    store: store,
    plugins: [editor],
    columns: weaponColumns,
    tbar: [{
      text: 'Add',
      iconCls: 'silk-add',
      handler: onAdd

    }, '-', {
      text: 'Delete',
      iconCls: 'silk-delete',
      handler: onDelete
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
        }
      ]
    }),
    viewConfig: {
      forceFit: true
    }
  });
  // onAdd

  function onAdd(btn,ev){
    var u = new weaponGrid.store.recordType({
      'Name' : '',
      'Attack' : 0,
      'Speed' : 0,
      'Range' : 0,
      'Price' : 0,
      'Weapon_type' : '',
      'Equip' : false
    });
    editor.stopEditing();
    weaponGrid.store.insert(0,u);
    editor.startEditing(0);
  }

  // onDelete
  function onDelete()
  {
    var rec = weaponGrid.getSelectionModel().getSelected();
    if(!rec){
      return false;
    }
    weaponGrid.store.remove(rec);
  }
});


// Ext.onReady(function(){

  // var store = new Ext.data.JsonStore({
  //   url: '/get_index',
  //   root: 'weapons',
  //   idPropertive: 'id',
  //   fields: ['id', 'name', 'price', 'attack', 'speed', 'range', 'weapon_type', 'equip']
  // });

//     // pluggable renders
//     function renderEquip(value){
//       if(value == true)
//         return String.format('<b style = "color:red;"> '+value+'</b>');
//       else 
//         return String.format('<b style = "color:green;"> '+value+'</b>');
//     };
//     var grid = new Ext.grid.EditorGridPanel({
//         width:1000,
//         height:400,
//         title:'Listing Weapons',
//         store: store,
//         stripeRows: true,
//         autoExpandColumn: 'name-col',
//         trackMouseOver:false,
//         disableSelection:true,
//         loadMask: true,

//         // grid columns
//         columns:[{
//             id: 'id-col', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
//             header: "ID",
//             dataIndex: 'id',
//             width: 20,
//             sortable: true,
//             align: 'center'
//         },{
//             id: 'name-col',
//             header: "Name",
//             dataIndex: 'name',
//             sortable: true,
//             editor: new Ext.form.TextField({
//                 allowBlank: false
//             })
//         },{
//             header: "Price",
//             dataIndex: 'price',
//             width: 60,
//             sortable: true
//         },{
//             header: "Attack",
//             dataIndex: 'attack',
//             width: 60,
//             sortable: true
//         },{
//             header: "Speed",
//             dataIndex: 'speed',
//             width: 60,
//             sortable: true
//         },{
//             header: "Range",
//             dataIndex: 'range',
//             width: 60,
//             sortable: true
//         },{
//             header: "Weapon_type",
//             dataIndex: 'weapon_type',
//             width: 60,
//             sortable: true
//         },{
//             header: "Equip",
//             dataIndex: 'equip',
//             width: 60,
//             renderer: renderEquip,
//             sortable: true
//         }],

//         // customize view config
//         viewConfig: {
//             forceFit:true,
//             enableRowBody:true,
//             showPreview:true
//         },

//         // paging bar on the bottom
//          // paging bar on the bottom
       
//     });

//    // render it
//     grid.render('listing-weapons');

//     // trigger the data store load
//     

//     var button = Ext.get('show-btn');

//     button.on('click', function(e){
//       Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(){
//         alert('MessageBox closed')
//       });
//     });

//     });
