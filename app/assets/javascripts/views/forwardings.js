var submitNewForwarding = function() {
    var form = $('#newForwardingForm');

    form.checkValidity();

    var data = JSON.stringify(form.serializeObject());

    $.post('../api/forwardings', data, function(response) {
        // ugly hack, see http://stackoverflow.com/questions/11519660/twitter-bootstrap-modal-backdrop-doesnt-disappear
        //e.preventDefault();
        $('#newForwardingDialog').modal('hide');
        //$('body').removeClass('modal-open');
        //$('.modal-backdrop').remove();

        var line = $('<div class="row"><div class="span4">' +
            response.forwarding.source + '</div><div class="span6 editable">' +
            response.forwarding.destination +
            '</div><div class="span2"><a class="editForwarding" data-email="' +
            response.forwarding.source +
            '"><i class="icon-pencil"></i></a> <a class="deleteForwarding" href="#" data-email="' +
            response.forwarding.source
            + '"><i class="icon-minus-sign"></i></a></div></div>');
        line.find('.editForwarding').click(editForwarding);
        line.find('.deleteForwarding').click(deleteForwarding);

        $('#forwardingsList').append(line);

        return false;
    });

    return false;
};

var deleteForwarding = function() {
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
};

$('.deleteForwarding').click(deleteForwarding);

var cancelEditing = function(){
    var destination = $(this).closest('.row').find('.editable');
    var destValue = $(this).data('destination');

    destination.empty();
    destination.text(destValue);
};

var saveEditing = function(){
    var source = $(this).data('email');
    var destLocation = $(this).closest(".row").find(".editable");
    var form = $(this).closest(".form-inline")
    form[0].checkValidity();
    var data = form.serializeObject();
    data.source = source;

    $.post('../api/forwardings/' + source, JSON.stringify(data), function(response) {
        destLocation.empty();
        destLocation.text(data.destination);
    }, 'text');
};

var editForwarding = function(){
    var destination = $(this).closest('.row').find('.editable');
    var destValue = destination.text();
    var sourceValue = $(this).data('email');

    destination.empty();
    var template = $( "#forwardingEditTemplate" ).html()
    var processedTemplate = template.format( sourceValue, destValue);
    destination.append(processedTemplate);
    destination.find(".btn-primary").click(saveEditing);
    destination.find(".btn-secondary").click(cancelEditing);
}

$('.editForwarding').click(editForwarding);

var newForwarding = function() {
    var template =  $( "#newForwardingTemplate" ).html();
    var dialog = $('#newForwardingDialog');
    dialog.find('.modal-body').html(template);
    var footer = dialog.find('.modal-footer');
    footer.find('.btn-primary').unbind('click');
    footer.find('.btn-cancel').unbind('click');
    footer.find('.btn-primary').on('click', submitNewForwarding);

    dialog.modal('show');
}

$('#newForwarding').click(newForwarding);