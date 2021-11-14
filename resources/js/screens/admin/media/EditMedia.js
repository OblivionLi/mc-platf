import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Divider } from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    listMedias,
    editMedia,
    getEditMediaDetails,
} from "../../../actions/mediaActions";
import { MEDIA_EDIT_RESET, MEDIA_GET_DETAILS_RESET } from "../../../constants/mediaConstants";

const EditGameMode = ({ setOpenEditDialog, setRequestData, mediaId }) => {
    const [name, setName] = useState("");
    const [href, setHref] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const mediaGetEditDetails = useSelector(
        (state) => state.mediaGetEditDetails
    );
    const { loading, error, media } = mediaGetEditDetails;

    const mediaEdit = useSelector((state) => state.mediaEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = mediaEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: MEDIA_EDIT_RESET });
            dispatch({ type: MEDIA_GET_DETAILS_RESET });
        } else {
            if (!media.name || media.id != mediaId) {
                dispatch(getEditMediaDetails(mediaId));
            } else {
                setName(media.name);
                setHref(media.href);
            }
        }

        if (successModal) {
            dispatch(listMedias());
        }
    }, [dispatch, mediaId, media, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(editMedia(mediaId, name, href));
        
        setRequestData(new Date());
        setSuccessModal(true);
        setOpenEditDialog(false);

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Media with name "${name}" has been updated`,
            showConfirmButton: false,
            timer: 2500,
            width: '65rem'
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">Edit Media</DialogTitle>
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
                                    label="Name"
                                    fullWidth
                                    value={name}
                                    placeholder="Example: youtube, steam, facebook etc.."
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
                                    value={href}
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
                            Edit Href
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditGameMode;
