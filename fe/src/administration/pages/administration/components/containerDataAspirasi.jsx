import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './componentSurat.css';

const ContainerDataAspirasi = ({ DataAllAspirasi }) => {
    const [dataAspirasi, setDataAspirasi] = useState(0);

    useEffect(() => {
        setDataAspirasi(DataAllAspirasi);
    }, [DataAllAspirasi]);

    const totalAspirasi = dataAspirasi?.data?.length ?? 0;
    const hitungByJenisAspirasi = (jenisAspirasi) => {
        return dataAspirasi?.data?.filter(aspirasi => aspirasi.isPublish === jenisAspirasi).length ?? 0;
    }

    const renderCard = (title, count, bgColor) => {
        return count > 0 ? (
            <div className="col-sm-6 mb-2">
                <div className={`box-card card h-100 text-white ${bgColor}`}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h6 className="card-title mb-0 text-light">{title}</h6>
                        <span className="badge bg-secondary">{count}</span>
                    </div>
                </div>
            </div>
        ) : null;
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col text-center">
                    <h5 className="text-uppercase">Data Aspirasi</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Aspirasi</h5>
                            <h1 className="card-text display-4">{totalAspirasi}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="row" style={{ color:'white' }}>
                        {renderCard("Umum", hitungByJenisAspirasi(true), "bg-primary text-light")}
                        {renderCard("Pribadi", hitungByJenisAspirasi(false), "bg-primary text-light")}
                    </div>
                </div>
            </div>
        </div>
    );
}

ContainerDataAspirasi.propTypes = {
    DataAllAspirasi: PropTypes.object.isRequired
}

export default ContainerDataAspirasi;
