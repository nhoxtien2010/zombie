// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


jQuery(document).ready(function(){

  jQuery('#zombie_info_btn').click(function(){
    jQuery('#zombie_info').modal('show');
  });

  jQuery('#login_modal').modal({backdrop: 'static', keyboard: false});

  // jQuery('[data-toggle="dropdown"]').parent().removeClass('open');

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


  //############# buy click ####################################

  jQuery(".buy").click(function(){

    var weapon_string = jQuery(this).closest('tr').attr('id');
    var weapon_id = weapon_string.split("_")[1];
    var current_position = jQuery(this);

    jQuery.ajax({
      url: "/weapons/buy",
      type: "POST",
      dataType: "json",
      data: {weapon_id: weapon_id },
      success: function(result){
        if(result.success == true)
        {
          alert("Buy successfully!");

          current_position.closest('tr').css('color','red');
          current_position.addClass('disabled');
          jQuery('#'+weapon_string + ' .unequip').removeClass('disabled');

          // update zombie gold
          zombie_gold = parseInt(jQuery('#zombie_gold').html());
          weapon_price =parseInt(jQuery('#'+weapon_string + ' .weapon_price').html());
          jQuery('#zombie_gold').html(zombie_gold - weapon_price);

          // update zombie attack
          zombie_attack = parseInt(jQuery('#zombie_attack').html());
          weapon_attack =parseInt(jQuery('#'+weapon_string + ' .weapon_attack').html());
          jQuery('#zombie_attack').html(zombie_attack + weapon_attack);

          // update zombie speed
          zombie_speed = parseInt(jQuery('#zombie_speed').html());
          weapon_speed =parseInt(jQuery('#'+weapon_string + ' .weapon_speed').html());
          jQuery('#zombie_speed').html(zombie_speed + weapon_speed);
        }
        else
        {
          alert("You have not enough gold to buy this weapon.")
        }
      }
    });
  });

// #######################wear############################

jQuery(".wear").click(function(){

    var support_string = jQuery(this).closest('tr').attr('id');
    var support_id = support_string.split("_")[1];
    var current_position = jQuery(this);

    jQuery.ajax({
      url: "/supports/wear",
      type: "POST",
      dataType: "json",
      data: {support_id: support_id },
      success: function(result){
        if(result.success == true)
        {
          alert("Buy Support successfully!");

          current_position.closest('tr').css('color','red');
          current_position.addClass('disabled');
          jQuery('#'+support_string + ' .unwear').removeClass('disabled');

          // update zombie gold
          zombie_gold = parseInt(jQuery('#zombie_gold').html());
          support_price =parseInt(jQuery('#'+support_string + ' .support_price').html());
          jQuery('#zombie_gold').html(zombie_gold - support_price);
          

          // update zombie attack
          zombie_attack = parseInt(jQuery('#zombie_attack').html());
          support_attack =parseInt(jQuery('#'+support_string + ' .support_attack').html());
          jQuery('#zombie_attack').html(zombie_attack + support_attack);
          

          // update zombie speed
          zombie_speed = parseInt(jQuery('#zombie_speed').html());
          support_speed =parseInt(jQuery('#'+support_string + ' .support_speed').html());
          jQuery('#zombie_speed').html(zombie_speed + support_speed);
          

          // update zombie defence
          zombie_denfence = parseInt(jQuery('#zombie_denfence').html());
          support_defence =parseInt(jQuery('#'+support_string + ' .support_defence').html());
          jQuery('#zombie_denfence').html(zombie_denfence + support_defence);
          
        }
        else
        {
          alert("You have not enough gold to buy this support.")
        }
      }
    });
  });



// ####################### unwear click ############################
jQuery(".unwear").click(function(){

    var support_string = jQuery(this).closest('tr').attr('id');
    var support_id = support_string.split("_")[1];
    var current_position = jQuery(this);

    jQuery.ajax({
      url: "/supports/unwear",
      type: "POST",
      dataType: "json",
      data: {support_id: support_id },
      success: function(result){
        if(result.success == true)
        {
          alert("Unwear Support successfully!");

          current_position.closest('tr').css('color','black');
          current_position.addClass('disabled');
          jQuery('#'+support_string + ' .wear').removeClass('disabled');

          // update zombie attack
          zombie_attack = parseInt(jQuery('#zombie_attack').html());
          support_attack =parseInt(jQuery('#'+support_string + ' .support_attack').html());
          jQuery('#zombie_attack').html(zombie_attack - support_attack);

          // update zombie speed
          zombie_speed = parseInt(jQuery('#zombie_speed').html());
          support_speed =parseInt(jQuery('#'+support_string + ' .support_speed').html());
          jQuery('#zombie_speed').html(zombie_speed - support_speed);

          // update zombie defence
          zombie_denfence = parseInt(jQuery('#zombie_denfence').html());
          support_defence =parseInt(jQuery('#'+support_string + ' .support_defence').html());
          jQuery('#zombie_denfence').html(zombie_denfence - support_defence);
        }
        else
        {
          alert("Opps, Some thing went wrong.")
        }
      }
    });
  });



// #######################unequip click ############################
jQuery(".unequip").click(function(){

    var weapon_string = jQuery(this).closest('tr').attr('id');
    var weapon_id = weapon_string.split("_")[1];
    var current_position = jQuery(this);

    jQuery.ajax({
      url: "/weapons/unequip",
      type: "POST",
      dataType: "json",
      data: {weapon_id: weapon_id },
      success: function(result){
        if(result.success == true)
        {
          alert("Unequip successfully!");

          current_position.closest('tr').css('color','black');
          current_position.addClass('disabled');
          jQuery('#'+weapon_string + ' .buy').removeClass('disabled');

          // update zombie attack
          zombie_attack = parseInt(jQuery('#zombie_attack').html());
          weapon_attack =parseInt(jQuery('#'+weapon_string + ' .weapon_attack').html());
          jQuery('#zombie_attack').html(zombie_attack - weapon_attack);

          // update zombie speed
          zombie_speed = parseInt(jQuery('#zombie_speed').html());
          weapon_speed =parseInt(jQuery('#'+weapon_string + ' .weapon_speed').html());
          jQuery('#zombie_speed').html(zombie_speed - weapon_speed);
        }
        else
        {
          alert("Opps, Some thing went wrong.")
        }
      }
    });
  });


  // #######################random ############################

  jQuery("#random_zombie").click(function(){
    jQuery('#random_zombie_modal').modal("show");
  });


  jQuery("#random_zombie_btn").click(function(){
    jQuery.ajax({
      url: "/zombies/random_zombie",
      type: "POST",
      data: {number_zombies: jQuery('#number_zombies').val()},
      success: function(result){
        alert("success");
      }
    });
  });

  // #######################login############################

  fill_zombie = function(result)
  {
    jQuery('#zombie_name').html(result.name);
    jQuery('#zombie_bio').html(result.bio);
     jQuery('#zombie_birthday').html(result.birthday);
    jQuery('#zombie_gold').html(result.gold) ;
    jQuery('#zombie_attack').html(result.attack) ;
    jQuery('#zombie_denfence').html(result.defence);
    jQuery('#zombie_speed').html(result.speed);
  }



  jQuery("#login").click(function(){
    jQuery.ajax({
      url: "login/login",
      type: "POST",
      data: {login:{name: jQuery('#zombieName').val(), pass: jQuery("#zombiePass").val() }},
      // dataType: 'json',
      success: function(result){
        if (result.success == true){
          jQuery('#login_modal').modal('hide');
          alert('Login successfully!');
          window.location.replace("http://localhost:3000/weapons");
          // fill_zombie(result.zombie);

          // jQuery('.main').append(modal_info);
          // jQuery('#zombie_info_btn').click(function(){
          //   jQuery('#zombie_info')
          // });
          insert = '<img src="images/zombie.jpg" class="img-rounded" alt="zombie image" width="50" height="50">';


          jQuery('.navbar-right').append(insert);
          // jQuery.append

          // for(var i =0 ; i< result.weapons.length; i++)
          // {
          //   jQuery('#weapon_'+result.weapons[i].id).css('color','red');
          //   jQuery('#weapon_'+result.weapons[i].id +' .buy').addClass('disabled');
          //   jQuery('#weapon_'+result.weapons[i].id +' .unequip').removeClass('disabled');
          // }

        }
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

