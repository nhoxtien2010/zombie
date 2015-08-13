// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


jQuery(document).ready(function(){
  jQuery("#new_link").click(function(){
    jQuery.ajax({
      url: "/zombies/new",
      type: "POST",
      data: {},
      success: function(resp){ alert(" ok"); }
    });
  });


  jQuery('#close_model').click(function(){
    jQuery('#myModal').modal('hide');
  });

  $('#myModal').on('hidden', function(){
    $(this).data('modal', null);
});
});
