import AxiosInstance from "../helper/AxiosIntance";
import React, { useState, useEffect, img } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';


const Edit = (props) => {
    const { user, id, setReload } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [topic_Id, setTopic_Id] = useState('');
    const [user_Id, setUser_Id] = useState(user?.ID);
    const imgloading = "https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif"
    const [imageInput, setImageInput] = useState('');
    const [imagePreview, setImagePreview] = useState('')
    // const [newById, setNewById] = useState([]);


    const [showDialog, setShowDialog] = useState(false);

    const handleShowDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);
    const handleImageChange = async (e) => {
        //hiển thị hình ảnh
        const file = e.target.files[0];
        if (!file) return;
        setImagePreview(URL.createObjectURL(file));
        //upload hình ảnh
        const formData = new FormData();
        formData.append('image', file);
        const result = await AxiosInstance('multipart/form-data').post('/upload-file.php', formData);
        console.log(result);
        setImage(result.path);

    }

    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await AxiosInstance().get('/get-topics.php');
            const newById = await AxiosInstance().get(`/get-new-detail.php?id=${id}`);

            setTopics(result);
            setTitle(newById.title);
            setContent(newById.content);
            setImagePreview(newById.image);
            setImage(newById.image);
            setTopic_Id(newById.topic_id);
        }
        fetchData();
    }, [id]);
    const handleUpdateNews = async () => {
        try {
            if (!title || !content || !image) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                title: title,
                content: content,
                image: image,
                topic_id: topic_Id,
                user_id: user_Id
            }
            const result = await AxiosInstance().post('/update-new.php?id=' + id, body);
            // alert(result.message)
            handleCloseDialog();
            swal(result.message);
            setReload(true)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>

            <div>
                <Button variant="primary" onClick={handleShowDialog}>
                    Sửa
                </Button>
                <Modal show={showDialog} onHide={handleCloseDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit News</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" value={imageInput} onChange={handleImageChange} />
                            </Form.Group>
                            <img src={imagePreview ? imagePreview : imgloading} width={200} height={200} />
                            <Form.Group controlId="formBasicTopic">
                                <Form.Label>Topic</Form.Label>
                                <Form.Control as="select" value={topic_Id} onChange={(e) => setTopic_Id(e.target.value)}>
                                    {topics && topics.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button style={{ marginTop: 13 }} variant="primary" onClick={handleUpdateNews}>
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Edit;