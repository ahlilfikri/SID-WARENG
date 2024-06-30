import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import ImageError from '../../../assets/ImageErrorHandling.svg';
import EditModal from './component/EditModal';


const PerangkatDesaControl = () => {
    const port = import.meta.env.VITE_BASE_API_URL2;
    const port2 = import.meta.env.VITE_BASE_API_URL5;
    const [dataPerangkatDesa, setDataPerangkatDesa] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPerangkatDesa, setCurrentPerangkatDesa] = useState({});
    const [editForm, setEditForm] = useState({ name: '', nik: '', nohp: '', alamat : '', newImages: null });
    const [selectedImage, setSelectedImage] = useState(null);
    const [status, setStatus] = useState('loading');

    const getDataPerangkatDesa = async () => {
        setStatus('loading');
        try {
            const res = await axios.get(`${port}v1/perangkatDesa/get`);
            setDataPerangkatDesa(res.data.data);
            console.log(res.data.data);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    useEffect(() => {
        getDataPerangkatDesa();
    }, []);

    const handleImageError = (e) => {
        e.target.src = ImageError;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${port}v1/perangkatDesa/delete/${id}`);
            getDataPerangkatDesa();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (perangkatDesa) => {
        setIsEditing(true);
        setCurrentPerangkatDesa(perangkatDesa);
        setEditForm({
            name: perangkatDesa.user.name,
            nik: perangkatDesa.user.nik,
            nohp: perangkatDesa.user.nohp,
            alamat: perangkatDesa.user.alamat,
            newImages: null,
        });
    };

    const handleDeleteImage = async (image) => {
        const updatedImages = currentPerangkatDesa.user.img.filter(img => img !== image);
        try {
            await axios.put(`${port}v1/user/update/${currentPerangkatDesa._id}`, { ...currentPerangkatDesa, img: updatedImages });
            setCurrentPerangkatDesa({ ...currentPerangkatDesa, img: updatedImages });
            getDataPerangkatDesa();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        console.log(editForm);
        const formData = new FormData();
        formData.append('name', editForm.name);
        formData.append('nik', editForm.nik);
        formData.append('nohp', editForm.nohp);
        formData.append('alamat', editForm.alamat);

        if (editForm.newImages && editForm.newImages.length > 0) {
            currentPerangkatDesa.user.img.forEach(img => formData.append('img', img));
            for (let i = 0; i < editForm.newImages.length; i++) {
                formData.append('img', editForm.newImages[i]);
            }
        } else {
            currentPerangkatDesa.user.img.forEach(img => formData.append('img', img));
        }

        try {
            await axios.put(`${port}v1/user/update/${currentPerangkatDesa.user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsEditing(false);
            setCurrentPerangkatDesa({});
            setEditForm({ name: '', nik: '', nohp: '', alamat :'', newImages: null });
            getDataPerangkatDesa();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const renderTable = (data) => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>NIK</th>
                            <th>Nomor HP</th>
                            <th>Alamat</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.user._id}>
                                <td>{index + 1}</td>
                                <td>{item.user.name}</td>
                                <td>{item.user.nik}</td>
                                <td>{item.user.nohp}</td>
                                <td>{item.user.alamat}</td>
                                <td>
                                    <div className="d-inline">
                                        {item.user.img && item.user.img.length > 0 ? (
                                            item.user.img.map((image, imgIndex) => {
                                                const imageSrc = `${port2}${encodeURIComponent(image)}`;
                                                return (
                                                    <img
                                                        className='my-2'
                                                        key={imgIndex}
                                                        src={imageSrc}
                                                        alt={`img-${imgIndex}`}
                                                        width="50"
                                                        onError={handleImageError}
                                                        onClick={() => setSelectedImage(imageSrc)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <p>No images</p>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-primary mx-1" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(item.user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <Fragment>
            <h1 className='my-2 my-md-5'>Daftar Perangkat Desa</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'error' && <p>Data tidak berhasil dimuat.</p>}
            {status === 'success' && dataPerangkatDesa.length > 0 && renderTable(dataPerangkatDesa)}

            <EditModal
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editForm={editForm}
                handleEditFormChange={handleEditFormChange}
                handleSaveEdit={handleSaveEdit}
                currentPerangkatDesa={currentPerangkatDesa}
                handleDeleteImage={handleDeleteImage}
                setSelectedImage={setSelectedImage}
                handleNewImagesChange={(e) => setEditForm({ ...editForm, newImages: e.target.files })}
            />

            {selectedImage && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Image</h5>
                                <button type="button" className="close" onClick={() => setSelectedImage(null)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedImage} alt="Selected" className="img-fluid" onError={handleImageError} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedImage(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default PerangkatDesaControl;