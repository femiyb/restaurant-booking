jQuery(document).ready(function($) {
    // Delete Reservation Action
    $('.delete-reservation').on('click', function(e) {
        e.preventDefault();

        var reservationId = $(this).data('reservation-id');
        
        // Confirm the deletion with the user (you can customize this)
        var confirmDelete = confirm('Are you sure you want to delete this reservation?');

        if (confirmDelete) {
            // AJAX request to delete reservation
            $.ajax({
                type: 'POST',
                url: reservationAjax.ajaxurl,
                data: {
                    action: 'delete_reservation',
                    reservation_id: reservationId,
                },
                success: function(response) {
                    if (response.success) {
                        // Reservation deleted successfully, you can update the UI here
                        alert('Reservation deleted successfully.');
                        // Reload the page or update the reservation list as needed
                        location.reload();
                    } else {
                        alert('Failed to delete reservation: ' + response.data.message);
                    }
                },
                error: function(error) {
                    alert('Error: ' + error.statusText);
                }
            });
        }
    });
});


