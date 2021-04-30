import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CheckBox({name,filter,setFilter,prepColor}) {
    const [check, setCheck] = React.useState(false)
    React.useEffect(() => {
        for (var i = 0; i < filter.length; i++){
            if (filter[i] === name) {
                setCheck(true);
                return;
            }
        }
    }, [filter])
    
    const handleChange = () => {
        if (!check) {
            setFilter(prev => {
                const A = []
                for (var i = 0; i < filter.length; i++) {
                    if (filter[i] === name) return prev;
                    A.push(filter[i])
                }
                A.push(name);
                return A;
            })
        } else {
            setFilter(prev => {
                const A = []
                for (var i = 0; i < filter.length; i++) {
                    if (filter[i] === name) continue;
                    A.push(filter[i])
                }
                return A;
            })
        }
        setCheck(!check)
    }
    return (
        <>
            <FormControlLabel style={{color:prepColor}}
                control={<Checkbox checked={check} onChange={handleChange} name={`${name}`} style={{color:prepColor}}/>}
                label={`${name}`}
            />
        </>
    )
}

export default CheckBox
