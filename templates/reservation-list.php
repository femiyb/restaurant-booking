<?php
/**
 * Template for displaying the Reservation List Block.
 *
 * @package RestaurantBooking
 */

// Query reservations or retrieve them from your data source
$reservations = RestaurantBooking\ReservationManager::getReservations(); // Replace with your actual retrieval logic

if (empty($reservations)) {
    echo '<p>No reservations found.</p>';
} else {
    ?>
    <div class="reservation-list">
        <h2>Reservation List</h2>
        <ul>
            <?php foreach ($reservations as $reservation) : ?>
                <li>
                    <strong>Reservation ID:</strong> <?php echo esc_html($reservation->ID); ?><br>
                    <strong>Name:</strong> <?php echo esc_html(get_the_title($reservation)); ?><br>
                    <strong>Date:</strong> <?php echo esc_html(get_post_meta($reservation->ID, 'reservation_date', true)); ?><br>
                    <strong>Time:</strong> <?php echo esc_html(get_post_meta($reservation->ID, 'reservation_time', true)); ?><br>
                    <strong>Party Size:</strong> <?php echo esc_html(get_post_meta($reservation->ID, 'party_size', true)); ?><br>
                    <!-- Add more reservation details as needed -->
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php
}
?>
