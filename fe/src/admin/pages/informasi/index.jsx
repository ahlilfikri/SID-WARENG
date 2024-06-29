import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import getToken from '../../../shared/functions/functions';
import ImageError from '../../../assets/ImageErrorHandling.svg';
import EditModal from './component/EditModal';
import AddModal from './component/AddModal';
// import 'bootstrap/dist/css/bootstrap.min.css';

const InformasiControl = () => {
    const [dataInformasi, setDataInformasi] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentInformasi, setCurrentInformasi] = useState({});
    const [editForm, setEditForm] = useState({ title: '', content: '' });
    const [addForm, setAddForm] = useState({ title: '', content: '', img: null });
    const [selectedImage, setSelectedImage] = useState(null);

    const getDataInformasi = async () => {
        try {
            const res = await axios.get('http://localhost:3556/api/v1/informasi/get-informasi');
            setDataInformasi(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDataInformasi();
    }, []);

    const handleImageError = (e) => {
        e.target.src = ImageError;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3556/api/v1/informasi/delete-informasi/${id}`);
            getDataInformasi();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (informasi) => {
        setIsEditing(true);
        setCurrentInformasi(informasi);
        setEditForm({
            title: informasi.title,
            content: informasi.content,
        });
    };

    const handleDeleteImage = async (image) => {
        const updatedImages = currentInformasi.img.filter(img => img !== image);
        try {
            await axios.put(`http://localhost:3556/api/v1/informasi/update-informasi/${currentInformasi._id}`, { ...currentInformasi, img: updatedImages });
            setCurrentInformasi({ ...currentInformasi, img: updatedImages });
            getDataInformasi();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3556/api/v1/informasi/update-informasi/${currentInformasi._id}`, editForm);
            setIsEditing(false);
            setCurrentInformasi({});
            setEditForm({ title: '', content: '' });
            getDataInformasi();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleAddFormChange = (e) => {
        if (e.target.name === 'img') {
            setAddForm({ ...addForm, [e.target.name]: e.target.files });
        } else {
            setAddForm({ ...addForm, [e.target.name]: e.target.value });
        }
    };

    const handleSaveAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', addForm.title);
        formData.append('content', addForm.content);
        for (let i = 0; i < addForm.img.length; i++) {
            formData.append('img', addForm.img[i]);
        }

        try {
            await axios.post('http://localhost:3556/api/v1/informasi/post-informasi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsAdding(false);
            setAddForm({ title: '', content: '', img: null });
            getDataInformasi();
        } catch (err) {
            console.error(err);
        }
    };

    const renderTable = (data) => {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>
                                    <div className="d-inline">
                                        {item.img.map((image, imgIndex) => {
                                            const imageSrc = `http://localhost:3556/upload/${encodeURIComponent(image)}`;
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
                                        })}
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-primary mx-1" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(item._id)}>Delete</button>
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
            <h1 className='my-2 my-md-5'>Daftar Informasi</h1>
            <button className="btn btn-success mb-3" onClick={() => setIsAdding(true)}>Add Informasi</button>
            {dataInformasi.length > 0 ? renderTable(dataInformasi) : <p>Loading...</p>}

            <EditModal
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editForm={editForm}
                handleEditFormChange={handleEditFormChange}
                handleSaveEdit={handleSaveEdit}
                currentInformasi={currentInformasi}
                handleDeleteImage={handleDeleteImage}
                setSelectedImage={setSelectedImage}
            />

            <AddModal
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                addForm={addForm}
                handleAddFormChange={handleAddFormChange}
                handleSaveAdd={handleSaveAdd}
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

export default InformasiControl;
