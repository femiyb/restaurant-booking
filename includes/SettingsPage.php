<?php

namespace RestaurantBooking\Includes;

class SettingsPage {
    public function __construct() {
        add_action('admin_menu', array($this, 'add_plugin_menu_item'));
        add_action('admin_init', array($this, 'initialize_settings'));
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
        </div>
        <?php
    }

    // Initialize settings and add fields
    public function initialize_settings() {
        // Register a section for your settings
        add_settings_section(
            'restaurant_booking_general_settings',
            'General Settings',
            array($this, 'render_section_description'),
            'restaurant_booking_settings_page'
        );

        // Add a field for a setting
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
    }

    // Render section description (optional)
    public function render_section_description() {
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
}
