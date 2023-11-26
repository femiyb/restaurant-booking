<?php
namespace RestaurantBooking;

// Include WordPress core for access to functions like wp_insert_post()
require_once(ABSPATH . 'wp-admin/includes/post.php');

// Include your ReservationManager and other necessary files
require_once(plugin_dir_path(__FILE__) . 'includes/ReservationManager.php');

// Define an AJAX action for submitting reservations
add_action('wp_ajax_submit_reservation', __NAMESPACE__ . '\submit_reservation');
add_action('wp_ajax_nopriv_submit_reservation', __NAMESPACE__ . '\submit_reservation');

// AJAX callback function for submitting reservations
function submit_reservation() {
    // Implement reservation submission logic here
    // You can retrieve data from the AJAX request and process the reservation
    // Example: Create a reservation using ReservationManager::createReservation()

    // Send a response back to the frontend
    if ($Reservation_SucessResponse) {
        wp_send_json_success(array('message' => 'Reservation successful!'));
    } else {
        wp_send_json_error(array('message' => 'Reservation failed.'));
    }

    // Make sure to exit after sending the response
    wp_die();
}
