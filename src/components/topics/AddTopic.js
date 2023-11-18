import AxiosInstance from "../helper/AxiosIntance";
import React, { useState } from "react";
import swal from "sweetalert";

const AddTopic = (props) => {
    const { setReload, setNotification } = props;
    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState(undefined)

    // const [topics, setTopics] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await AxiosInstance().get('/get-topics.php');
    //         setTopics(result);
    //     }
    //     fetchData();
    // }, []);

    const handleAddTopic = async () => {

        swal({
            title: "Xác nhận thêm mới!",
            text: "Thêm mới 1 topics",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        if (!name || !description) {
                            swal("Vui lòng nhập đầy đủ thông tin");
                            return;
                        }
                        const body = {
                            name: name,
                            description: description
                        }
                        const result = await AxiosInstance().post('/add-topics.php', body);
                        if (result) {
                            setReload(true);
                            setNotification("Thêm mới topic thành công!");
                            setTimeout(() => {
                                setNotification('');
                            }, 2000);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    swal("Thêm mới thất bại!");
                }
            });

    }
    return (
        <div>
            <h1>Add topic</h1>
            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <button onClick={handleAddTopic} type="button">Thêm</button>

            </form>
        </div>
    )
}

export default AddTopic;