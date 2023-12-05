const { registerBlockType } = wp.blocks;
const { TextControl, Button } = wp.components;

// Get the current date and time
const now = new Date();
const formattedDate = now.toISOString().substr(0, 10); // Get the current date in 'YYYY-MM-DD' format



registerBlockType('restaurant-booking/booking-form', {
    title: 'Booking Form',
    icon: 'calendar', // You can choose an appropriate icon
    category: 'common',
    attributes: {
        name: {
            type: 'string',
            default: '',
        },
        email: {
            type: 'string',
            default: '',
        },
        phone: {
            type: 'string',
            default: '',
        },
        guests: {
            type: 'number',
            default: 1, // Default to 1 guest
        },
        date: {
            type: 'string',
            default: '',
        },
        time: {
            type: 'string',
            default: '',
        },
    },
    edit: function(props) {
        const { attributes, setAttributes } = props;

        return wp.element.createElement(
            'div',
            null,
            wp.element.createElement(
                TextControl,
                {
                    label: 'Name',
                    value: attributes.name,
                    onChange: (name) => setAttributes({ name }),
                }
            ),
            wp.element.createElement(
                TextControl,
                {
                    label: 'Email',
                    value: attributes.email,
                    onChange: (email) => setAttributes({ email }),
                }
            ),
            wp.element.createElement(
                TextControl,
                {
                    label: 'Phone',
                    value: attributes.phone,
                    onChange: (phone) => setAttributes({ phone }),
                }
            ),
            wp.element.createElement(
                TextControl,
                {
                    label: 'Number of Guests',
                    value: attributes.guests.toString(), // Convert to string
                    onChange: (guests) => setAttributes({ guests: parseInt(guests) || 0 }), // Ensure it's an integer
                    type: 'number',
                    required: 'required', // Add the "required" attribute here
                    min: '1', // Minimum value allowed (1 or higher)
                    max: '4', // Maximum value allowed (adjust as needed)
                }
            ),
     
     
            wp.element.createElement(
                Button,
                {
                    isPrimary: true,
                    onClick: () => {
                        // Handle form submission here
                        console.log('Form submitted:', attributes); 
                    },
                },
                'Submit'
            )
        );
    },
    save: function() {
        // Define the HTML structure of your booking form here
        return wp.element.createElement(
            'div',
            null,
            wp.element.createElement(
                'form',
                {
                    //action: '',
                    method: 'POST', // Change this to 'GET' if needed
                    class: 'res-booking-form',
                    name: 'submit_reservation'
                },
                wp.element.createElement(
                    'label',
                    null,
                    'Name',
                    wp.element.createElement(
                        'input',
                        {
                            type: 'text',
                            name: 'name',
                            value: '',
                            class: 'res-booking-form-Name',
                            required: 'required', // Add the "required" attribute here
                        }
                    )
                ),
                wp.element.createElement(
                    'label',
                    null,
                    'Email',
                    wp.element.createElement(
                        'input',
                        {
                            type: 'email',
                            name: 'email',
                            value: '',
                            class: 'res-booking-form-Email',
                            required: 'required', // Add the "required" attribute here
                        }
                    )
                ),
                wp.element.createElement(
                    'label',
                    null,
                    'Phone',
                    wp.element.createElement(
                        'input',
                        {
                            type: 'number',
                            name: 'phone',
                            value: '',
                            class: 'res-booking-form-Phone',
                            required: 'required', // Add the "required" attribute here
                        }
                    )
                ),
                wp.element.createElement(
                    'label',
                    null,
                    'Number of Guests',
                    wp.element.createElement(
                        'input',
                        {
                            type: 'number',
                            name: 'guests',
                            value: '',
                            class: 'res-booking-form-Guests',
                            required: 'required', // Add the "required" attribute here
                            min: '1', // Minimum value allowed (1 or higher)
                            max: '4', // Maximum value allowed (adjust as needed)
                        }
                    )
                ),
                
            
                wp.element.createElement(
                    'button',
                    {
                        type: 'submit',
                        name: 'submit_reservation',
                    },
                    'Submit Reservation'
                )
            )
        );
    },
});
