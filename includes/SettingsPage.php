<?php
namespace RestaurantBooking\Includes;

class SettingsPage {
    public function __construct() {
        add_action('admin_menu', array($this, 'add_plugin_menu_item'));
        add_action('admin_init', array($this, 'initialize_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_ajax_delete_reservation', array($this, 'ajax_delete_reservation'));
    }
    

    // Add a menu item for the plugin settings page
    public function add_plugin_menu_item() {
        add_menu_page(
            'Restaurant Booking Settings',
            'Booking Settings',
            'manage_options',
            'restaurant-booking-settings',
            array($this, 'render_settings_page')
        );
    }

    // Render the plugin settings page
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h2>Restaurant Booking Settings</h2>
            <form method="post" action="options.php">
                <?php settings_fields('restaurant_booking_settings_group'); ?>
                <?php do_settings_sections('restaurant_booking_settings_page'); ?>
                <?php submit_button(); ?>
            </form>

              <!-- Display the list of reservations -->
        <?php $this->list_reservations(); ?>
        </div>
        <?php
    }

    // Initialize settings and add fields
    public function initialize_settings() {
        // Register a section for general settings
        add_settings_section(
            'restaurant_booking_general_settings',
            'General Settings',
            array($this, 'render_general_section_description'),
            'restaurant_booking_settings_page'
        );

        // Add a field for API Key
        add_settings_field(
            'restaurant_booking_api_key',
            'API Key',
            array($this, 'render_api_key_field'),
            'restaurant_booking_settings_page',
            'restaurant_booking_general_settings'
        );

        // Register the setting and sanitize user input
        register_setting(
            'restaurant_booking_settings_group',
            'restaurant_booking_api_key',
            array($this, 'sanitize_api_key')
        );

        // Register a section for restaurant management settings
        add_settings_section(
            'restaurant_booking_restaurant_settings',
            'Restaurant Settings',
            array($this, 'render_restaurant_section_description'),
            'restaurant_booking_settings_page'
        );

        // Add a field for restaurant name
        add_settings_field(
            'restaurant_booking_restaurant_name',
            'Restaurant Name',
            array($this, 'render_restaurant_name_field'),
            'restaurant_booking_settings_page',
            'restaurant_booking_restaurant_settings'
        );

        // Add a field for restaurant address
        add_settings_field(
            'restaurant_booking_restaurant_address',
            'Restaurant Address',
            array($this, 'render_restaurant_address_field'),
            'restaurant_booking_settings_page',
            'restaurant_booking_restaurant_settings'
        );

        // Register the settings and sanitize user input
        register_setting(
            'restaurant_booking_settings_group',
            'restaurant_booking_restaurant_name',
            array($this, 'sanitize_restaurant_name')
        );

        register_setting(
            'restaurant_booking_settings_group',
            'restaurant_booking_restaurant_address',
            array($this, 'sanitize_restaurant_address')
        );
    }

    // Render general section description (optional)
    public function render_general_section_description() {
        echo '<p>Configure general settings for the Restaurant Booking plugin.</p>';
    }

    // Render the API Key field
    public function render_api_key_field() {
        $api_key = get_option('restaurant_booking_api_key');
        echo '<input type="text" name="restaurant_booking_api_key" value="' . esc_attr($api_key) . '" />';
    }

    // Sanitize API Key input
    public function sanitize_api_key($input) {
        // Sanitize the input here if needed
        return sanitize_text_field($input);
    }

    // Render restaurant section description (optional)
    public function render_restaurant_section_description() {
        echo '<p>Configure restaurant-specific settings.</p>';
    }

    // Render the Restaurant Name field
    public function render_restaurant_name_field() {
        $restaurant_name = get_option('restaurant_booking_restaurant_name');
        echo '<input type="text" name="restaurant_booking_restaurant_name" value="' . esc_attr($restaurant_name) . '" />';
    }

    // Render the Restaurant Address field
    public function render_restaurant_address_field() {
        $restaurant_address = get_option('restaurant_booking_restaurant_address');
        echo '<input type="text" name="restaurant_booking_restaurant_address" value="' . esc_attr($restaurant_address) . '" />';
    }

    // Sanitize Restaurant Name input
    public function sanitize_restaurant_name($input) {
        // Sanitize the input here if needed
        return sanitize_text_field($input);
    }

    // Sanitize Restaurant Address input
    public function sanitize_restaurant_address($input) {
        // Sanitize the input here if needed
        return sanitize_text_field($input);
    }

    public function list_reservations() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'reservation_bookings';

        // Retrieve reservations from the database
        $reservations = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

        // Display reservations in a table
        echo '<h2>Reservation List</h2>';
        echo '<table class="wp-list-table widefat fixed striped">';
        echo '<thead>';
        echo '<tr>';
        echo '<th>ID</th>';
        echo '<th>Name</th>';
        echo '<th>Email</th>';
        echo '<th>Guests</th>';
        echo '<th>Date</th>';
        echo '<th>Time</th>';
        echo '<th>Action</th>';
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';

        foreach ($reservations as $reservation) {
            echo '<tr>';
            echo '<td>' . esc_html($reservation['id']) . '</td>';
            echo '<td>' . esc_html($reservation['name']) . '</td>';
            echo '<td>' . esc_html($reservation['email']) . '</td>';
            echo '<td>' . esc_html($reservation['guests']) . '</td>';
            echo '<td>' . esc_html($reservation['reservation_date']) . '</td>';
            echo '<td>' . esc_html($reservation['reservation_time']) . '</td>';
            echo '<td><a href="#" class="delete-reservation" data-reservation-id="' . esc_attr($reservation['id']) . '">Delete</a></td>';
            echo '</tr>';
        }

        echo '</tbody>';
        echo '</table>';
    }

    public function ajax_delete_reservation() {
        if (isset($_POST['reservation_id'])) {
            $reservation_id = intval($_POST['reservation_id']);
            $deleted = $this->delete_reservation($reservation_id);
            if ($deleted) {
                wp_send_json_success();
            } else {
                wp_send_json_error(array('message' => 'Failed to delete reservation.'));
            }
        } else {
            wp_send_json_error(array('message' => 'Reservation ID not provided.'));
        }
    }

     // Function to delete a reservation by ID
     public function delete_reservation($reservation_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'reservation_bookings';

        // Perform the deletion
        $deleted = $wpdb->delete($table_name, array('id' => $reservation_id), array('%d'));

        return $deleted;
    }

    // Enqueue JavaScript for AJAX functionality
    public function enqueue_scripts($hook) {
            wp_enqueue_script('reservation-admin', plugin_dir_url(__FILE__) . 'js/reservation-admin.js', array('jquery'), '1.0', true);
            wp_localize_script('reservation-admin', 'reservationAjax', array('ajaxurl' => admin_url('admin-ajax.php')));
    }
    
}
