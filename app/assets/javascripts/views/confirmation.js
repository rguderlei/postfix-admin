/**

 source https://gist.github.com/rudyryk/2894223

 Copyright (C) 2012 Alexey Kinyov <rudy@05bit.com>

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the Software
 is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 Documentation
 =============

 This snippet provides nice, easy to use and flexible confirmation
 dialog for Twitter Bootstrap.

 Requirements
 ------------

 jQuery >= 1.7, Twitter Bootstrap

 How it works
 ------------

 You call ``_confirm`` function with parameters, it returns $.Deferred
 object, so you can bind ``done`` and ``fail`` handlers to it.

 The modal dialog will be shown with 'Ok' and 'Cancel' buttons.
 When pressing 'Ok', ajax call of specified url with specified
 data is made.

 Example of usage
 ----------------

 _confirm({
		url: '/delete/',
		data: {object_id: 1},
		title: 'Please, confirm deleting!',
		text: 'The record will be completelly removed! Is it ok?',
		ok: 'Remove',
		cancel: 'Cancel'
	}).done(function() {
		// your optional refresh page code
	}).fail(function() {
		// your optional alert code
	});

 */
function _confirm(options) {
    if (!options) { options = {}; }

    var show = function(el, text) {
        if (text) { el.html(text); el.show(); } else { el.hide(); }
    }

    var url = options.url ? options.url : '';
    var data = options.data ? options.data : '';
    var datatype = options.datatype ? options.datatype : 'json';
    var httptype = options.httptype ? options.httptype : 'POST';

    var ok = options.ok ? options.ok : 'Ok';
    var cancel = options.cancel ? options.cancel : 'Cancel';
    var title = options.title
    var text = options.text;
    var dialog = $('#confirm-dialog');
    var header = dialog.find('.modal-header');
    var footer = dialog.find('.modal-footer');

    show(dialog.find('.modal-body'), text);
    show(dialog.find('.modal-header h3'), title);
    footer.find('.btn-danger').unbind('click').html(ok);
    footer.find('.btn-cancel').unbind('click').html(cancel);

    dialog.modal('show');

    var $deferred = $.Deferred();
    var is_done = false;
    footer.find('.btn-danger').on('click', function(e) {
        is_done = true;
        dialog.modal('hide');
        if (url) {
            $.ajax({
                url: url,
                data: data,
                type: httptype,
                dataType: datatype,
            }).done(function(result) {
                    $deferred.resolve(result);
                }).fail(function() {
                    $deferred.reject();
                });
        } else {
            $deferred.resolve();
        }
    });
    dialog.on('hide', function() {
        if (!is_done) { $deferred.reject(); }
    })

    return $deferred.promise();
}