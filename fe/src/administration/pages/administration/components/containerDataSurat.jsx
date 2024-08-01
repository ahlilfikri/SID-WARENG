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

  const renderCard = (title, count, bgColor) => {
    return count > 0 ? (
      <div className="col-sm-4 mb-3">
        <div className={`box-card card h-100 text-white ${bgColor}`}>
          <div className="card-body d-flex justify-content-between align-items-center">
            <h6 className="card-title mb-0 text-light">{title}</h6>
            <span className="badge bg-secondary text-light">{count}</span>
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col text-center">
          <h5 className="text-uppercase">Data Surat</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total Surat</h5>
              <h1 className="card-text display-4">{totalSurat}</h1>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            {renderCard("SKCK", hitungByJenisSurat('surat pengantar skck'), "bg-primary")}
            {renderCard("Keterangan Usaha", hitungByJenisSurat('surat keterangan usaha'), "bg-primary")}
            {renderCard("Keterangan Kependudukan", hitungByJenisSurat('surat keterangan kependudukan'), "bg-primary")}
            {renderCard("Keterangan Domisili", hitungByJenisSurat('surat keterangan domisili'), "bg-primary")}
            {renderCard("Kenal Lahir", hitungByJenisSurat('surat kenal lahir'), "bg-primary")}
            {renderCard("Pindah", hitungByJenisSurat('surat pindah'), "bg-primary")}
            {renderCard("Izin Keramaian", hitungByJenisSurat('surat izin keramaian'), "bg-primary")}
            {renderCard("Izin Pepergian", hitungByJenisSurat('surat izin pepergian'), "bg-primary")}
            {renderCard("Pembuatan KK Baru", hitungByJenisSurat('pembuatan kk baru'), "bg-primary")}
            {renderCard("Pembuatan KTP Baru", hitungByJenisSurat('pembuatan ktp baru'), "bg-primary")}
            {renderCard("Pembuatan KTP Lama", hitungByJenisSurat('pembuatan ktp lama'), "bg-primary")}
            {renderCard("Pemecahan KK Lama", hitungByJenisSurat('pemecahan kk lama'), "bg-primary")}
            {renderCard("PBB-P2", hitungByJenisSurat('pbb-p2'), "bg-primary")}
            {renderCard("Mutasi PBB", hitungByJenisSurat('mutasi pbb'), "bg-primary")}
            {renderCard("Pencatatan Kependudukan", hitungByJenisSurat('pencatatan kependudukan'), "bg-primary")}
            {renderCard("Surat Kematian", hitungByJenisSurat('surat kematian'), "bg-primary")}
            {renderCard("Surat Kelahiran", hitungByJenisSurat('surat kelahiran'), "bg-primary")}
            {renderCard("Santunan Kematian", hitungByJenisSurat('santunan kematian'), "bg-primary")}
            {renderCard("Pengajuan JKN-KIS", hitungByJenisSurat('pengajuan jkn-kis'), "bg-primary")}
            {renderCard("Koordinator RTLH", hitungByJenisSurat('koordinator rtlh'), "bg-primary")}
            {renderCard("Pendataan Masalah Sosial", hitungByJenisSurat('pendataan masalah sosial'), "bg-primary")}
            {renderCard("Bantuan Sosial", hitungByJenisSurat('bantuan sosial'), "bg-primary")}
          </div>
        </div>
      </div>
    </div>
  );
};

ContainerDataSurat.propTypes = {
  DataAllSurat: PropTypes.object.isRequired
};

export default ContainerDataSurat;
