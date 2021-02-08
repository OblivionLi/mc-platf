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
    listReportBugs,
    editReportBug,
    getEditReportBugDetails,
} from "../../../actions/reportBugActions";
import { REPORTBUG_EDIT_RESET } from "../../../constants/reportBugConstants";

const EditReportBugsScreen = ({
    setOpenEditDialog,
    setRequestData,
    reportBugId,
}) => {
    const [status, setStatus] = useState("");

    const [successModal, setSuccessModal] = useState(false);

    const dispatch = useDispatch();

    const reportBugGetEditDetails = useSelector(
        (state) => state.reportBugGetEditDetails
    );
    const { loading, error, reportBug } = reportBugGetEditDetails;

    const reportBugEdit = useSelector((state) => state.reportBugEdit);
    const {
        loading: loadingEdit,
        error: errorEdit,
        success: successEdit,
    } = reportBugEdit;

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: REPORTBUG_EDIT_RESET });
            if (successModal) {
                dispatch(listReportBugs());
            }
        } else {
            if (!reportBug.title || reportBug.id != reportBugId) {
                dispatch(getEditReportBugDetails(reportBugId));
            } else {
                setStatus(reportBug.status);
            }
        }
    }, [dispatch, reportBugId, reportBug, successEdit, successModal]);

    const submitHandler = (e) => {
        e.preventDefault();

        setOpenEditDialog(false);
        setRequestData(new Date());
        setSuccessModal(true);
        dispatch(editReportBug(reportBugId, status));

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
                Edit Bug Report {`> ${reportBug.title}`}
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
                                            value="FIXED"
                                            control={<Radio color="primary" />}
                                            label="FIXED"
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
                            Edit Bug Report
                        </Button>
                    </form>
                )}
            </DialogContent>
            <Divider />
        </div>
    );
};

export default EditReportBugsScreen;
