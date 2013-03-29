$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$("#submitNewForwarding").click(function(e) {
    var form = $('#newForwardingForm');
    var data = JSON.stringify(form.serializeObject());
    $.post('../api/forwardings', data, function(response) {
        // TODO: add new forwarding to list
        e.preventDefault();
        $('#newForwarding').modal('hide');

    });


    return false;
});