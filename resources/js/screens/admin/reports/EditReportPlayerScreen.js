import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    Button,
    Divider,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../components/public/loader/Loader";
import Message from "../../../components/public/alert/Message";
import {
    listReportPlayers,
    editReportPlayer,
    getEditReportPlayerDetails,
} from "../../../actions/reportPlayerActions";
import { REPORTPLAYER_EDIT_RESET } from "../../../constants/reportPlayerConstants";

const EditReportPlayersScreen = ({
    setOpenEditDialog,
    setRequestData,
    reportPlayerId,
}) => {
    const [status, setStatus] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const reportPlayerGetEditDetails = useSelector(
        (state) => state.reportPlayerGetEditDetails
    );
    const { loading, error, reportPlayer } = reportPlayerGetEditDetails;

    const reportPlayerEdit = useSelector((state) => state.reportPlayerEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = reportPlayerEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: REPORTPLAYER_EDIT_RESET });
            if (successModal) {
                dispatch(listReportPlayers());
            }
        } else {
            if (!reportPlayer.title || reportPlayer.id != reportPlayerId) {
                dispatch(getEditReportPlayerDetails(reportPlayerId));
            } else {
                setStatus(reportPlayer.status);
            }
        }
    }, [dispatch, reportPlayerId, reportPlayer, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        setOpenEditDialog(false);
        setRequestData(new Date());
        setSuccessModal(true);
        dispatch(editReportPlayer(reportPlayerId, status));

        Swal.fire({
            position: "center",
            icon: "success",
            title: `Status has been updated in "${status}"`,
            showConfirmButton: false,
            timer: 2500,
            width: "45rem",
        });
    };

    return (
        <div>
            <DialogTitle id="draggable-dialog-title">
                Edit Player Report {`> ${reportPlayer.title}`}
            </DialogTitle>
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
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="position"
                                        name="position"
                                        defaultValue="top"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <FormControlLabel
                                            value="PENDING"
                                            control={<Radio color="primary" />}
                                            label="PENDING"
                                            labelPlacement="top"
                                        />

                                        <FormControlLabel
                                            value="BANNED"
                                            control={<Radio color="primary" />}
                                            label="BANNED"
                                            labelPlacement="top"
                                        />

                                        <FormControlLabel
                                            value="CLEAN"
                                            control={<Radio color="primary" />}
                                            label="CLEAN"
                                            labelPlacement="top"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            value="submit"
                            type="submit"
                            fullWidth
                        >
                            Edit Player Report
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditReportPlayersScreen;
