// reservation-list-block.js

(function () {
    const { registerBlockType } = wp.blocks;
    const { TextControl, Button } = wp.components;
  
    registerBlockType('restaurant-booking/reservation-list', {
      title: 'Reservation List',
      icon: 'list-view',
      category: 'common',
      attributes: {
        reservations: {
          type: 'array',
          default: [],
        },
      },
      edit: function (props) {
        const { attributes, setAttributes } = props;
  
        // Function to add a new reservation
        const addReservation = () => {
          const newReservations = [...attributes.reservations];
          newReservations.push('');
          setAttributes({ reservations: newReservations });
        };
  
        // Function to update a reservation
        const updateReservation = (newValue, index) => {
          const newReservations = [...attributes.reservations];
          newReservations[index] = newValue;
          setAttributes({ reservations: newReservations });
        };
  
        // Function to remove a reservation
        const removeReservation = (index) => {
          const newReservations = [...attributes.reservations];
          newReservations.splice(index, 1);
          setAttributes({ reservations: newReservations });
        };
  
        return (
          <div>
            <h3>Reservation List</h3>
            {attributes.reservations.map((reservation, index) => (
              <div key={index}>
                <TextControl
                  value={reservation}
                  onChange={(newValue) => updateReservation(newValue, index)}
                />
                <Button isDestructive onClick={() => removeReservation(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button isPrimary onClick={addReservation}>
              Add Reservation
            </Button>
          </div>
        );
      },
      save: function () {
        return null;
      },
    });
  })();
  