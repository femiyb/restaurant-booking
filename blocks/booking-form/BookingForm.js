import { TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const BookingForm = () => {
  // Define state variables to store form field values
  const [reservationDate, setReservationDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log('Form submitted with the following data:');
    console.log('Reservation Date:', reservationDate);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Number of Guests:', guests);

    // You can send the form data to the server or perform any other actions as needed
  };

  return (
    <div className="booking-form">
      <h2>Reservation Form</h2>
      <TextControl
        label="Reservation Date"
        value={reservationDate}
        onChange={(newValue) => setReservationDate(newValue)}
      />
      <TextControl
        label="Name"
        value={name}
        onChange={(newValue) => setName(newValue)}
      />
      <TextControl
        label="Email"
        value={email}
        onChange={(newValue) => setEmail(newValue)}
      />
      <TextControl
        label="Number of Guests"
        type="number"
        value={guests}
        onChange={(newValue) => setGuests(newValue)}
      />
      <Button isPrimary onClick={handleSubmit}>
        Submit Reservation
      </Button>
    </div>
  );
};

export default BookingForm;
