import swal from "sweetalert";
import AxiosInstance from "../helper/AxiosIntance";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';

const Add = (props) => {
    const { user, setReload } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [topic_Id, setTopic_Id] = useState(1);
    const [user_Id, setUser_Id] = useState(user?.ID);

    const [imageInput, setImageInput] = useState('');
    const [imagePreview, setImagePreview] = useState('')

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
            setTopics(result);
        }
        fetchData();
    }, []);

    const handleAdd = async () => {
        try {
            if (!title || !content || !image) {
                swal("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            const body = {
                title: title,
                content: content,
                image: image,
                topic_id: topic_Id,
                user_id: user_Id
            }
            const result = await AxiosInstance().post('/add-new.php', body);
            if (result.status) {
                handleCloseDialog();
                swal("thêm tin tức thành công");
                setReload(true);
            }


        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>

            <div style={{ marginTop: 10 }}>
                <Button variant="primary" onClick={handleShowDialog}>
                    Add news
                </Button>
                <Modal show={showDialog} onHide={handleCloseDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add News</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formContent">
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formImage">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control type="file" value={imageInput} onChange={handleImageChange} />
                                {imagePreview && <img src={imagePreview} width={200} height={200} />}
                            </Form.Group>
                            <Form.Group controlId="formTopic">
                                <Form.Label>Chủ đề</Form.Label>
                                <Form.Control as="select" value={topic_Id} onChange={(e) => setTopic_Id(e.target.value)}>
                                    {
                                        topics.map((item, index) => (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button style={{ marginTop: 13 }} variant="primary" onClick={handleAdd}>Thêm</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Add;