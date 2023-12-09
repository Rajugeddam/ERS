// code for control the page of the while deleting the review

let deleteEmployee = function(deleteLink){
    $.ajax({
        type: "get",
        url: $(deleteLink).prop('href'),
        success: function(data){
            $(deleteLink).closest('.emp-view').remove()
            new Noty({
                theme:"relax",
                text: data.message,
                type: "success",
                layout: "topRight",
                timeout: 1500
            }).show();
        },error: function(error){
            console.log("Error", error)
        }
    })
}

// call the deleteReview function

$(document).ready(function(){
    $('.delete-employee').click(function(e){
        e.preventDefault();
        deleteEmployee(this);
    })
})