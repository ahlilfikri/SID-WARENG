import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './componentSurat.css';

const ContainerDataSurat = ({ DataAllSurat }) => {
  const [dataSurat, setDataSurat] = useState(0);

  useEffect(() => {
    setDataSurat(DataAllSurat);
  }, [DataAllSurat]);

  const totalSurat = dataSurat?.data?.data?.length ?? 0;

  const hitungByJenisSurat = (jenisSurat) => {
    return dataSurat?.data?.data?.filter(surat => surat.jenisSurat === jenisSurat).length ?? 0;
  };

  const renderCard = (title, count) => {
    return count > 0 ? (
      <div className="box-card d-flex pt-2 me-1">
        <h6 className="card-title" style={{ color: "white" }}>{title}{" : "}{count}</h6>
      </div>
    ) : null;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Data Surat</h1>

          <div className="row">
            <div className="col-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Surat</h5>
                  <h1 className="card-text">{totalSurat}</h1>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="row">
                {renderCard("SKCK", hitungByJenisSurat('surat pengantar skck'))}
                {renderCard("Keterangan Usaha", hitungByJenisSurat('surat keterangan usaha'))}
                {renderCard("Keterangan Kependudukan", hitungByJenisSurat('surat keterangan kependudukan'))}
                {renderCard("Keterangan Domisili", hitungByJenisSurat('surat keterangan domisili'))}
                {renderCard("Kenal Lahir", hitungByJenisSurat('surat kenal lahir'))}
                {renderCard("Pindah", hitungByJenisSurat('surat pindah'))}
                {renderCard("Izin Keramaian", hitungByJenisSurat('surat izin keramaian'))}
                {renderCard("Izin Pepergian", hitungByJenisSurat('surat izin pepergian'))}
                {renderCard("Pembuatan KK Baru", hitungByJenisSurat('pembuatan kk baru'))}
                {renderCard("Pembuatan KTP Baru", hitungByJenisSurat('pembuatan ktp baru'))}
                {renderCard("Pembuatan KTP Lama", hitungByJenisSurat('pembuatan ktp lama'))}
                {renderCard("Pemecahan KK Lama", hitungByJenisSurat('pemecahan kk lama'))}
                {renderCard("PBB-P2", hitungByJenisSurat('pbb-p2'))}
                {renderCard("Mutasi PBB", hitungByJenisSurat('mutasi pbb'))}
                {renderCard("Pencatatan Kependudukan", hitungByJenisSurat('pencatatan kependudukan'))}
                {renderCard("Surat Kematian", hitungByJenisSurat('surat kematian'))}
                {renderCard("Surat Kelahiran", hitungByJenisSurat('surat kelahiran'))}
                {renderCard("Santunan Kematian", hitungByJenisSurat('santunan kematian'))}
                {renderCard("Pengajuan JKN-KIS", hitungByJenisSurat('pengajuan jkn-kis'))}
                {renderCard("Koordinator RTLH", hitungByJenisSurat('koordinator rtlh'))}
                {renderCard("Pendataan Masalah Sosial", hitungByJenisSurat('pendataan masalah sosial'))}
                {renderCard("Bantuan Sosial", hitungByJenisSurat('bantuan sosial'))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ContainerDataSurat.propTypes = {
  DataAllSurat: PropTypes.object.isRequired
};

export default ContainerDataSurat;
