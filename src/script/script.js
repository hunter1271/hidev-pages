$(function() {
    console.log('ready');


    $('#job_location').geocomplete({
        language: 'en',
    });

    $( "#job_stack" ).select2({
        theme: "bootstrap",
        allowClear: true,
    });

    var descriptionInput = $("#job_description");

    var toolbarOptions = [
        [{ 'header': [1, 2, 3, false]}],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'bullet' }]
    ];
    var quill = new Quill("#job_description_editor", {
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'Job description here',
        theme: "snow"
    });
    
    quill.on('text-change', function () {
        descriptionInput.val(quill.root.innerHTML);
    })
});