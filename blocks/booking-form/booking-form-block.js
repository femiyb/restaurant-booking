const { registerBlockType } = wp.blocks;
const { TextControl, Button, DatePicker, TimePicker } = wp.components;

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

        const handleDateChange = (date) => {
            // Check if the selected date is not in the past
            if (date && date.getTime() >= new Date().getTime()) {
                setAttributes({ date: date.toISOString() });
            } else {
                // Display an error or message if the date is in the past
                console.log('Selected date cannot be in the past');
            }
        };

        const handleTimeChange = (time) => {
            setAttributes({ time });
        };

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
                    value: attributes.guests.toString(),
                    onChange: (guests) => setAttributes({ guests: parseInt(guests) || 0 }),
                    type: 'number',
                    required: 'required',
                    min: '1',
                    max: '4',
                }
            ),
            wp.element.createElement(
                DatePicker,
                {
                    label: 'Date',
                    currentDate: attributes.date ? new Date(attributes.date) : undefined,
                    onChange: handleDateChange,
                    minDate: new Date(), // Disable past dates
                }
            ),
            wp.element.createElement(
                TimePicker,
                {
                    label: 'Time',
                    currentTime: attributes.time,
                    onChange: handleTimeChange,
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
        // Define the HTML structure of your booking form here for rendering on the front end
        return wp.element.createElement(
            'div',
            null,
            wp.element.createElement(
                'form',
                {
                    method: 'POST',
                    class: 'res-booking-form',
                    name: 'submit_reservation',
                },
                wp.element.createElement('input', {
                    type: 'text',
                    name: 'name',
                    value: '{{attributes.name}}',
                    class: 'res-booking-form-Name',
                }),
                wp.element.createElement('input', {
                    type: 'email',
                    name: 'email',
                    value: '{{attributes.email}}',
                    class: 'res-booking-form-Email',
                }),
                wp.element.createElement('input', {
                    type: 'text',
                    name: 'phone',
                    value: '{{attributes.phone}}',
                    class: 'res-booking-form-Phone',
                }),
                wp.element.createElement('input', {
                    type: 'number',
                    name: 'guests',
                    value: '{{attributes.guests}}',
                    class: 'res-booking-form-Guests',
                    min: '1',
                    max: '4',
                }),
                wp.element.createElement('input', {
                    type: 'date',
                    name: 'date',
                    value: '{{attributes.date}}',
                    class: 'res-booking-form-Date',
                }),
                wp.element.createElement('input', {
                    type: 'time',
                    name: 'time',
                    value: '{{attributes.time}}',
                    class: 'res-booking-form-Time',
                }),
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
