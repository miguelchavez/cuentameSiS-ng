import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'

import { makeStyles } from '@material-ui/core/styles'

import PhoneInput from 'mui-phone-input'
import { titleCase } from '../utils/strings'

import { Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    avatarMenuItem: {
        width: 32,
        height: 32,
        borderRadius: '50%',
    },
    extraPaddingR: {
        marginRight: '8px !important',
    },
    menuSelectedItem: {
        color: theme.palette.text.secondary,
        '&>#responsable, &>#responsable_contrato': {
            display: 'flex',
            flexFlow: 'row',
            alignItems: 'center',
        },
    },
}))

const TextEdit = (props) => {
    const { formState, control, type, multiline, default_value, autofocus, required, field_name, field_label } = props
    if (typeof formState !== 'undefined' && formState) {
        return (
            <>
                <FormControl fullWidth>
                    <Controller
                        name={field_name}
                        as={
                            <TextField
                                type={type || 'text'}
                                multiline={multiline || false}
                                autoFocus={autofocus || false}
                                id={field_name}
                                label={titleCase(field_label.replaceAll('_', ' '))}
                                size='small'
                                autoComplete='off'
                                aria-label={titleCase(field_label.replaceAll('_', ' '))}
                                helperText={
                                    formState.errors[`${field_name}`] ? formState.errors[`${field_name}`].message : null
                                }
                                error={formState.errors[`${field_name}`] ? true : false}
                                className={
                                    formState.errors[`${field_name}`]
                                        ? 'error'
                                        : formState.dirtyFields[`${field_name}`]
                                        ? 'dirty-field'
                                        : 'no-error'
                                }
                            />
                        }
                        control={control}
                        defaultValue={default_value || ''}
                        rules={required ? { required: 'Requerido' } : { required: '' }}
                    />
                </FormControl>
            </>
        )
    } else {
        return <div class='spinner'></div>
    }
}

const CheckBox = (props) => {
    const { formState, control, default_value, autofocus, required, field_name, field_label } = props
    if (typeof formState !== 'undefined' && formState) {
        return (
            <>
                <FormControlLabel
                    control={
                        <Controller
                            autofocus={autofocus}
                            name={field_name}
                            control={control}
                            render={(props) => (
                                <Checkbox
                                    color='primary'
                                    aria-label={titleCase(field_label.replaceAll('_', ' '))}
                                    onChange={(e) => props.onChange(e.target.checked)}
                                    checked={props.value}
                                    className={formState.errors[`${field_name}`] ? 'error' : 'no-error'}
                                />
                            )}
                            defaultValue={default_value || ''}
                            rules={required ? { required: 'Requerido' } : { required: '' }}
                        />
                    }
                    label={titleCase(field_label.replaceAll('_', ' '))}
                    aria-label={titleCase(field_label.replaceAll('_', ' '))}
                />
                <FormHelperText key={`${field_name}:${type}`}>
                    {formState.errors[`${fieldname}`] ? formState.errors[`${fieldname}`].message : null}
                </FormHelperText>
            </>
        )
    } else {
        return <div class='spinner'></div>
    }
}

const PhoneEdit = (props) => {
    const { formState, control, default_value, autofocus, required, field_name, field_label } = props
    if (typeof formState !== 'undefined' && formState) {
        return (
            <>
                <FormControl fullWidth>
                    <Controller
                        name={field_name}
                        as={
                            <PhoneInput
                                id={field_name}
                                autofocus={autofocus}
                                label={titleCase(field_label.replaceAll('_', ' '))}
                                aria-label={titleCase(field_label.replaceAll('_', ' '))}
                                helperText={
                                    formState.errors[`${field_name}`] ? formState.errors[`${field_name}`].message : null
                                }
                                error={formState.errors[`${field_name}`] ? true : false}
                                className={
                                    formState.errors[`${field_name}`]
                                        ? 'error'
                                        : formState.dirtyFields[`${field_name}`]
                                        ? 'dirty-field'
                                        : 'no-error'
                                }
                            />
                        }
                        control={control}
                        defaultValue={default_value || ''}
                        rules={required ? { required: 'Requerido' } : { required: '' }}
                    />
                </FormControl>
            </>
        )
    } else {
        return <div class='spinner'></div>
    }
}

