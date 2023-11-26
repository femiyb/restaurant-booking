jQuery(document).ready(function($) {
    // Add an event listener to the booking form submit button
    $('.booking-form').on('submit', function(e) {
        e.preventDefault();

        // Gather form data
        var formData = $(this).serialize();

        // Make an AJAX request
        $.ajax({
            type: 'POST',
            url: restaurant_booking_ajax.ajax_url,
            data: {
                action: 'submit_reservation',
                // Pass additional data from the form as needed
                // Example: date, time, party_size
                // Add field names here
                formData: formData
            },
            success: function(response) {
                if (response.success) {
                    // Reservation was successful
                    alert(response.data.message);
                    // You can also update the UI or perform other actions
                } else {
                    // Reservation failed
                    alert(response.data.message);
                }
            }
        });
    });
});
