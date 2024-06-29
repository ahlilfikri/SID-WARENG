import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import getToken from '../../../shared/functions/functions';
import ImageError from '../../../assets/ImageErrorHandling.svg';
import EditModal from './component/EditModal';
import AddModal from './component/AddModal';
// import 'bootstrap/dist/css/bootstrap.min.css';

const KegiatanControl = () => {
    const [dataKegiatan, setDataKegiatan] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [currentKegiatan, setCurrentKegiatan] = useState({});
    const [editForm, setEditForm] = useState({ title: '', content: '', date: '', location: '' });
    const [addForm, setAddForm] = useState({ title: '', content: '', date: '', location: '', img: null });
    const [selectedImage, setSelectedImage] = useState(null);

    const getDataKegiatan = async () => {
        try {
            const res = await axios.get('http://localhost:3556/api/v1/kegiatan/get-kegiatan');
            setDataKegiatan(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getDataKegiatan();
    }, []);

    const handleImageError = (e) => {
        e.target.src = ImageError;
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3556/api/v1/kegiatan/delete-kegiatan/${id}`);
            console.log(response);
            getDataKegiatan();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (kegiatan) => {
        setIsEditing(true);
        setCurrentKegiatan(kegiatan);
        setEditForm({
            title: kegiatan.title,
            content: kegiatan.content,
            date: new Date(kegiatan.date).toISOString().slice(0, 16),
            location: kegiatan.location,
        });
    };

    const handleDeleteImage = async (image) => {
        const updatedImages = currentKegiatan.img.filter(img => img !== image);
        try {
            const response = await axios.put(`http://localhost:3556/api/v1/kegiatan/update-kegiatan/${currentKegiatan._id}`, { ...currentKegiatan, img: updatedImages });
            setCurrentKegiatan({ ...currentKegiatan, img: updatedImages });
            console.log(response);
            getDataKegiatan();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3556/api/v1/kegiatan/update-kegiatan/${currentKegiatan._id}`, editForm);
            setIsEditing(false);
            setCurrentKegiatan({});
            setEditForm({ title: '', content: '', date: '', location: '' });
            getDataKegiatan();
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
        formData.append('date', addForm.date);
        formData.append('location', addForm.location);
        for (let i = 0; i < addForm.img.length; i++) {
            formData.append('img', addForm.img[i]);
        }

        try {
            await axios.post('http://localhost:3556/api/v1/kegiatan/post-kegiatan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsAdding(false);
            setAddForm({ title: '', content: '', date: '', location: '', img: null });
            getDataKegiatan();
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
                            <th>Date</th>
                            <th>Location</th>
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
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>{item.location}</td>
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
            <h1 className='my-2 my-md-5'>Daftar Kegiatan</h1>
            <button className="btn btn-success mb-3" onClick={() => setIsAdding(true)}>Add Kegiatan</button>
            {dataKegiatan.length > 0 ? renderTable(dataKegiatan) : <p>Loading...</p>}

            <EditModal
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editForm={editForm}
                handleEditFormChange={handleEditFormChange}
                handleSaveEdit={handleSaveEdit}
                currentKegiatan={currentKegiatan}
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

export default KegiatanControl;
