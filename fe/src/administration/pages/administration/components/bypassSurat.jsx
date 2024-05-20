import axios from 'axios';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BypassSurat = ({ suratAcaraId, role }) => {
    const handleBypassSurat = async () => {
        try {
            const request = await axios.put(`http://localhost:3555/api/v1/surat/baypass-${role}/${suratAcaraId}`);
            console.log(request);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <Button variant="warning" onClick={handleBypassSurat}>
            Bypass Surat
        </Button>
    );
};

BypassSurat.propTypes = {
    suratAcaraId: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};

export default BypassSurat;
