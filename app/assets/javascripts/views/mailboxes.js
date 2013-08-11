var deleteMailbox = function() {
    var id = $(this).data('email');
    var that = this;

    _confirm({
        url: '../api/users/' + id,
        httptype: 'DELETE',
        datatype: 'text',
        title: 'Delete forwarding',
        text: 'Are you sure?',
        ok: 'Delete'
    }).done(function(){
            $(that).closest('.row').remove();
        });
};

$('.deleteMailbox').click(deleteMailbox);


var submitNewMailbox = function(){
    var form = $('#newMailboxForm');

        form[0].checkValidity();

        var data = JSON.stringify(form.serializeObject());

        $.post('../api/users', data, function(response) {
            // ugly hack, see http://stackoverflow.com/questions/11519660/twitter-bootstrap-modal-backdrop-doesnt-disappear
            //e.preventDefault();
            $('#newMailboxDialog').modal('hide');
            //$('body').removeClass('modal-open');
            //$('.modal-backdrop').remove();

            var line = $('<div class="row"><div class="span4">' +
                response.user.email + '<div class="span4">' +
                '<a href="#" class="deleteMailbox" data-email="' + response.user.email +'"><i class="icon-minus-sign"></i></a> </div>');

            line.find('.deleteMailbox').click(deleteMailbox);

            $('#mailboxList').append(line);

            return false;
        });

        return false;
};

var newMailbox = function() {
    var template =  $( "#newMailboxTemplate" ).html();
    var dialog = $('#newMailboxDialog');
    dialog.find('.modal-body').html(template);
    var footer = dialog.find('.modal-footer');
    footer.find('.btn-primary').unbind('click');
    footer.find('.btn-cancel').unbind('click');
    footer.find('.btn-primary').on('click', submitNewMailbox);

    dialog.modal('show');
}

$('#newMailbox').click(newMailbox);