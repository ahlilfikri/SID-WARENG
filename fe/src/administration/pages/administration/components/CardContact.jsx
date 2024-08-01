import './CardContact.css';
import PropTypes from 'prop-types';

const CardContact = (props) => {
  const { cardDetails } = props;
  const { title, whatsappNumber, className } = cardDetails;

  // Membuat tautan WhatsApp dengan nomor yang diberikan
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo%20Bang%20Masih%20melek?`;

//   fungsi untuk membuka browser dan mengarahkan ke tautan WhatsApp
    const openWhatsApp = () => {
        window.open(whatsappLink, '_blank');
    };

  return (
    <li className={`${className} card-item-contact`}  onClick={openWhatsApp}>
      <h3 className="card-title-contact">{title}</h3>
      <p className="card-description-contact">{whatsappNumber}</p>
      <div className="img-container-contact">
    
      </div>
    </li>
  );
};

CardContact.propTypes = {
  cardDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    whatsappNumber: PropTypes.string.isRequired,
    className: PropTypes.string,
  }).isRequired,
};

export default CardContact;
