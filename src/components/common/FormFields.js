import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
const {useField} = require('formik');


function InputField(props) {
    const {errorText, ...rest} = props;
    const [field, meta] = useField(props);

    return (
        <TextField
            type="text"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
            {...rest}
        />
    );
}

function PhoneNumberField(props) {
    const {errorText, ...rest} = props;
    const [field, meta] = useField(props);

    // const [value, setValue] = useState('');

    // function onChangePhone(e) {
    //     let phoneNumber = e.target.value;
    //     let length = phoneNumber.length;
    //     console.log(`값이 나오는지 확인 : ${phoneNumber}`);
    //     if (length === 10) {
    //         phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    //     } else if (length === 13) {
    //         phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    //     }
    //     setValue(phoneNumber);
    // }

    return (
        <TextField
            type="text"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
            {...rest}
        />
    );
}

function SelectField(props) {
    const { label, data, ...rest } = props;
    const [field, meta] = useField(props);
    const { value: selectedValue } = field;

    function _renderHelperText(){
        if (meta.touched && meta.error){
            return <FormHelperText>{meta.touched && meta.error}</FormHelperText>
        }
    }

    return (
        <FormControl
            {...rest}
            error={Boolean(meta.touched && meta.error)}
        >
            <InputLabel>{label}</InputLabel>
            <Select {...field} value={selectedValue ? selectedValue : ''}>
                {data.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {_renderHelperText()}
        </FormControl>
    );
}

SelectField.defaultProps = {
    data: []
};

SelectField.propTypes = {
    data: PropTypes.array.isRequired
};

export {InputField, PhoneNumberField, SelectField}
