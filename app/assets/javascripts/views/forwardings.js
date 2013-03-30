$("#submitNewForwarding").click(function(e) {
    var form = $('#newForwardingForm');
    var data = JSON.stringify(form.serializeObject());

    $.post('../api/forwardings', data, function(response) {
        // TODO: add new forwarding to list
        // ugly hack, see http://stackoverflow.com/questions/11519660/twitter-bootstrap-modal-backdrop-doesnt-disappear
        e.preventDefault();
        $('#newForwarding').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        $('#forwardingsList').append('<div class="row"><div class="span4">' + response.forwarding.source + '</div><div class="span6">' + response.forwarding.destination + '</div><div class="span2"><a href="#"><i class="icon-pencil"></i></a> <a class="deleteForwarding" href="#" data-email="<%= forwarding.source %>"><i class="icon-minus-sign"></i></a></div></div>');

        return false;
    });


    return false;
});

var deleteForwarding = function(email) {
    var that = this;

    $.ajax({
        type: 'DELETE',
        url: '../api/forwardings/' + email,
        dataType: 'text' ,
        success: function(){
            $(that).closest('.row').remove();
        },
        error: function(resp){
            alert(resp);
        }
    });
};

/*

$('#confirmation').bind('show', function() {
    var id = $(this).data('email'),
        removeBtn = $(this).find('.btn-danger');

    removeBtn.click(deleteForwarding(id));

}).modal({ backdrop: true });

$('.deleteForwarding').click(function(e) {
    e.preventDefault();
    var id = $(this).data('email');
    $('#confirmation').data('email', id).modal('show');
}); */