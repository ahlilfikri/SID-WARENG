import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
const port = import.meta.env.VITE_BASE_API_URL2;

const BypassSurat = ({ suratAcaraId, role }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleBypassSurat = async () => {
        try {
            const request = await axios.put(`${port}v1/surat/baypass-${role}/${suratAcaraId}`);
            console.log(request);
            setIsButtonDisabled(true);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <Button variant="warning" onClick={handleBypassSurat} disabled={isButtonDisabled}>
            Bypass Surat
        </Button>
    );
};

BypassSurat.propTypes = {
    suratAcaraId: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};

export default BypassSurat;
