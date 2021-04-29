import React from 'react';
import { company_data } from '../company_data';
import Search from './FilterProp/Search';

export default ({selection, setSelection }) => {
    const [fileName, setFileName] = React.useState()
    
    React.useEffect(() => {
        setFileName(company_data);
    }, [])
    const searchProp={fileName ,selection, setSelection}
    return (
        <>
            <Search {...searchProp}/> : <></>
        </>
    )
}