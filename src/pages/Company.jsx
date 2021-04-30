import React from 'react'
import { Grid, Card, Container, Typography, Button } from '@material-ui/core'
import Filter from '../components/Filter';
import Table from '../components/TableGrid'
import { GetData } from '../extractor/csvParse';
import CheckBox from '../components/FilterProp/CheckBox'
export default () => {
    const [selection, setSelection] = React.useState(
        {
            file: "",
            status: {}
        }
    )
    const [filter, setFilter] = React.useState(["Solved", "Unsolved", "Reviewed"]);
    const [difficulty, setDifficulty] = React.useState(["Easy", "Medium", "Hard"]);
    const [question, setQuestion] = React.useState()
    const filterProp = { selection, setSelection }
    const tableProp = { selection, question, setSelection,filter,difficulty }
    React.useEffect(() => {
        const Data_Temp = localStorage.getItem('selection');
        if (Data_Temp) {
            const Data_JSON = JSON.parse(Data_Temp)
            setSelection(Data_JSON)
        }
        return () => {
            localStorage.setItem('selection', JSON.stringify(selection));
        }
    }, [])
    React.useEffect(() => {
        if (selection.file == "") {
            return;
        }
        const Data_get = async () => {
            const questions_got = await GetData(selection.file)
            setQuestion(questions_got)
        }
        Data_get();
    }, [selection.file])
    React.useEffect(() => {
        console.log(filter)
        console.log(difficulty)
    },[filter,difficulty])
    React.useEffect(() => {
        localStorage.setItem('selection', JSON.stringify(selection));
    }, [selection])

    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Card variant="outlined" style={{ height: "100%" }}>
                            <Grid container direction="column" spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <Typography variant="h4" gutterBottom>
                                        <br />
                                        <b>Filters</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Filter {...filterProp} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom style={{color:"grey"}}>
                                        <br />
                                        <b>Status</b>
                                        <hr/>
                                    </Typography>
                                    <CheckBox name="Unsolved" setFilter={setFilter} filter={filter} prepColor={"black"}/><br />
                                    <CheckBox name="Solved" setFilter={setFilter} filter={filter} prepColor={"green"}/><br />
                                    <CheckBox name="Reviewed" setFilter={setFilter} filter={filter} prepColor={"black"}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom style={{color:"grey"}}>
                                        <br />
                                        <b>Difficulty</b>
                                        <hr/>
                                    </Typography>
                                    <CheckBox name="Easy" setFilter={setDifficulty} filter={difficulty} prepColor={"green"}/><br />
                                    <CheckBox name="Medium" setFilter={setDifficulty} filter={difficulty} prepColor={"orange"}/><br />
                                    <CheckBox name="Hard" setFilter={setDifficulty} filter={difficulty} prepColor={"red"} />
                                    <br/>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Apply
                                    </Button>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card variant="outlined">
                            <Table {...tableProp} />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}