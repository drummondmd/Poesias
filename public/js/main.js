$("#new-btn" ).on( "click", function() {
    $("#new").toggle()
    $("#edit-btn").toggle()
    $("#new-btn").toggle()

} );
$("#edit-btn" ).on( "click", function() {
    $("#edit").toggle()
    $("#new-btn").toggle()
    $("#edit-btn").toggle()
} );

$(".heart" ).on( "click", function() {
    $(".heart").children().attr("fill", "red"); 
    $.post("/likes",{id:this.id})
// tentar acrescentar curtida a base de dados depois
} );