$(function() {
    console.log('ready');


    $('#job_location').geocomplete({
        language: 'en',
    });

    $( "#job_stack" ).select2({
        theme: "bootstrap",
        allowClear: true,
    });
});