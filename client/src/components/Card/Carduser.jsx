import PropTypes from 'prop-types';

const Carduser = ({ patient}) => {
  // Check if patient object is defined
  if (!patient) {
    return <div>Loading...</div>; // Or handle the case of undefined patient as needed
  }

  // Destructure patient object
  const { patientName, contactMailId, contactPhoneNumber, patientUniqueId } = patient;

  // Get first letter of patientName
  const firstLetter = patientName.charAt(0).toUpperCase();

  return (
    <div className="max-w-sm bg-white drop-shadow-lg rounded-lg overflow-hidden hover:bg-cyan-100">
      <div className="px-4 py-2 ">
        <div className="flex items-center">
          <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center">
            <span className="text-white text-xl">{firstLetter}</span>
          </div>
          <div className="ml-2">
            <p className="text-xl font-semibold ">{patientName}</p>
            <p className="text-sm">{patientUniqueId}</p>
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
Carduser.propTypes = {
    patient: PropTypes.shape({
    patientName: PropTypes.string.isRequired,
    contactMailId: PropTypes.string.isRequired,
    patientUniqueId: PropTypes.string.isRequired,
    contactPhoneNumber: PropTypes.string.isRequired,
  }),
};

export default Carduser;
