// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


jQuery(document).ready(function(){
  jQuery("#new_link").click(function(){
    jQuery.ajax({
      url: "/zombies/new",
      type: "POST",
      dataType: "json",
      success: function(resp){
        alert('successfully');
      }
    });
  });
});
