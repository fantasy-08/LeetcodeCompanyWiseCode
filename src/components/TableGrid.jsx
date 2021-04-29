import React from 'react'
import { Paper, Grid, IconButton, Link, TableHead, TableRow, TableContainer, TableCell, TableBody, Table } from '@material-ui/core'
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ListIcon from '@material-ui/icons/List';
function TableGrid({ selection, question, setSelection }) {
    const preventDefault = (event) => event.preventDefault();
    const handleClinkLink = (e) => {
        preventDefault(e);
        window.open(e.target.href, "_blank")
    }
    const handleAddToDone = (qID) => {
        setSelection(prev => {
            return {
                ...prev,
                status: {
                    ...prev.status,
                    [qID]: "done"
                }
            }
        })
    }
    const handleAddToToDo = (qID) => {
        setSelection(prev => {
            return {
                ...prev,
                ["status"]: {
                    ...prev.status,
                    [qID]: "review"
                }
            }
        })
    }
    const handleRemove = (qID) => {
        setSelection(prev => {
            var temp = prev.status
            delete temp[qID]
            return {
                ...prev,
                ["status"]:temp
            }
        })
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Problem ID</b></TableCell>
                            <TableCell align="center"><b>Question</b> ({question ? question.length : 0})</TableCell>
                            <TableCell align="center"><b>Accuracy</b></TableCell>
                            <TableCell align="center"><b>Difficulty</b></TableCell>
                            <TableCell align="center"><b>Problem Link</b></TableCell>
                            <TableCell align="center"><b>Status</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            question && question.length ?
                                question.map(ques => {
                                    if (ques.length !== 6) return <></>
                                    else
                                        return <>
                                            <TableRow style={{backgroundColor:(selection && selection.status && selection.status[ques[0]])?selection.status[ques[0]]==="done"?"lightgreen":"lightpink":""}}>
                                                <TableCell align="center">{ques[0]}</TableCell>
                                                <TableCell align="left">{ques[1]}</TableCell>
                                                <TableCell align="center">{ques[2]}</TableCell>
                                                <TableCell align="center" style={{ color: ques[3] === "Easy" ? "green" : ques[3] === "Hard" ? "red" : "orange" }}>{ques[3]}</TableCell>
                                                <TableCell align="center">
                                                    <Link href={`${ques[5]}`} onClick={handleClinkLink}>
                                                        Problem
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {
                                                        selection.status && selection.status[ques[0]]
                                                            ? selection.status[ques[0]] === "done" ?
                                                                <>
                                                                    <IconButton onClick={() => { handleRemove(ques[0]) }}>
                                                                        <CheckCircleIcon style={{ color: green[500] }} />
                                                                    </IconButton>
                                                                </> :
                                                                <>
                                                                    <IconButton onClick={() => { handleRemove(ques[0]) }}>
                                                                        <ListIcon style={{ color: "orange" }} />
                                                                    </IconButton>
                                                                </> :
                                                            <>
                                                                <Grid container>
                                                                    <Grid item xs={12} md={6}>
                                                                        <IconButton onClick={() => { handleAddToDone(ques[0]) }}>
                                                                            <CheckCircleIcon style={{ color: green[500] }}  />
                                                                        </IconButton></Grid>
                                                                    <Grid item xs={12} md={6}>
                                                                        <IconButton onClick={() => { handleAddToToDo(ques[0]) }}>
                                                                            <ListIcon style={{ color: "orange" }}  />
                                                                        </IconButton></Grid>
                                                                </Grid>
                                                            </>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </>
                                }) : <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableGrid
