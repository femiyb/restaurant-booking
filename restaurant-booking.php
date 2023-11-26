<?php
/*
Plugin Name:    Restaurant Booking
Description:    A WordPress plugin for managing restaurant reservations.
Version:        1.0
Author:         Your Name
License:        GNU GENERAL PUBLIC LICENSE
*/

namespace RestaurantBooking;

// Register the autoloader function
require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';

// Define the autoloader function
function plugin_autoloader($class_name) {
    // Define the base directory for your plugin's classes
    $base_dir = plugin_dir_path(__FILE__);

    // Convert the class name to a file path
    $file_path = $base_dir . str_replace('\\', '/', $class_name) . '.php';

    // Check if the file exists and load it
    if (file_exists($file_path)) {
        require_once $file_path;
    }
}

// Initialize the autoloader
spl_autoload_register(__NAMESPACE__ . '\plugin_autoloader');

use RestaurantBooking\Classes\ReservationManager;
use RestaurantBooking\Includes\SettingsPage;
use RestaurantBooking\Includes\ReservationFunctions;


$ReservationManager = new ReservationManager(); // this works!
$ReservationFunctions = new ReservationFunctions(); // this works!


// Add a menu item for the plugin settings page
$SettingsPage = new SettingsPage();

// Rest of your code...

// Register activation and deactivation hooks
register_activation_hook(__FILE__, 'RestaurantBooking\restaurant_plugin_activate');
register_deactivation_hook(__FILE__, 'RestaurantBooking\restaurant_plugin_deactivate');

function restaurant_plugin_activate() {
    // Perform activation tasks here
    global $wpdb;
    $table_name = $wpdb->prefix . 'reservation_bookings';

    $charset_collate = $wpdb->get_charset_collate();

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name) {
        $sql = "CREATE TABLE $table_name (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,  // Add the Phone column
            guests INT NOT NULL,
            reservation_date DATE NOT NULL,
            reservation_time TIME NOT NULL,  // Add the Reservation Time column
            PRIMARY KEY (id)
        ) $charset_collate;";
    
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    

}

function restaurant_plugin_deactivate() {
    // Perform deactivation tasks here
}

// Register and enqueue styles and scripts
function enqueue_styles_and_scripts() {
    // Enqueue styles
    wp_enqueue_style('restaurant-booking-styles', plugin_dir_url(__FILE__) . 'css/style.css', array(), '1.0.0');
    wp_enqueue_style('restaurant-booking-form-styles', plugin_dir_url(__FILE__) . 'blocks/booking-form/style.css', array(), '1.0.0');


    // Enqueue scripts (modify as needed)
    wp_enqueue_script('restaurant-booking-scripts', plugin_dir_url(__FILE__) . 'js/main.js', array('jquery'), '1.0.0', true);

    // Localize script with data that needs to be available in JavaScript
    $script_data = array(
        'ajax_url' => admin_url('admin-ajax.php'),
        // Add more data as needed
    );
    wp_localize_script('restaurant-booking-scripts', 'restaurant_booking_data', $script_data);
}
add_action('wp_enqueue_scripts', 'RestaurantBooking\enqueue_styles_and_scripts');

function enqueue_custom_block_script() {
    // Enqueue the script only if you are in the WordPress admin
    if (is_admin()) {
        wp_enqueue_script(
            'restaurant-booking-block-script', // Unique handle
            plugin_dir_url(__FILE__) . 'blocks/booking-form/booking-form-block.js', // Path to your JavaScript file
            array('wp-blocks', 'wp-components', 'wp-editor', 'wp-element'), // Dependencies
            filemtime(plugin_dir_path(__FILE__) . 'blocks/booking-form/booking-form-block.js'), // Version (can use a timestamp to ensure it updates)
            true // Make sure to set this to true for the script type to be "module"
        );

        wp_enqueue_script(
            'restaurant-booking-form-script', // Unique handle
            plugin_dir_url(__FILE__) . 'blocks/booking-form/BookingForm.js', // Path to your JavaScript file
            array('wp-blocks', 'wp-components', 'wp-editor', 'wp-element'), // Dependencies
            filemtime(plugin_dir_path(__FILE__) . 'blocks/booking-form/BookingForm.js'), // Corrected file path
            true // Make sure to set this to true for the script type to be "module"
        );
    }
}
add_action('enqueue_block_editor_assets', 'RestaurantBooking\enqueue_custom_block_script');


function enqueue_ajax_script() {
    wp_enqueue_script('restaurant-booking-ajax', plugin_dir_url(__FILE__) . 'js/ajax.js', array('jquery'), '1.0', true);

    // Pass the AJAX URL to the script
    wp_localize_script('restaurant-booking-ajax', 'restaurant_booking_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
    ));
}
add_action('wp_enqueue_scripts', 'RestaurantBooking\enqueue_ajax_script');

// Register custom post types, taxonomies, and other plugin-specific features here
// Example:
// add_action('init', 'RestaurantBooking\register_post_types');

// Hook for handling AJAX requests (if needed)
// Example:
// add_action('wp_ajax_my_ajax_action', 'RestaurantBooking\ajax_callback');
// add_action('wp_ajax_nopriv_my_ajax_action', 'RestaurantBooking\ajax_callback');

// Include additional plugin-specific functionality and hooks below

// Define plugin initialization (if needed)
function init() {
    // Add your initialization logic here
}
add_action('init', __NAMESPACE__ . '\init');



// Include any other hooks and functions as needed for your plugin

// Register a custom post type for reservations
function register_reservation_post_type() {
    $labels = array(
        'name' => 'Reservations',
        'singular_name' => 'Reservation',
        'menu_name' => 'Reservations',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Reservation',
        'edit_item' => 'Edit Reservation',
        'new_item' => 'New Reservation',
        'view_item' => 'View Reservation',
        'view_items' => 'View Reservations',
        'search_items' => 'Search Reservations',
        'not_found' => 'No reservations found',
        'not_found_in_trash' => 'No reservations found in trash',
        'all_items' => 'All Reservations',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'menu_icon' => 'dashicons-calendar', // Customize the menu icon as needed
        'supports' => array('title', 'editor', 'custom-fields'),
        // Add more options and capabilities as needed
    );

    register_post_type('reservation', $args);
}
add_action('init', __NAMESPACE__ . '\register_reservation_post_type');

// Register a custom taxonomy for reservation types
function register_reservation_type_taxonomy() {
    $labels = array(
        'name' => 'Reservation Types',
        'singular_name' => 'Reservation Type',
        'menu_name' => 'Reservation Types',
        'all_items' => 'All Types',
        'edit_item' => 'Edit Type',
        'view_item' => 'View Type',
        'update_item' => 'Update Type',
        'add_new_item' => 'Add New Type',
        'new_item_name' => 'New Type Name',
        'search_items' => 'Search Types',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'hierarchical' => true, // Set to true if the taxonomy should have parent-child relationships
        'rewrite' => array('slug' => 'reservation-type'), // Customize the slug
    );

    register_taxonomy('reservation_type', 'reservation', $args);
}
