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

$('.deleteForwarding').click(function(e) {
    var id = $(this).data('email');
    var that = this;

    _confirm({
       url: '../api/forwardings/' + id,
       httptype: 'DELETE',
       datatype: 'text',
       title: 'Delete forwarding',
       text: 'Are you sure?',
       ok: 'Delete'
    }).done(function(){
            $(that).closest('.row').remove();
    });
});