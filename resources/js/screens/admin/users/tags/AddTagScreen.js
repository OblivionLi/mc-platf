import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Loader from "../../../../components/public/loader/Loader";
import Message from "../../../../components/public/alert/Message";
import {
    listTags,
    createTag,
} from "../../../../actions/tagActions";
import Swal from "sweetalert2";
import { TAG_LIST_RESET } from "../../../../constants/tagConstants";

const AddTagScreen = ({ setOpenAddDialog, setRequestData, history }) => {
    const [name, setName] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const tagCreate = useSelector((state) => state.tagCreate);
    const { loading, success, error } = tagCreate;

    useEffect(() => {
        if (successModal) {
            dispatch({ type: TAG_LIST_RESET })
            dispatch(listTags());
        }
    }, [dispatch, history, successModal, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createTag(name));

        setRequestData(new Date());
        setSuccessModal(true);
        setOpenAddDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Tag "${name}" created successfully`,
            showConfirmButton: false,
            timer: 2500,
            width: "65rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Add Tag</DialogTitle>
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
                                    label="Title"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
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
                            Add Tag
                        </Button>
                    </form>
                )}
            </DialogContent>
        </div>
    );
};

export default AddTagScreen;
