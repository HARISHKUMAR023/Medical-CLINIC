
import PropTypes from 'prop-types';

const Cardsupplier = ({ supplier }) => {
  const { agencyContactName, contactMailId, contactPhoneNumber } = supplier;
  const firstLetter = agencyContactName.charAt(0).toUpperCase();

  return (
    <div className="max-w-sm bg-white drop-shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 ">
        <div className="flex items-center">
          <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center">
            <span className="text-white text-xl">{firstLetter}</span>
          </div>
          <div className="ml-2">
            <p className="text-xl font-semibold ">{agencyContactName}</p>
            <p className="text-sm">{contactMailId}</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-6">
        <p className="text-lg text-gray-700">Phone: {contactPhoneNumber}</p>
      </div>
    </div>
  );
};

// Prop types validation
Cardsupplier.propTypes = {
  supplier: PropTypes.shape({
    agencyContactName: PropTypes.string.isRequired,
    contactMailId: PropTypes.string.isRequired,
    contactPhoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cardsupplier;
