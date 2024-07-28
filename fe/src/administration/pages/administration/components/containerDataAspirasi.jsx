import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './componentSurat.css';

const ContainerDataAspirasi = ({ DataAllAspirasi }) => {
    const [dataAspirasi, setDataAspirasi] = useState(0);


    console.log(DataAllAspirasi);

    useEffect(() => {
        setDataAspirasi(DataAllAspirasi);
    }, [DataAllAspirasi]);

    const totalAspirasi = dataAspirasi?.data?.length ?? 0;
    console.log(totalAspirasi);
    const hitungByJenisAspirasi = (jenisAspirasi) => { // true false
        return dataAspirasi?.data?.filter(aspirasi => aspirasi.isPublish === jenisAspirasi).length ?? 0;
    }

    const renderCard = (title, count) => {
        return count > 0 ? (
            <div className="box-card d-flex pt-2 me-1">
                <h6 className="card-title" style={{ color: "white" }}>{title}{" : "}{count}</h6>
            </div>
        ) : null;
    }       


    return(
        <>
        <div className="row">
            <div className="col-12">
                <h5 className="text-center">Data Aspirasi</h5>
                
                <div className="row">
                    <div className="col-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Aspirasi</h5>
                                <h1 className="card-text">{totalAspirasi}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            {renderCard("umum", hitungByJenisAspirasi(true))}
                            {renderCard("pribadi", hitungByJenisAspirasi(false))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

ContainerDataAspirasi.propTypes = {
    DataAllAspirasi: PropTypes.object.isRequired
}



export default ContainerDataAspirasi
