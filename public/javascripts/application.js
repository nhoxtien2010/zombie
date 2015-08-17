// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


jQuery(document).ready(function(){


  jQuery("#new_link").click(function(){
    jQuery.ajax({
      url: "/zombies/new",
      type: "POST",
      dataType: "json",
      success: function(result){
        jQuery('#myModal').modal('show');
        jQuery('input#zombie_name').val('');
        jQuery('#zombie_bio').val('');
        jQuery('input#zombie_age').val('');
        jQuery('div#error');
      }
    });
  });

  // #######################login############################

  jQuery("#login").click(function(){
    jQuery.ajax({
      url: "login/login",
      type: "POST",
      data: {login:{name: jQuery('#zombieName').val(), pass: jQuery("#zombiePass").val() }},
      // dataType: 'json',
      success: function(result){
        if (result.success == true){
          alert('Login successfully!');
          window.location.href = "http://localhost:3000/zombies"}
        else{
          alert('Zombie name or Password wrong!');
        }
      }
    });
  });

  jQuery("#new_zombie").on("ajax:success", function(e, data, status, xhr){
    if(data.success)
    {
      jQuery('#myModal').modal('hide');
      var insert = '<tr id="'+data.zombie_id+'">'
      insert = insert +'<td>'+jQuery('input#zombie_name').val()+'</td>'
      insert = insert +'<td>'+jQuery('#zombie_bio').val()+'</td>'
      insert = insert +'<td>'+jQuery('input#zombie_age').val()+'</td>'
      insert = insert +'<td><a href="/zombies/'+data.zombie_id+'/edit" data-remote="true">Edit</a></td>'
      insert = insert +'<td><a href="/zombies/'+data.zombie_id+'" data-confirm="Are you sure?" data-method="delete" data-remote="true" rel="nofollow">Destroy</a>'
      insert = insert +'</td><td><a href="/zombies/'+data.zombie_id+'/tweets" data-remote="true">Show Tweets</a></td>'
      insert = insert +'<td><a href="/zombies/'+data.zombie_id+'/tweets/new" data-remote="true">Create Tweets</a></td>'
      insert = insert +'</tr>';
      jQuery('.zombies_table').append(insert);
      alert("zombie has created successfully!!");


    }
    else
    {
      for (var i = 0; i < data.errors.length; i++) {
        jQuery('div#error').append('<p>'+data.errors[i]+'</p>');
      }

    }
  });

  jQuery("#new_zombie").bind("ajax:error", function(xhr, data, status){
    alert('Some thing went wrong!!');

  });





});

