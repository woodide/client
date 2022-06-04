import React, {useState} from "react";
import {Link, useHistory, useNavigate, useParams} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {Button} from "react-bootstrap";

function ReportPage() {
    const {id} = useParams();
    const [report, setReport] = useState();
   const navigate = useNavigate();
    return (
        <div style={{width: "80vw", marginTop: "10px"}}>
            <div>
                <h1 style={{textAlign: "center", marginBottom: "10px"}}>MIPS Simulator 보고서</h1>
            </div>
            <div data-color-mode="light">
                <MDEditor
                    value={report}
                    onChange={setReport}
                    height={500}
                    color="#fff"
                />
            </div>
            <div style={{float: "right", marginTop: "10px"}}>
                <Button style={{width: "100px"}}>저장</Button>
                <Button onClick={() => navigate(-1)} style={{width: "100px",marginLeft:"5px"}} variant={"secondary"}>이전</Button>
            </div>
        </div>
    );
}

export default ReportPage;