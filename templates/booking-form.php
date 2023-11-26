<?php
/**
 * Template for the Restaurant Booking Form Block.
 *
 * @package RestaurantBooking
 */

// Get attributes passed from the block editor
$date = get_field('date'); // Example: Replace 'date' with your block attribute name
$time = get_field('time'); // Example: Replace 'time' with your block attribute name
$party_size = get_field('party_size'); // Example: Replace 'party_size' with your block attribute name

?>

<div class="booking-form">
  <h2>Restaurant Booking</h2>
  <form action="" method="post">
    <div class="form-group">
      <label for="booking-date">Reservation Date:</label>
      <input type="date" id="booking-date" name="booking-date" value="<?php echo esc_attr($date); ?>" required>
    </div>
    <div class="form-group">
      <label for="booking-time">Reservation Time:</label>
      <input type="time" id="booking-time" name="booking-time" value="<?php echo esc_attr($time); ?>" required>
    </div>
    <div class="form-group">
      <label for="party-size">Party Size:</label>
      <input type="number" id="party-size" name="party-size" value="<?php echo esc_attr($party_size); ?>" required>
    </div>
    <!-- Add more form fields as needed -->
    <div class="form-group">
      <input type="submit" name="submit-booking" value="Book Now" class="button">
    </div>
  </form>
</div>
