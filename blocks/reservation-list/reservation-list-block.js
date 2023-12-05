( function( blocks, element, blockEditor, apiFetch ) {
    var el = element.createElement;
    var Fragment = element.Fragment;
    var useBlockProps = blockEditor.useBlockProps;
    var useState = element.useState;
    var useEffect = element.useEffect;

    blocks.registerBlockType('restaurant-booking/reservation-list', {
        apiVersion: 2,
        title: 'Reservation List',
        icon: 'list-view',
        category: 'widgets',
        edit: function() {
            var blockProps = useBlockProps();
            var [reservations, setReservations] = useState([]);
            var [isLoading, setIsLoading] = useState(true);

            useEffect(function() {
                // Fetch reservations from the REST API endpoint
                apiFetch({ path: '/restaurant-booking/v1/get-reservations' }).then(function(data) {
                    setReservations(data);
                    setIsLoading(false);
                }).catch(function(error) {
                    console.error('Error fetching reservations:', error);
                    setIsLoading(false);
                });
            }, []);

            return el(
                Fragment,
                {},
                el(
                    'div',
                    blockProps,
                    isLoading ? el('p', {}, 'Loading reservations...') : el(
                        'ul',
                        {},
                        reservations.map(function(reservation) {
                            // Adjust the keys according to your actual data structure
                            return el(
                                'li',
                                { key: reservation.id.toString() }, // Use the unique 'id' property as the key
                                el('div', {}, 'Name: ' + reservation.name),
                                el('div', {}, 'Date: ' + reservation.reservation_date),
                                el('div', {}, 'Time: ' + reservation.reservation_time),
                                el('div', {}, 'Guests: ' + reservation.guests.toString())
                            );
                        })
                    )
                )
            );
        },
        save: function() {
            // Dynamic blocks do not save content to the database
            // Render in PHP using the render_callback function in register_block_type
            return null;
        },
    });
} )(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
    window.wp.apiFetch
);
