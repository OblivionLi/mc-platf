import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    listMedias,
    createMedia,
} from "../../../actions/mediaActions";
import Swal from "sweetalert2";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ClearIcon from '@material-ui/icons/Clear';
import { MEDIA_LIST_RESET } from "../../../constants/mediaConstants";

const AddMedia = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");
    const [href, setHref] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const mediaCreate = useSelector((state) => state.mediaCreate);
    const { loading, success, error } = mediaCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: MEDIA_LIST_RESET })
            dispatch(listMedias());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createMedia(name, href));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Media "${name}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Media</DialogTitle>
            <Divider />
            <DialogContent>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form
                        onSubmit={submitHandler}
                    >
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Name"
                                    placeholder="Example: youtube, steam, facebook etc.."
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    label="Href"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) =>
                                        setHref(e.target.value)
                                    }
                                    name="href"
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Add Media
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddMedia;
