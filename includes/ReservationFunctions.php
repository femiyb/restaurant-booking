<?php
namespace RestaurantBooking\Includes;

// Define reservation-related functions

/**
 * Create a new reservation.
 *
 * @param array $reservation_data An array of reservation data.
 * @return int|WP_Error The reservation ID if successful, WP_Error on failure.
 */

class ReservationFunctions {

public function __construct() {
    add_action('init', array($this, 'process_reservation_form'));
}

/**
 * Retrieve a list of reservations.
 *
 * @return array List of reservations.
 */

public function get_reservations() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'reservation_bookings';

    // Define your SQL query to retrieve reservations
    $query = "SELECT * FROM $table_name";

    // Use $wpdb to execute the query and get results
    $reservations = $wpdb->get_results($query);

    // Return the reservations as an array
    return $reservations;
}

/**
 * Delete a reservation by ID.
 *
 * @param int $reservation_id The ID of the reservation to delete.
 * @return bool True on success, false on failure.
 */
public function delete_reservation($reservation_id) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'reservation_bookings';

    // Define the deletion query with a WHERE clause to target the specific reservation by ID
    $query = $wpdb->prepare("DELETE FROM $table_name WHERE id = %d", $reservation_id);

    // Use $wpdb to execute the deletion query
    $wpdb->query($query);
}

// Additional reservation-related functions and utility code can be added here

// Define other plugin-specific functions and utility code as needed

// Example: Function to process form submissions
function process_reservation_form() {
    if (isset($_POST['submit_reservation'])) {
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']); // Add phone field
        $reservation_date = sanitize_text_field($_POST['reservation_date']);
        $reservation_time = sanitize_text_field($_POST['reservation_time']); // Add time field
        $guests = intval($_POST['guests']); // Convert to integer
    
        // Insert the reservation booking into the database
        $this->insert_reservation_booking($name, $email, $phone, $reservation_date, $reservation_time, $guests);
    
        // Optionally, redirect the user to a confirmation page
        exit();
    }
}


function insert_reservation_booking($name, $email, $phone, $reservation_date, $reservation_time, $guests) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'reservation_bookings';

    // Prepare the data to be inserted
    $data = array(
        'name' => $name,
        'email' => $email,
        'phone' => $phone, // Add phone field
        'reservation_date' => $reservation_date,
        'reservation_time' => $reservation_time, // Add time field
        'guests' => $guests,
    );

    // Define the data format (you can adjust it as needed)
    $data_format = array(
        '%s', // name
        '%s', // email
        '%s', // phone
        '%s', // reservation_date
        '%s', // reservation_time
        '%d', // guests (assuming it's an integer)
    );

    // Insert the data into the database table
    $wpdb->insert($table_name, $data, $data_format);

    // Optionally, you can check if the insertion was successful
    if ($wpdb->last_error) {
        // Handle any errors here
        return false; // Indicate that the insertion failed
    }

    return true; // Indicate a successful insertion
}


  // Example: Function to calculate available reservation slots
public static function calculateAvailableSlots($date) {
    // Implement the logic to calculate available slots for a given date
    // Return the number of available slots
    // You can use this method to display availability to users
    return 0; // Replace with your actual calculation
}







}