const { registerBlockType } = wp.blocks;
const { TextControl, Button, DatePicker, TimePicker } = wp.components;
const { useState } = wp.element;

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
        submitted: {
            type: 'boolean', // Define the 'submitted' attribute type
            default: false,  // Set the default value to false
        },
    },
    edit: function(props) {
        const { attributes, setAttributes } = props;

        const [isSubmitting, setIsSubmitting] = useState(false);

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



        const handleSubmit = (event) => {
            event.preventDefault();
            setIsSubmitting(true); // Indicate the submission process has started
            
            const formData = new FormData();
            formData.append('name', attributes.name);
            formData.append('email', attributes.email);
            formData.append('phone', attributes.phone);
            formData.append('guests', attributes.guests);
            formData.append('date', attributes.date);
            formData.append('time', attributes.time);
            
            // Ensure the endpoint URL is correct
            fetch('/wp-json/restaurant-booking/v1/submit-form', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Only update `submitted` to true on successful submission
                if (data && data.success) {
                    setAttributes({ submitted: true });
                }
                setIsSubmitting(false); // Reset submission state regardless of success/failure
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsSubmitting(false); // Ensure submission state is reset on failure
            });
        };
        
        if (attributes.submitted) {
            return wp.element.createElement('div', null, 'Thank you for your reservation!');
        } else {
        return wp.element.createElement(
            'div',
            { onSubmit: handleSubmit },
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
                    type: 'submit',
                    isPrimary: true,
                    disabled: isSubmitting,

                },
                'Submit'
            )
        );
    }},
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
                    action: ''
                },
                wp.element.createElement('input', {
                    type: 'text',
                    name: 'name',
                    class: 'res-booking-form-Name',
                    required: 'required',
                    placeholder: 'Enter your name',
                }),
                wp.element.createElement('input', {
                    type: 'email',
                    name: 'email',
                    class: 'res-booking-form-Email',
                    required: 'required',
                    placeholder: 'Enter your email',
                }),
                wp.element.createElement('input', {
                    type: 'text',
                    name: 'phone',
                    class: 'res-booking-form-Phone',
                    required: 'required',
                    placeholder: 'Enter your phone number',
                }),
                wp.element.createElement('input', {
                    type: 'number',
                    name: 'guests',
                    class: 'res-booking-form-Guests',
                    required: 'required',
                    min: '1',
                    max: '4',
                    placeholder: 'Number of guests',
                }),
                wp.element.createElement('input', {
                    type: 'date',
                    name: 'date',
                    class: 'res-booking-form-Date',
                    required: 'required',
                    placeholder: 'Select a date',
                }),
                wp.element.createElement('input', {
                    type: 'time',
                    name: 'time',
                    class: 'res-booking-form-Time',
                    required: 'required',
                    placeholder: 'Select a time',
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
