$(function() {
    console.log('ready');


    $('#job_location').geocomplete({
        language: 'en',
    });

    $( "#job_stack" ).select2({
        theme: "bootstrap",
        allowClear: true,
    });

    var editorConfig = {
        toolbar: [ 'headings', 'bold', 'italic', 'bulletedList', 'numberedList' ],
        heading: {
            options: [
                { modelElement: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { modelElement: 'heading', viewElement: 'h5', title: 'Heading', class: 'ck-heading_heading2' },
            ]
        },
        removePlugins: [ 'Link' ]
    };

    ClassicEditor
        .create(document.querySelector('#job_description'), editorConfig)
        .then(function (editor) {
            console.log(editor);
        })
        .catch(function (error) {
            console.log(error);
        });
});