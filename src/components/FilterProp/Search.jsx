import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormControl, InputLabel, Select } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default ({ fileName, selection, setSelection }) => {
    const classes = useStyles();

    const handleChange = (e) => {
        setSelection(prev => {
            return {
                ...prev,
                ["file"]: e.target.value
            }
        })
    }
    return (
        <>
            {
                (fileName && fileName["companies"]) ?
                    <>
                        <Container>
                            <label>Companies</label>
                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                {/* <InputLabel >Companies</InputLabel> */}
                                <Select
                                    native
                                    value={selection.file}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'file',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {
                                        fileName["companies"].map(info => {
                                            return <option value={info.file}>{info.name}</option>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Container>
                    </> : <></>
            }

        </>
    )
}