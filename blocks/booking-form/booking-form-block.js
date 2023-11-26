const { registerBlockType } = wp.blocks;
const { TextControl, Button } = wp.components;

// Get the current date and time
const now = new Date();
const formattedDate = now.toISOString().substr(0, 10); // Get the current date in 'YYYY-MM-DD' format
now.setHours(now.getHours() + 1); // Add 1 hour to the current time

// Define a function to generate time options with 30-minute intervals
function generateTimeOptions() {
    const timeOptions = [];
    const interval = 30; // 30 minutes interval
    let time = new Date(now);

    // Generate time options with 30-minute intervals for the next 12 hours
    for (let i = 0; i < 12 * 2; i++) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes === 0 ? '00' : '30'}`;
        timeOptions.push(timeString);
        time.setMinutes(time.getMinutes() + interval); // Add 30 minutes for the next interval
    }

    return timeOptions;
}

// Generate an array of time options
const timeOptions = generateTimeOptions();

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
                TextControl,
                {
                    label: 'Date',
                    value: attributes.date,
                    onChange: (date) => setAttributes({ date }),
                    type: 'date',
                    required: 'required', // Add the "required" attribute here
                    min: formattedDate, // Set the minimum date to the current date
                }
            ),
            wp.element.createElement(
                TextControl, // Add a TextControl for the "Reservation Time"
                {
                    label: 'Reservation Time',
                    value: attributes.time,
                    onChange: (time) => setAttributes({ time }),
                    type: 'time',
                    required: 'required', // Add the "required" attribute here
                    min: now.toTimeString().substring(0, 5), // Set the minimum time to the current time
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
                    'label',
                    null,
                    'Date',
                    wp.element.createElement(
                        'input',
                        {
                            type: 'date',
                            name: 'reservation_date',
                            value: formattedDate,
                            class: 'res-booking-form-Date',
                            required: 'required', // Add the "required" attribute here
                            min: formattedDate, // Set the minimum date to the current date
                        }
                    )
                ),
                wp.element.createElement(
                    'label',
                    null,
                    'Time',
                    wp.element.createElement(
                        'select', // Use a select element for time selection
                        {
                            name: 'reservation_time',
                            class: 'res-booking-form-Time',
                            required: 'required',
                        },
                        timeOptions.map((timeOption) =>
                            wp.element.createElement(
                                'option',
                                {
                                    key: timeOption,
                                    value: timeOption,
                                },
                                timeOption
                            )
                        )
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