const Selector = (props) => {
    const { formState, control, multi, withAvatar, options, default_value, autofocus, required, field_name, field_label } =
        props
    const classes = useStyles()
    if (typeof formState !== 'undefined' && formState) {
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel htmlFor={field_name} id={field_name}>
                        {field_label}
                    </InputLabel>
                    <Controller
                        as={
                            <Select
                                id={field_name}
                                autofocus={autofocus}
                                multi={multi}
                                labelId={titleCase(field_label.replaceAll('_', ' '))}
                                aria-label={titleCase(field_label.replaceAll('_', ' '))}
                                helperText={
                                    formState.errors[`${field_name}`] ? formState.errors[`${field_name}`].message : null
                                }
                                error={formState.errors[`${field_name}`] ? true : false}
                                className={clsx(
                                    formState.errors[`${field_name}`]
                                        ? 'error'
                                        : formState.dirtyFields[`${field_name}`]
                                        ? 'dirty-field'
                                        : 'no-error',
                                    classes.menuSelectedItem
                                )}>
                                {options.map((option) => (
                                    <MenuItem key={option?.label || option?.nombre} value={option}>
                                        {withAvatar && (
                                            <Avatar
                                                className={clsx(classes.avatarMenuItem, classes.extraPaddingR)}
                                                src={option?.avatar}
                                                email={option?.email || option?.label || option?.nombre}
                                            />
                                        )}
                                        {option.label || option?.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        }
                        name={field_name}
                        control={control}
                        defaultValue={default_value || ''}
                        rules={required ? { required: 'Requerido' } : { required: '' }}
                    />
                </FormControl>
            </>
        )
    } else {
        return <div class='spinner'></div>
    }
}

const AutoCompleter = (props) => {
    const { formState, control, multi, options, default_value, autofocus, required, field_name, field_label } = props
    const classes = useStyles()
    if (typeof formState !== 'undefined' && formState) {
        return (
            <>
                <FormControl fullWidth>
                    <Controller
                        as={
                            <Autocomplete
                                freeSolo
                                id={field_name}
                                options={options}
                                getOptionLabel={(option) => option.label}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={field_label}
                                        autofocus={autofocus}
                                        multi={multi}
                                        labelId={titleCase(field_label.replaceAll('_', ' '))}
                                        aria-label={titleCase(field_label.replaceAll('_', ' '))}
                                        helperText={
                                            formState.errors[`${field_name}`]
                                                ? formState.errors[`${field_name}`].message
                                                : null
                                        }
                                        error={formState.errors[`${field_name}`] ? true : false}
                                        className={clsx(
                                            formState.errors[`${field_name}`]
                                                ? 'error'
                                                : formState.dirtyFields[`${field_name}`]
                                                ? 'dirty-field'
                                                : 'no-error',
                                            classes.menuSelectedItem
                                        )}
                                    />
                                )}
                            />
                        }
                        name={field_name}
                        control={control}
                        defaultValue={default_value || ''}
                        rules={required ? { required: 'Requerido' } : { required: '' }}
                    />
                </FormControl>
            </>
        )
    } else {
        return <div class='spinner'></div>
    }
}

const ChipSelect = (props) => {
    const { formState, control, multi, options, default_value, autofocus, required, field_name, field_label, onDelete } =
        props
    const classes = useStyles()
    if (typeof formState !== 'undefined' && formState) {
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel htmlFor={field_name} id={field_name}>
                        {field_label}
                    </InputLabel>
                    <Controller
                        as={
                            <Select
                                id={field_name}
                                multi={multi}
                                autofocus={autofocus}
                                labelId={field_name}
                                aria-label={titleCase(field_label.replaceAll('_', ' '))}
                                helperText={
                                    formState.errors[`${field_name}`] ? formState.errors[`${field_name}`].message : null
                                }
                                error={formState.errors[`${field_name}`] ? true : false}
                                className={clsx(
                                    formState.errors[`${field_name}`]
                                        ? 'error'
                                        : formState.dirtyFields[`${field_name}`]
                                        ? 'dirty-field'
                                        : 'no-error',
                                    classes.menuSelectedItem
                                )}
                                renderValue={(selected) => (
                                    <div id={`contenedor-chips_${field_name}`}>
                                        {selected.map((miembro) => {
                                            return (
                                                <Chip
                                                    className={classes.chip}
                                                    key={miembro?.label || miembro?.nombre}
                                                    label={miembro?.label || miembro?.nombre}
                                                    icon={
                                                        <Avatar
                                                            className={classes.avatarMenuItem}
                                                            src={miembro?.avatar}
                                                            email={miembro?.label || miembro?.nombre}
                                                        />
                                                    }
                                                    onMouseDown={(event) => {
                                                        // Needed because the select intercepts the mousedown events....
                                                        event.stopPropagation()
                                                    }}
                                                    onDelete={
                                                        onDelete()
                                                        // () => {
                                                        // const antes = getValues('equipo')
                                                        // const despues = antes.filter((m) => m !== miembro)
                                                        // console.log('ANTES:', antes)
                                                        // console.log('DESPUES:', despues)
                                                        // setValue('equipo', despues, {
                                                        //     shouldValidate: true,
                                                        //     shouldDirty: true,
                                                        // })
                                                        // }
                                                    }
                                                />
                                            )
                                        })}
                                    </div>
                                )}>
                                {options.map((option) => (
                                    <MenuItem key={option?.label || option?.nombre} value={option}>
                                        <Avatar
                                            className={clsx(classes.avatarMenuItem, classes.extraPaddingR)}
                                            src={option?.avatar}
                                            email={option?.email || option?.label || option?.nombre}
                                        />
                                        {option.label || option?.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        }
                        name={field_name}
                        control={control}
                        defaultValue={default_value || ''}
                        rules={required ? { required: 'Requerido' } : { required: '' }}
                    />
                </FormControl>
            </>
        )
    } else {
        return <div class='spinner'></div>
    }
}

export { TextEdit, CheckBox, PhoneEdit, Selector, AutoCompleter, ChipSelect }
