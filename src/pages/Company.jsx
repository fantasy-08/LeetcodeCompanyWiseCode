import React from 'react'
import { Grid, Card, Container, Typography, Button } from '@material-ui/core'
import Filter from '../components/Filter';
import Table from '../components/TableGrid'
import { GetData } from '../extractor/csvParse';
export default () => {
    const [selection, setSelection] = React.useState(
        {
            file: "",
            status:{}
        }
    )
    const [question,setQuestion]=React.useState()
    const filterProp = { selection, setSelection }
    const tableProp = { selection, question,setSelection}
    React.useEffect(() => {
        const Data_Temp = localStorage.getItem('selection');
        if (Data_Temp)
        {
            const Data_JSON=JSON.parse(Data_Temp)
            setSelection(Data_JSON)  
        }
        return () => {
            localStorage.setItem('selection', JSON.stringify(selection));
        }
    },[])
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
        localStorage.setItem('selection', JSON.stringify(selection));
    },[selection])
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
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Apply
                                    </Button>
                                </Grid>
                            </Grid>
                            <br/>
                            <br/>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card variant="outlined">
                            <Table {...tableProp}/>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}