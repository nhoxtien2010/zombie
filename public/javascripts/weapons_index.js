




// Ext.onReady(function() {
//   var grid = new Ext.grid.GridPanel({
//     title: 'Listing Weapons',
//     store: store,
//     columns: [{
//       header: "ID",
//       width: 30,
//       dataIndex: 'id',
//       sortable: true
//     }, {
//       header: "name",
//       id: 'name-col',
//       width: 75,
//       dataIndex: 'name',
//     }, {
//       header: "price",
//       width: 75,
//       dataIndex: 'price',
//       align: 'center'
//     }, {
//       header: "attack",
//       width: 75,
//       dataIndex: 'attack',
//       align: 'center'
//     }, {
//       header: "speed",
//       width: 75,
//       dataIndex: 'speed',
//       align: 'center'
//     }, {
//       header: "range",
//       width: 75,
//       dataIndex: 'range',
//       align: 'center'
//     }, {
//       header: "weapon_type",
//       width: 75,
//       dataIndex: 'weapon_type',
//       align: 'center'
//     }, {
//       header: "equip",
//       width: 75,
//       dataIndex: 'equip',
//       align: 'center'
//     }],
//     autoExpandColumn: 'name-col',
//     renderTo: 'listing-weapons',
//     width: 1000,
//     height: 400,
//     loadMask: true
//   });
//   store.load();
// });


Ext.onReady(function(){

  var store = new Ext.data.JsonStore({
    url: '/get_index',
    root: 'weapons',
    idPropertive: 'id',
    fields: ['id', 'name', 'price', 'attack', 'speed', 'range', 'weapon_type', 'equip']
  });

    // pluggable renders
    function renderEquip(value){
      if(value == true)
        return String.format('<b style = "color:red;"> '+value+'</b>');
      else 
        return String.format('<b style = "color:green;"> '+value+'</b>');
    };
    var grid = new Ext.grid.GridPanel({
        width:1000,
        height:400,
        title:'Listing Weapons',
        store: store,
        stripeRows: true,
        autoExpandColumn: 'name-col',
        trackMouseOver:false,
        disableSelection:true,
        loadMask: true,

        // grid columns
        columns:[{
            id: 'id-col', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
            header: "ID",
            dataIndex: 'id',
            width: 20,
            sortable: true,
            align: 'center'
        },{
            id: 'name-col',
            header: "Name",
            dataIndex: 'name',
            sortable: true
        },{
            header: "Price",
            dataIndex: 'price',
            width: 60,
            sortable: true
        },{
            header: "Attack",
            dataIndex: 'attack',
            width: 60,
            sortable: true
        },{
            header: "Speed",
            dataIndex: 'speed',
            width: 60,
            sortable: true
        },{
            header: "Range",
            dataIndex: 'range',
            width: 60,
            sortable: true
        },{
            header: "Weapon_type",
            dataIndex: 'weapon_type',
            width: 60,
            sortable: true
        },{
            header: "Equip",
            dataIndex: 'equip',
            width: 60,
            renderer: renderEquip,
            sortable: true
        }],

        // customize view config
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true
        },

        // paging bar on the bottom
         // paging bar on the bottom
        bbar: new Ext.PagingToolbar({
            pageSize: 25,
            store: store,
            displayInfo: true,
            totalProperty: 'total_weapons',
            displayMsg: 'Displaying weapons {0} - {1} of {2}',
            emptyMsg: "No weapons to display",
            items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]
        })
    });

   // render it
    grid.render('listing-weapons');

    // trigger the data store load
    store.load({params:{start:0, limit:25}});
});
