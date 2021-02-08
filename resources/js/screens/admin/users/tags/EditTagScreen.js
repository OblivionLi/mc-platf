import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../../components/public/loader/Loader";
import Message from "../../../../components/public/alert/Message";
import {
    listTags,
    editTag,
    getEditTagDetails,
} from "../../../../actions/tagActions";
import { TAG_EDIT_RESET, TAG_GET_DETAILS_RESET } from "../../../../constants/tagConstants";

const EditTagScreen = ({ setOpenEditDialog, setRequestData, tagId }) => {
    const [name, setName] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const tagGetEditDetails = useSelector(
        (state) => state.tagGetEditDetails
    );
    const { loading, error, tag } = tagGetEditDetails;

    const tagEdit = useSelector((state) => state.tagEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = tagEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: TAG_EDIT_RESET });
            dispatch({ type: TAG_GET_DETAILS_RESET });
        } else {
            if (!tag.name || tag.id != tagId) {
                dispatch(getEditTagDetails(tagId));
            } else {
                setName(tag.name);
            }
        }

        if (successModal) {
            dispatch(listTags());
        }
    }, [dispatch, tagId, tag, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editTag(tagId, name));
        
        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Tag with name "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Tag</DialogTitle>
            <Divider />
            <DialogContent>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant="error">{errorEdit}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="error">{error}</Message>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form">
                            <div className="form__field">
                                <TextField
                                    variant="outlined"
                                    name="name"
                                    label="Title"
                                    fullWidth
                                    value={name}
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
                            Edit Tag
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditTagScreen;
