var change_password = function() {
    var form = $('#change_password_form');
    form[0].checkValidity();

    var email = $('#email_field').val();
    var data = JSON.stringify(form.serializeObject());

    // TODO: i18n
    $.post('/api/users/'+email, data,  function(){
            alert('Passwort geändert');
        }
    ).failure(function(response){
            alert(response.responseText);
    });
}

$('#update_password').click(change_password)
