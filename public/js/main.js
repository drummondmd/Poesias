$("#new-btn" ).on( "click", function() {
    $("#new").toggle()
    $("#edit-btn").toggle()

} );
$("#edit-btn" ).on( "click", function() {
    $("#edit").toggle()
    $("#new-btn").toggle()
} );

$("#heart" ).on( "click", function() {
    $("#heart").attr("fill", "red"); 
// tentar acrescentar curtida a base de dados depois
} );